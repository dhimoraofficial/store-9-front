"use client"

import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import Loader from '../loader';

declare global {
    interface Window {
        onButtonEvent?: boolean;
    }
}

export default function Button({
    // Core Props
    onClick, setReloadEvent = true, processing, onError, blockScroll = true, buttonLoading,

    // DOM elements
    disabled, className, style, title, htmlRef, children, type = "button", id
}: {
    onClick?: Function | undefined,
    setReloadEvent?: boolean | undefined,
    processing?: Function | undefined,
    onError?: Function | undefined,
    blockScroll?: boolean | undefined,
    buttonLoading?: boolean | undefined,

    // DOM elements
    disabled?: boolean | undefined,
    className?: string | undefined,
    style?: React.CSSProperties | undefined,
    title?: string | undefined,
    htmlRef?: RefObject<HTMLButtonElement> | undefined,
    children?: ReactNode | undefined,
    type?: "button" | "submit" | "reset" | undefined,
    id?: string | undefined
}) {
    const [loading, setLoading] = useState(buttonLoading || false)
    const ref = useRef(htmlRef?.current || null)

    async function handelLoaderClicked(event: any) {
        if (loading || window?.onButtonEvent) return

        window.onButtonEvent = (true && setReloadEvent)
        const targetElement = document.querySelector(".__drk__") as (HTMLElement | null)

        try {
            setLoading(true && setReloadEvent)
            typeof processing === "function" && processing(true)

            if (targetElement) {
                if (blockScroll) {
                    targetElement.style.overflow = "hidden"
                }
                if (setReloadEvent) {
                    targetElement.style.pointerEvents = "none"
                }
            }
            typeof onClick === "function" && await onClick(event)

        } catch (error) {
            if (typeof onError === "function") {
                await onError(error)
            } else if (process.env.NODE_ENV === "development") {
                console.warn(error);
                throw error
            }

        } finally {
            setLoading(false)
            typeof processing === "function" && processing(false)
            if (targetElement && blockScroll) {
                targetElement.style.overflow = "scroll"
            }
            if (targetElement && setReloadEvent) {
                targetElement.style.pointerEvents = "all"
            }
            window.onButtonEvent = false
        }
    }

    useEffect(() => {
        if (!buttonLoading) return

        setLoading(buttonLoading)
    }, [buttonLoading])

    useEffect(() => {
        if (htmlRef?.current && ref.current) {
            htmlRef.current = ref.current
        }

    }, [ref.current, htmlRef?.current])

    return <>
        <button
            id={id}
            // HTML ref
            ref={ref}
            type={type}
            title={loading ? "Processing..." : title}

            // Style
            style={style}

            // core
            disabled={loading || disabled}
            onClick={handelLoaderClicked}
            className={`__drk__smt_button ${className} relative cursor-pointer`}

        >
            {loading && <>
                <Loader height={"75%"} />
                <div className="__drk__cli_blo fixed top-0 cursor-wait right-0 w-full h-full z-1000"></div>
            </>}

            {children}
        </button>
    </>
}
