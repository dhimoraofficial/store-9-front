"use client"

import { useEffect, useState } from "react"


// to store the DB state for entire lifecycle of the code,
// each state have separate key so that x component don't get the y component database
const DB_PROMISE_MAP = new Map<string, Promise<IDBDatabase>>()

// to make the store cache load faster, 
// if the x component sets data it will set here with given key,
// if exist send instantly to y components no need to search db,
// kind of client-side local redis
const MEMORY = new Map()


// designing the custom 
const LISTENERS = new Map<string, Set<Function>>()



function shallowEqual(a: any, b: any) {
    if (Object.is(a, b)) return true
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return false

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    for (let key of keysA) {
        if (!Object.is(a[key], b[key])) return false
    }

    return true
}

/**
 * Persistent state hook with IndexedDB backing and in-memory caching.
 *
 * Acts like React's useState, but automatically persists value,
 * hydrates on mount, supports TTL expiration, versioning, and
 * stale-while-revalidate behavior.
 *
 * @param key
 * Unique cache key. Used as the storage identifier.
 *
 * @param initialValue
 * Value used when no cached entry exists, entry is expired,
 * or entry version mismatches.
 *
 * @param options
 * Configuration object.
 *
 * @param options.ttl
 * Time-to-live in seconds.
 * Determines how long the cached value remains valid.
 * Default: 300 (5 minutes).
 * Set to null to disable expiration.
 *
 * @param options.databaseName
 * IndexedDB database name.
 * If null, a default internal database name is used.
 *
 * @param options.storeName
 * Object store name inside the database.
 * If null, a default internal store name is used.
 *
 * @param options.dataBaseVersion
 * Cache schema version.
 * When changed, all existing cached entries using this version
 * are treated as invalid and replaced by initialValue.
 *
 * @param options.staleWhileRevalidate
 * When true:
 * If cached data is expired, the stale value is returned immediately,
 * and a background refresh is triggered.
 *
 * When false:
 * Expired cached values are discarded and initialValue is used.
 *
 * @param options.useL1Memory
 * When true:
 * get and set data directly to memory, faster load time, reduce dependent on slow read ie indexDB
 *
 * When false:
 * only save data to indexDB, slow load time compare to memory
 *
 * @returns
 * Tuple:
 * [state, setState, asyncState]
 *
 * state:
 * Current value (either cached or initialValue).
 *
 * Accepts either a value or updater function.
 * Automatically persists value to IndexedDB.
 *
 * Usages:
 *
 * const [settings, setSettings] = useAppOption(
 *   "settings",
 *   {},
 *   { ttl: 3600 }
 * )
 */
