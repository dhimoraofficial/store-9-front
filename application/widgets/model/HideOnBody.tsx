"use client"

import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

type HideOnBodyProps = {
    className?: string
    close?: (_?: any) => void
    style?: React.CSSProperties
    children: ReactNode
    defaultClass?: string
    executable?: (event: MouseEvent | KeyboardEvent) => boolean
}

const __class_to_exclude = "__drk_hob_blocker"
const __drk__hob = "__drk_hob__"

export function HideOnBody({ className, close, style, defaultClass = "absolute top-0 right-0 z-10", children, executable }: HideOnBodyProps) {
    const closer = useRef<HTMLDivElement>(null);

    const handelBodyClicked = useCallback((event: MouseEvent) => {
        const path = typeof event.composedPath === "function" ? event.composedPath() : [];
        const clickedInsideProtectedBlock = path.some((node) => {
            return node instanceof Element && node.classList.contains(__class_to_exclude);
        });

        if (clickedInsideProtectedBlock || (event.target as Element | null)?.closest(`.${__class_to_exclude}`)) {
            return;
        }

        const shouldExecute = typeof executable === "function" ? executable(event) : true
        const clickedInsideModal = path.includes(closer.current as EventTarget) || closer.current?.contains(event.target as Node);

        if (!clickedInsideModal && shouldExecute) {
            event.preventDefault()
            typeof close === "function" && close()
        }

    }, [close, style, defaultClass, className, children, executable])


    const handelESCClicked = useCallback((event: KeyboardEvent) => {
        const shouldExecute = typeof executable === "function" ? executable(event) : true
        if (event.key === "Escape" && shouldExecute) {
            event.preventDefault()
            typeof close === "function" && close()
        }
    }, [close, style, defaultClass, className, children, executable])


    useEffect(() => {
        document.addEventListener("click", handelBodyClicked)
        window.addEventListener("keydown", handelESCClicked)

        return () => {
            document.removeEventListener("click", handelBodyClicked)
            window.removeEventListener("keydown", handelESCClicked)
        }
    }, [handelBodyClicked, handelESCClicked, close, style, defaultClass, className])


    return <div ref={closer} className={`${__drk__hob} ${className ? className : ""} ${defaultClass ? defaultClass : ""}`} style={style}>
        {children}
    </div>
}

export function DonTHide({ children, className, style }: {
    children?: ReactNode
    className?: string
    style?: React.CSSProperties
}) {
    return <div className={`${__class_to_exclude}${className ? ` ${className}` : ""}`} style={style}>
        {children}
    </div>
}