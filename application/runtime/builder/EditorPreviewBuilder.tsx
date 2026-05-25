"use client";

import React, { useState, useMemo } from "react";
import { ComponentSchema } from "./type";
import { AppComponents } from "../dynamic-components";
import { getParsedSettings } from "../dynamic-components/base";
import { ComponentSchemaSettings } from "../dynamic-components/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { selectNode } from "../store/editorSlice";

export function EditorPreviewBuilderContent({ schema }: { schema: ComponentSchema }) {
    // ALL hooks MUST be called before any conditional returns (Rules of Hooks)
    const dispatch = useDispatch();
    const selectedNodeId = useSelector((state: RootState) => state.editor.selectedNodeId);
    const [hovered, setHovered] = useState(false);

    const isSelected = selectedNodeId === schema?.id;

    const parsed = useMemo(() => {
        if (!schema?.type) return {};
        try {
            return getParsedSettings(
                schema.type,
                JSON.parse(JSON.stringify(schema.settings || {})) as ComponentSchemaSettings
            );
        } catch {
            return {};
        }
    }, [schema?.type, schema?.settings]);

    // Conditional returns AFTER all hooks
    if (!schema) return null;

    const Component = AppComponents?.[schema.type];
    if (!Component) return null;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(selectNode(schema.id));
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    // Inject outline styling directly into components to show visual bounds in sandbox
    const style: React.CSSProperties = {
        ...(parsed.style || {}),
        cursor: "pointer",
        outline: isSelected
            ? "2px solid #3b82f6"
            : (hovered ? "1.5px dashed #3b82f6" : undefined),
        outlineOffset: "-2px",
    };

    // Make sure event handlers intercept normal navigation/submits in editing sandbox
    const componentProps = {
        ...parsed,
        style,
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        content: schema.label,
        value: schema.label,
    };

    return (
        <Component {...componentProps}>
            {schema?.children?.map((child, index) => (
                <EditorPreviewBuilderContent key={child.id || index} schema={child} />
            ))}
        </Component>
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