export default function useAppOption<T, S = T>(
    key: string,
    initialValue: T,
    // optional parameters
    { ttl, databaseName, storeName, dataBaseVersion, staleWhileRevalidate, useL1Memory, dynamicKey, defaultBehavior, selector }

        // type definition of parameters
        : {
            ttl?: number | null,
            databaseName?: string | null,
            storeName?: string | null,
            dynamicKey?: boolean,
            dataBaseVersion?: number,
            selector?: (_: T) => S,
            staleWhileRevalidate?: boolean,
            defaultBehavior?: "default" | "storage" | "state",
            useL1Memory?: boolean
        } = {
            // default value definition of parameters

            ttl: null,
            databaseName: null,
            storeName: null,
            dataBaseVersion: 1,
            dynamicKey: false,
            defaultBehavior: "default",
            staleWhileRevalidate: true,
            useL1Memory: false
        }

    // Declaring the response metadata
): [S, (value: T | ((prev: T) => T)) => Promise<void>, () => Promise<T>, boolean] {

    // setting the basic configurations
    const [state, setState] = useState<T>(initialValue)
    const [stateInitialized, setStateInitialized] = useState(false)

    selector = selector || ((_: T) => (_ as unknown as S))
    let prevState: S = selector(state)

    // core configs
    let cacheKey = `__drk.${key}`
    databaseName = `__drk__${databaseName || "local_db"}`
    storeName = `__drk_${storeName || "local_store"}`
    dataBaseVersion = dataBaseVersion || 1
    dynamicKey = (dynamicKey && (key === undefined || key?.includes("undefined")))

    useEffect(() => {
        if (dynamicKey) return

        asyncState()

        if (!LISTENERS.has(cacheKey)) {
            LISTENERS.set(cacheKey, new Set())
        }

        const listener = (newValue: T) => {
            if (!shallowEqual(prevState, selector(newValue))) {
                setState(newValue)
            }
        }

        LISTENERS.get(cacheKey)!.add(listener)

        return () => {
            LISTENERS.get(cacheKey)!.delete(listener)
        }
    }, [key, ttl, databaseName, dataBaseVersion, useL1Memory, staleWhileRevalidate, initialValue])

    async function asyncState(): Promise<T> {
        if (dynamicKey) return initialValue
        if (stateInitialized) return state

        let record = (defaultBehavior === "default" || defaultBehavior === "storage") && await getRecord()
        let finalState: T;


        // --------------------------------------- //
        if (!record) {
            finalState = initialValue
        }

        // --------------------------------------- //
        else if (record?.ver && (record.ver !== dataBaseVersion)) {
            finalState = initialValue
            removeRecord()
        }

        // --------------------------------------- //
        else if (record?.e && isExpired(record.e)) {
            // -------------------- //
            if (staleWhileRevalidate) {
                finalState = record.v
            }

            // -------------------- //
            else {
                finalState = initialValue
            }

            // -------------------- //
            removeRecord()
        }

        // --------------------------------------- //
        else {
            finalState = record.v
        }


        // warning!!!!!!
        // don'te remove this initialized part else infinite render
        setState(finalState)
        setStateInitialized(true)
        return finalState
    }


    function notify(value: T) {
        if (!LISTENERS.has(cacheKey)) return

        for (const fn of LISTENERS.get(cacheKey)!) {
            fn(value)
        }
    }

    async function update(next: Function | any) {
        const value = typeof next === "function" ? next(state) : next
        setState(value)

        // building records.
        const record = buildRecord(value)

        // only save to memory if the useL1Memory is true else not 
        useL1Memory && MEMORY.set(cacheKey, record);

        // save to storage if the behavior is to store
        (defaultBehavior === "default" || defaultBehavior === "storage") && write(record);

        notify(value)
    }


    function buildRecord(value: any) {
        const now = Date.now()

        return {
            v: value,
            c: now,
            e: ttl ? (now + (ttl * 1000)) : null,
            ver: dataBaseVersion
        }
    }

    // check if the cache is expired or not, if ttl is null 
    // it will not be expired for ever else on given ttl period of time.
    function isExpired(exTTL: number) {
        return exTTL !== null && Date.now() > exTTL
    }

    async function getRecord() {
        // only get from memory if the useL1Memory is true else not 
        if (useL1Memory && MEMORY.has(cacheKey)) return MEMORY.get(cacheKey)

        const record = await read()

        // only save to memory if the useL1Memory is true and indexDB have data else not 
        if (record && useL1Memory) MEMORY.set(cacheKey, record)
        return record
    }

    async function removeRecord() {
        // only delete from memory if the useL1Memory is true else not 
        useL1Memory && MEMORY.delete(cacheKey)
        await del()
    }


    function openDB(): Promise<IDBDatabase> {
        const key = `${databaseName}_${dataBaseVersion}`
        if (DB_PROMISE_MAP.has(key)) return DB_PROMISE_MAP.get(key)!

        const promise = new Promise<IDBDatabase>((resolve, reject) => {
            const req = indexedDB.open(databaseName!, dataBaseVersion)
            req.onupgradeneeded = e => {
                const db = (e.target as IDBOpenDBRequest).result
                if (!db.objectStoreNames.contains(storeName!)) {
                    db.createObjectStore(storeName!)
                }
            }
            req.onsuccess = () => resolve(req.result)
            req.onerror = () => reject(req.error)
        })

        DB_PROMISE_MAP.set(key, promise)
        return promise
    }

    async function write(value: any) {
        const db = await openDB()

        return new Promise<void>((res, rej) => {
            const tx = db.transaction(storeName!, "readwrite")
            tx.objectStore(storeName!).put(value, cacheKey)
            tx.oncomplete = () => res()
            tx.onerror = () => rej(tx.error)
        })
    }


    async function read() {
        const db = await openDB()

        return new Promise((res, rej) => {
            const tx = db.transaction(storeName!, "readonly")
            const req = tx.objectStore(storeName!).get(cacheKey)
            req.onsuccess = () => res(req.result || null)
            req.onerror = () => rej(req.error)
        })
    }

    async function del() {
        const db = await openDB()

        return new Promise((res, rej) => {
            const tx = db.transaction(storeName!, "readwrite")
            tx.objectStore(storeName!).delete(cacheKey)
            tx.oncomplete = res
            tx.onerror = () => rej(tx.error)
        })
    }

    return [selector(state), update, asyncState, stateInitialized]
}
