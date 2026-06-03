"use client";

import React, { useState, useMemo } from "react";
import { ComponentSchema } from "./type";
import { ComponentAllSchemaSettingsMap } from "../dynamic-components";
import { COMPONENT_KEY_ALIASES } from "../dynamic-components/aliases";
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

    const resolvedType = COMPONENT_KEY_ALIASES[schema?.type] || schema?.type;

    const parsed = useMemo(() => {
        if (!resolvedType) return {};
        try {
            return getParsedSettings(
                resolvedType as any,
                JSON.parse(JSON.stringify(schema.settings || {})) as ComponentSchemaSettings
            );
        } catch {
            return {};
        }
    }, [resolvedType, schema?.settings]);

    // Conditional returns AFTER all hooks
    if (!schema) return null;

    const Component = (ComponentAllSchemaSettingsMap?.[resolvedType] as any)?.component;
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
        content: parsed.content !== undefined ? parsed.content : schema.label,
        value: parsed.value !== undefined ? parsed.value : schema.label,
    };

    const acceptsChildren = (ComponentAllSchemaSettingsMap?.[resolvedType] as any)?.acceptsChildren !== false;

    if (!acceptsChildren) {
        return <Component {...componentProps} />;
    }

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
