"use client"

import { ReactNode, useCallback, useEffect, useState } from "react"
import { HideOnBody } from "./HideOnBody"
import { ModelCloser } from "./ModelCloser"

const CLOSE_DURATION: Record<string, number> = {
    right: 380,
    left: 380,
    centre: 280,
}

let PREVIOUS_MODELS: string[] = []

export function PopUpModel({ id, onClose, type = "centre", closer_corner = 3, className, children, hideOnBody = true }: {
    id?: string,
    onClose?: (_: any) => void,
    closer_corner?: number,
    className?: string,
    children?: ReactNode,
    type?: "centre" | "right" | "left",
    hideOnBody?: boolean
}) {
    const modelID = id || `${type}-${className}-${closer_corner}-${hideOnBody}`
    const [closing, setClosing] = useState(false)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        document.body.style.paddingRight = "1px"

        return () => {
            document.body.style.overflow = "scroll"
            document.body.style.paddingRight = "0px"
        }
    }, [closer_corner, children, className])

    useEffect(() => {
        PREVIOUS_MODELS.push(modelID)

        return () => {
            PREVIOUS_MODELS = PREVIOUS_MODELS.filter(_x => _x !== modelID)
        }
    }, [])


    const handleClose = useCallback((e?: any) => {
        if (closing || (PREVIOUS_MODELS?.[PREVIOUS_MODELS.length - 1] !== modelID)) return

        setClosing(true)

        setTimeout(() => {
            setClosing(false)
            onClose?.(e)
        }, CLOSE_DURATION[type])

    }, [closing, onClose, type])

    const MODEL_CLASS = (type === "centre" ? `fcc` : type === "right" ? `fc justify-end` : "fc justify-start")
    const HOB_CLASS = (type === "centre" ? `max-h-[55vh] rounded-lg` : "max-h-full h-full")
    const SHOW_MODEL = (["centre"].includes(type))

    const OPEN_CLASS = type === "right" ? "animate-slide-in-right" : type === "left" ? "animate-slide-in-left" : "animate-popup-centre"
    const CLOSE_CLASS = type === "right" ? "animate-slide-out-right" : type === "left" ? "animate-slide-out-left" : "animate-popdown-centre"
    const ANIM_CLASS = closing ? CLOSE_CLASS : OPEN_CLASS


    return <div className={`__drk__model__ inset-0 ${MODEL_CLASS}`}>
        <HideOnBody close={hideOnBody ? handleClose : () => { }} className={`p-5 ${HOB_CLASS} ${ANIM_CLASS} ${className || ""}`}>
            {SHOW_MODEL && <ModelCloser corner={closer_corner} onClose={handleClose} />}
            {children}
        </HideOnBody>
    </div>
};
