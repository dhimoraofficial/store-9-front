import { ReactNode } from 'react';
import { BaseProps } from '../type';

/**
 * Structural configurations extracted out of incoming user parameters 
 * and translated by the parser layer down into operational React values.
 */
export interface ParsedBoxProps extends BaseProps {
    children?: ReactNode;
    display?: "block" | "flex" | "grid" | "inline-flex";
    direction?: "row" | "row-reverse" | "col" | "col-reverse";
    visibility?: "all" | "desktop-only" | "mobile-only";
    style?: React.CSSProperties;
}

/**
 * Component: ABox
 * Core engine structural building block. Translates flat validated configuration 
 * inputs from JSON layout schemas into operational layout boundaries with native responsive breakpoints.
 */
export default function ABox({
    children,
    id,
    display = "block",
    direction = "row",
    visibility = "all",
    style,
}: ParsedBoxProps) {

    // ----------------------------------------------------
    // TRANSLATION LAYER: Map Properties into Tailwind utilities
    // ----------------------------------------------------
    const displayClasses: Record<string, string> = {
        "block": "block",
        "flex": "flex",
        "grid": "grid",
        "inline-flex": "inline-flex"
    };

    const directionClasses: Record<string, string> = {
        "row": "flex-row",
        "row-reverse": "flex-row-reverse",
        "col": "flex-col",
        "col-reverse": "flex-col-reverse"
    };

    // Viewport layout break toggles matching Computer Durbar header structures
    const visibilityClasses: Record<string, string> = {
        "all": "",
        "desktop-only": "hidden lg:flex", // Hide from mobile viewport scales, force flex on large viewports
        "mobile-only": "flex lg:hidden"   // Active layout only on smaller devices, drop completely on desktop
    };

    // Resolve classes cleanly and exclude dead string artifacts
    const computedClassName = [
        displayClasses[display] || "block",
        display === "flex" || display === "inline-flex" ? (directionClasses[direction] || "flex-row") : "",
        visibilityClasses[visibility] || ""
    ].filter(Boolean).join(" ");

    return (
        <div
            id={id}
            className={computedClassName}
            style={style}
        >
            {children}
        </div>
    );
}
