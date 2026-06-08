"use client";

import { RootState } from "@/bundles/store";
import { selectNode } from "@/bundles/store/editorSlice";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ComponentAllSchemaSettingsMap } from "../dynamic-components";
import { getParsedSettings } from "../dynamic-components/base";
import { ComponentSchemaSettings } from "../dynamic-components/core";
import { ComponentSchema } from "./type";

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
                schema.type as any,
                JSON.parse(JSON.stringify(schema.settings || {})) as ComponentSchemaSettings
            );
        } catch {
            return {};
        }
    }, [schema?.type, schema?.settings]);

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

    const handleMouseEnter = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHovered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        e.stopPropagation();
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

    return (
        <div
            style={{ display: "contents" }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {contentElement}
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
