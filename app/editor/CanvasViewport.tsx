"use client";

import React, { useState, useRef, useEffect } from "react";
import { Maximize2, Minus, Plus, RotateCcw } from "lucide-react";

interface CanvasViewportProps {
    children: React.ReactNode;
    viewportWidth: string | number;
}

export default function CanvasViewport({ children, viewportWidth }: CanvasViewportProps) {
    const [scale, setScale] = useState(.9);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const [isAutoFit, setIsAutoFit] = useState(true);
    const [containerWidth, setContainerWidth] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const posStartRef = useRef({ x: 0, y: 0 });

    const targetWidth = typeof viewportWidth === "number"
        ? viewportWidth
        : parseInt(viewportWidth, 10) || 1280;

    // Track Spacebar key for theme-style space+drag panning
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
                setIsSpacePressed(true);
                // Prevent scrolling page with space
                e.preventDefault();
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                setIsSpacePressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Monitor container size dynamically to allow auto-fitting
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        observer.observe(container);
        return () => {
            observer.disconnect();
        };
    }, []);

    // Perform auto-fit calculation when container size or target viewport changes
    useEffect(() => {
        if (!isAutoFit || containerWidth <= 0) return;

        const margin = 48;
        const availableWidth = containerWidth - margin;
        const fitScale = Math.min(0.9, Math.max(0.15, availableWidth / targetWidth));
        setScale(fitScale);
    }, [isAutoFit, containerWidth, targetWidth]);

    // Wheel event listener for trackpad panning and zooming
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            if (e.ctrlKey) {
                // Pinch to zoom or Ctrl + Wheel Zoom
                const zoomFactor = 1.08;
                const nextScale = e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;
                const finalScale = Math.min(Math.max(nextScale, 0.15), 3);

                // Zoom relative to the mouse cursor position
                const rect = container.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                const dx = mouseX - position.x;
                const dy = mouseY - position.y;

                setIsAutoFit(false); // Disable auto-fit when manually zooming
                setPosition({
                    x: mouseX - dx * (finalScale / scale),
                    y: mouseY - dy * (finalScale / scale)
                });
                setScale(finalScale);
            } else {
                // Standard touchpad / wheel panning
                setPosition((pos) => ({
                    x: pos.x - e.deltaX,
                    y: pos.y - e.deltaY
                }));
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, [scale, position]);

    const handlePointerDown = (e: React.PointerEvent) => {
        // Drag-pan trigger: left-click on background, middle-click, or Space + click anywhere
        const isBgClick = e.target === containerRef.current || (e.target as HTMLElement).getAttribute("data-canvas-bg") === "true";
        const isMiddleClick = e.button === 1;

        if (isBgClick || isSpacePressed || isMiddleClick) {
            e.preventDefault();
            setIsDragging(true);
            dragStartRef.current = { x: e.clientX, y: e.clientY };
            posStartRef.current = { ...position };
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        e.preventDefault();

        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        setPosition({
            x: posStartRef.current.x + dx,
            y: posStartRef.current.y + dy
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (isDragging) {
            setIsDragging(false);
            try {
                (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            } catch (err) { }
        }
    };

    const handleZoomIn = () => {
        setIsAutoFit(false);
        setScale((prev) => Math.min(prev * 1.2, 3));
    };

    const handleZoomOut = () => {
        setIsAutoFit(false);
        setScale((prev) => Math.max(prev / 1.2, 0.15));
    };

    const handleReset = () => {
        setIsAutoFit(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleFit = () => {
        setIsAutoFit(true);
        if (!containerRef.current) return;
        const availableWidth = containerRef.current.clientWidth - 48;
        const fitScale = Math.min(0.9, Math.max(0.15, availableWidth / targetWidth));
        setScale(fitScale);
        setPosition({ x: 0, y: 20 });
    };

    const getCursorStyle = () => {
        if (isDragging) return "grabbing";
        if (isSpacePressed) return "grab";
        return "default";
    };

    return (
        <div
            ref={containerRef}
            data-canvas-bg="true"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="flex-1 w-full h-full relative overflow-hidden select-none outline-none"
            style={{
                cursor: getCursorStyle(),
                backgroundImage: "radial-gradient(#fbfafa2e 1.2px, transparent 1.2px)",
                backgroundSize: "20px 20px"
            }}
        >
            <div
                className="absolute flex items-start justify-center transition-transform duration-75 ease-out"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: "center center",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none"
                }}
            >
                <div
                    className="__drk_editor__ storefront-canvas border-zinc-200 border bg-white my-10"
                    style={{
                        width: viewportWidth,
                        minWidth: viewportWidth === "1280px" ? "1024px" : undefined,
                        height: "auto",
                        pointerEvents: "auto"
                    }}
                >
                    {children}
                </div>
            </div>

            {/* Floating theme-Style Controls */}
            <div className="absolute bottom-5 right-5 flex items-center bg-white border border-zinc-200/80 rounded-md shadow-lg px-2.5 py-1.5 gap-2.5 z-40 select-none">
                <span className="text-[11px] font-bold text-zinc-500 w-10 text-center font-mono">
                    {Math.round(scale * 100)}%
                </span>

                <div className="h-4 w-px bg-zinc-200" />

                <button
                    onClick={handleZoomOut}
                    className="p-1 rounded text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                    title="Zoom Out"
                >
                    <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={handleZoomIn}
                    className="p-1 rounded text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                    title="Zoom In"
                >
                    <Plus className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-px bg-zinc-200" />

                <button
                    onClick={handleFit}
                    className="p-1 rounded text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                    title="Fit view"
                >
                    <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={handleReset}
                    className="p-1 rounded text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                    title="Reset view"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
