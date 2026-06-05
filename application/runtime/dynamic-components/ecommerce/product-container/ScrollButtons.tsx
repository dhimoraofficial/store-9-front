"use client";

import React from "react";
import { Flex, IconButton } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollButtons() {
    const triggerScroll = (e: React.MouseEvent, direction: "left" | "right") => {
        const scrollEvent = new CustomEvent("track-scroll", {
            detail: { direction, amount: 300 },
            bubbles: true,
        });

        // Scopes search to the parent unified container to support multiple track list modules
        const container = (e.currentTarget as HTMLElement).closest(".__app_unified_container");
        if (container) {
            container.querySelector(".rt-ScrollAreaViewport")?.dispatchEvent(scrollEvent);
        } else {
            document.querySelector(".rt-ScrollAreaViewport")?.dispatchEvent(scrollEvent);
        }
    };

    return (
        <Flex gap="2">
            <IconButton
                variant="outline"
                color="gray"
                highContrast
                onClick={(e) => triggerScroll(e, "left")}
                aria-label="Scroll left"
            >
                <ChevronLeft size={16} />
            </IconButton>
            <IconButton
                variant="outline"
                color="gray"
                highContrast
                onClick={(e) => triggerScroll(e, "right")}
                aria-label="Scroll right"
            >
                <ChevronRight size={16} />
            </IconButton>
        </Flex>
    );
}
