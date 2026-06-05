"use client";

import React, { useRef } from "react";
import { Flex, ScrollArea } from "@radix-ui/themes";

interface HorizontalScrollTrackProps {
    children: React.ReactNode;
}

export default function HorizontalScrollTrack({ children }: HorizontalScrollTrackProps) {
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScrollEvent = (e: Event) => {
            const customEvent = e as CustomEvent<{ direction: "left" | "right"; amount?: number }>;
            const viewport = scrollViewportRef.current?.querySelector(".rt-ScrollAreaViewport") || scrollViewportRef.current;
            if (!viewport) return;

            const amount = customEvent.detail.amount ?? 300;
            viewport.scrollBy({
                left: customEvent.detail.direction === "left" ? -amount : amount,
                behavior: "smooth",
            });
        };

        const node = scrollViewportRef.current;
        if (node) {
            node.addEventListener("track-scroll", handleScrollEvent);
        }
        return () => {
            if (node) node.removeEventListener("track-scroll", handleScrollEvent);
        };
    }, []);

    return (
        <ScrollArea
            type="hover"
            scrollbars="horizontal"
            style={{ width: "100%", paddingBottom: "var(--space-2)" }}
            ref={scrollViewportRef}
        >
            <Flex align="center" gap="4" style={{ display: "inline-flex", minWidth: "100%" }}>
                {children}
            </Flex>
        </ScrollArea>
    );
}
