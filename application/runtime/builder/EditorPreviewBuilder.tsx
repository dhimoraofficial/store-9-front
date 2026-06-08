"use client";

import { RootState } from "@/bundles/store";
import { selectNode } from "@/bundles/store/editorSlice";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { ComponentAllSchemaSettingsMap } from "../dynamic-components";
import { getParsedSettings } from "../dynamic-components/base";
import { ComponentSchemaSettings } from "../dynamic-components/core";
import { ComponentSchema } from "./type";

export function EditorPreviewBuilderContent({ schema }: { schema: ComponentSchema }) {
    // ALL hooks MUST be called before any conditional returns (Rules of Hooks)
    const dispatch = useDispatch();
    const selectedNodeId = useSelector((state: RootState) => state.editor.selectedNodeId);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [selectedInfo, setSelectedInfo] = useState<{
        rect: DOMRect;
        width: number;
        height: number;
    } | null>(null);

    const isSelected = selectedNodeId === schema?.id;

    const parsed = useMemo(() => {
        if (!schema?.type) return {};
        try {
            return getParsedSettings(
                schema.type as any,
                JSON.parse(JSON.stringify(schema.settings || {})) as ComponentSchemaSettings
            );
        } catch {
            return {};
        }
    }, [schema?.type, schema?.settings]);

    // Track position and size of selected element dynamically
    useEffect(() => {
        if (!isSelected) {
            setSelectedInfo(null);
            return;
        }

        let active = true;
        const updateBounds = () => {
            if (!active) return;
            const element = wrapperRef.current?.firstElementChild || wrapperRef.current;
            if (element) {
                const rect = element.getBoundingClientRect();
                setSelectedInfo(prev => {
                    if (
                        prev &&
                        prev.rect.top === rect.top &&
                        prev.rect.left === rect.left &&
                        prev.rect.width === rect.width &&
                        prev.rect.height === rect.height
                    ) {
                        return prev;
                    }
                    return {
                        rect,
                        width: (element as HTMLElement).offsetWidth || element.clientWidth || 0,
                        height: (element as HTMLElement).offsetHeight || element.clientHeight || 0,
                    };
                });
            }
            requestAnimationFrame(updateBounds);
        };

        updateBounds();

        return () => {
            active = false;
        };
    }, [isSelected, schema.id]);

    // Conditional returns AFTER all hooks
    if (!schema) return null;

    const Component = (ComponentAllSchemaSettingsMap?.[schema.type] as any)?.component;
    if (!Component) return null;

    const handleClick = (e: React.MouseEvent) => {
        if (e.ctrlKey) {
            // Let actual click over the document go through
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        dispatch(selectNode(schema.id));
    };

    // Style cleanup: remove custom outline, outline is handled by the maroon portal overlay
    const style: React.CSSProperties = {
        ...(parsed.style || {}),
        cursor: "pointer",
    };

    // Make sure event handlers intercept normal navigation/submits in editing sandbox
    const componentProps = {
        ...parsed,
        style,
        content: parsed.content !== undefined ? parsed.content : schema.label,
        value: parsed.value !== undefined ? parsed.value : schema.label,
    };

    const acceptsChildren = (ComponentAllSchemaSettingsMap?.[schema.type] as any)?.acceptsChildren !== false;

    const contentElement = acceptsChildren ? (
        <Component {...componentProps}>
            {schema?.children?.map((child, index) => (
                <EditorPreviewBuilderContent key={child.id || index} schema={child} />
            ))}
        </Component>
    ) : (
        <Component {...componentProps} />
    );

    const badgeOnTop = selectedInfo ? selectedInfo.rect.top > 30 : true;

    return (
        <div
            ref={wrapperRef}
            style={{ display: "contents" }}
            onClick={handleClick}
        >
            {contentElement}
            {isSelected && selectedInfo && typeof window !== "undefined" && createPortal(
                <div
                    style={{
                        position: "fixed",
                        top: selectedInfo.rect.top,
                        left: selectedInfo.rect.left,
                        width: selectedInfo.rect.width,
                        height: selectedInfo.rect.height,
                        pointerEvents: "none",
                        border: "2px solid #800000",
                        zIndex: 99999,
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            left: "0px",
                            ...(badgeOnTop ? { top: "-24px" } : { bottom: "-24px" }),
                            backgroundColor: "#800000",
                            color: "#ffffff",
                            fontSize: "10px",
                            fontFamily: "monospace",
                            fontWeight: "bold",
                            padding: "2px 6px",
                            borderRadius: "3px",
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                    >
                        {selectedInfo.width} × {selectedInfo.height}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

export default function EditorPreviewBuilder({ schema }: { schema: ComponentSchema | ComponentSchema[] }) {
    if (!schema) return null;

    if (Array.isArray(schema)) {
        return (
            <>
                {schema.map((s, index) => (
                    <EditorPreviewBuilderContent key={s.id || index} schema={s} />
                ))}
            </>
        );
    }

    return <EditorPreviewBuilderContent schema={schema} />;
}

