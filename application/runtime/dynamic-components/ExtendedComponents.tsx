"use client";

import React, { useState, useEffect } from "react";
import ABox from "./Box";
import AText from "./Text";
import AButton from "./Button";
import ALink from "./Link";
import AImage from "./Image";
import AIcon from "./Icon";
import AInput from "./Input";

// 1. Structural Layout Containers

export function AModalBox({ children, style, timeDelay, exitIntent, scrollDepth, modalBg, ...props }: any) {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div 
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: modalBg || "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                ...style
            }}
            onClick={() => setIsOpen(false)}
            {...props}
        >
            <div 
                style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "12px",
                    maxWidth: "500px",
                    width: "100%",
                    position: "relative",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "#9ca3af"
                    }}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}

export function ADrawerBox({ children, style, drawerPosition = "right", drawerWidth = "350px", ...props }: any) {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    const isLeft = drawerPosition === "left";

    return (
        <div 
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 9990,
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                ...style
            }}
            onClick={() => setIsOpen(false)}
            {...props}
        >
            <div 
                style={{
                    background: "white",
                    width: drawerWidth,
                    height: "100%",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600 }}>Drawer</span>
                    <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function AAccordionBox({ children, style, allowMultiple = "true", ...props }: any) {
    const [activeIndexes, setActiveIndexes] = useState<number[]>([0]);

    const toggleIndex = (index: number) => {
        if (allowMultiple === "true") {
            setActiveIndexes(prev => 
                prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
            );
        } else {
            setActiveIndexes(prev => prev.includes(index) ? [] : [index]);
        }
    };

    const childrenArray = React.Children.toArray(children);

    return (
        <div style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", ...style }} {...props}>
            {childrenArray.map((child: any, idx) => {
                const isOpen = activeIndexes.includes(idx);
                return (
                    <div key={idx} style={{ borderBottom: idx < childrenArray.length - 1 ? "1px solid #e5e7eb" : "none" }}>
                        <div 
                            onClick={() => toggleIndex(idx)}
                            style={{ padding: "14px 16px", background: "#f9fafb", cursor: "pointer", fontWeight: 600, display: "flex", justifyContent: "space-between" }}
                        >
                            <span>{child.props?.label || `Section ${idx + 1}`}</span>
                            <span>{isOpen ? "−" : "+"}</span>
                        </div>
                        {isOpen && (
                            <div style={{ padding: "16px", background: "white" }}>
                                {child}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export function ATabsBox({ children, style, tabsLayout = "horizontal", ...props }: any) {
    const [activeTab, setActiveTab] = useState(0);
    const childrenArray = React.Children.toArray(children);
    const isVertical = tabsLayout === "vertical";

    return (
        <div 
            style={{ 
                display: "flex", 
                flexDirection: isVertical ? "row" : "column", 
                width: "100%", 
                ...style 
            }} 
            {...props}
        >
            <div 
                style={{ 
                    display: "flex", 
                    flexDirection: isVertical ? "column" : "row", 
                    borderBottom: isVertical ? "none" : "1px solid #e5e7eb",
                    borderRight: isVertical ? "1px solid #e5e7eb" : "none",
                    gap: "8px",
                    padding: "8px"
                }}
            >
                {childrenArray.map((child: any, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        style={{
                            padding: "10px 16px",
                            background: activeTab === idx ? "#f3f4f6" : "none",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: activeTab === idx ? 600 : 400,
                            textAlign: "left"
                        }}
                    >
                        {child.props?.label || `Tab ${idx + 1}`}
                    </button>
                ))}
            </div>
            <div style={{ flex: 1, padding: "16px" }}>
                {childrenArray[activeTab]}
            </div>
        </div>
    );
}

export function AStickyBox({ children, style, stickyPosition = "top", ...props }: any) {
    return (
        <div 
            style={{
                position: "sticky",
                [stickyPosition]: 0,
                zIndex: 100,
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
}

export function ASplitHeroBox({ children, style, splitRatio = "50-50", flipOnMobile = "true", ...props }: any) {
    const ratios: Record<string, string> = {
        "50-50": "1fr 1fr",
        "60-40": "3fr 2fr",
        "40-60": "2fr 3fr"
    };

    return (
        <div 
            style={{
                display: "grid",
                gridTemplateColumns: ratios[splitRatio] || "1fr 1fr",
                gap: "24px",
                width: "100%",
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
}

export function AStackBox({ children, style, overlayColor, ...props }: any) {
    const childrenArray = React.Children.toArray(children);
    return (
        <div style={{ position: "relative", width: "100%", ...style }} {...props}>
            {childrenArray[0]}
            <div 
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: overlayColor || "rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "24px"
                }}
            >
                {childrenArray.slice(1)}
            </div>
        </div>
    );
}

export function AMasonryBox({ children, style, masonryColumns = 3, ...props }: any) {
    return (
        <div 
            style={{
                columnCount: Number(masonryColumns),
                columnGap: "16px",
                width: "100%",
                ...style
            }}
            {...props}
        >
            {React.Children.map(children, (child: any) => (
                <div style={{ breakInside: "avoid", marginBottom: "16px" }}>
                    {child}
                </div>
            ))}
        </div>
    );
}

// 2. Content Elements & Atoms

export function ASpacerBlock({ style, heightDesktop = "32px", heightMobile = "16px", ...props }: any) {
    return (
        <div 
            className="hidden md:block" 
            style={{ height: heightDesktop, ...style }} 
            {...props} 
        />
    );
}

export function ADividerBlock({ style, thickness = "1px", color = "#e5e7eb", dividerStyle = "solid", ...props }: any) {
    return (
        <hr 
            style={{
                border: "none",
                borderTop: `${thickness} ${dividerStyle} ${color}`,
                width: "100%",
                margin: "12px 0",
                ...style
            }}
            {...props}
        />
    );
}

export function AVideoBlock({ style, src, autoPlay = "false", loop = "false", muted = "false", ...props }: any) {
    return (
        <video 
            src={src || "https://assets.mixkit.co/videos/preview/mixkit-shopping-bags-close-up-holding-and-walking-41973-large.mp4"}
            autoPlay={autoPlay === "true"}
            loop={loop === "true"}
            muted={muted === "true"}
            controls
            style={{ width: "100%", borderRadius: "8px", ...style }}
            {...props}
        />
    );
}

export function ARatingBlock({ style, ratingValue = 4.5, ratingColor = "#f59e0b", ratingSize = "18px", ...props }: any) {
    const val = Number(ratingValue);
    return (
        <div style={{ display: "flex", gap: "4px", alignItems: "center", ...style }} {...props}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span 
                    key={star} 
                    style={{ 
                        color: star <= val ? ratingColor : "#e5e7eb", 
                        fontSize: ratingSize 
                    }}
                >
                    ★
                </span>
            ))}
            <span style={{ fontSize: "12px", color: "#6b7280", marginLeft: "4px" }}>({val})</span>
        </div>
    );
}

export function ABadgeBlock({ style, badgeText = "SALE", ...props }: any) {
    return (
        <span 
            style={{
                display: "inline-block",
                padding: "4px 8px",
                fontSize: "10px",
                fontWeight: "bold",
                borderRadius: "4px",
                backgroundColor: "#ef4444",
                color: "white",
                textTransform: "uppercase",
                ...style
            }}
            {...props}
        >
            {badgeText}
        </span>
    );
}

export function AHtmlBlock({ style, htmlContent = "<p>Raw HTML Content</p>", sanitize = "true", ...props }: any) {
    return (
        <div 
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
            style={{ ...style }} 
            {...props} 
        />
    );
}

export function AProgressBarBlock({ style, progressValue = 6, progressMax = 10, progressColor = "#ef4444", ...props }: any) {
    const pct = Math.min(100, Math.max(0, (Number(progressValue) / Number(progressMax)) * 100));
    return (
        <div style={{ width: "100%", ...style }} {...props}>
            <div style={{ width: "100%", height: "8px", backgroundColor: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", backgroundColor: progressColor, transition: "width 0.3s ease" }} />
            </div>
            <div style={{ fontSize: "11px", color: "#374151", marginTop: "4px" }}>
                Only {progressValue} items left in stock!
            </div>
        </div>
    );
}

export function AMapBlock({ style, latitude, longitude, zoom = 14, ...props }: any) {
    return (
        <div 
            style={{
                width: "100%",
                height: "250px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
                fontSize: "13px",
                border: "1px dashed #d1d5db",
                ...style
            }}
            {...props}
        >
            📍 Map Marker at Lat: {latitude || "27.7"}, Lng: {longitude || "85.3"} (Zoom: {zoom})
        </div>
    );
}

export function APriceBlock({ style, amount = "1450.00", compareAt, currency = "NPR", ...props }: any) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", ...style }} {...props}>
            <span style={{ fontWeight: "bold", color: "#111827", fontSize: "16px" }}>{currency} {amount}</span>
            {compareAt && (
                <span style={{ textDecoration: "line-through", color: "#9ca3af", fontSize: "14px" }}>{currency} {compareAt}</span>
            )}
        </div>
    );
}

export function ACountdownBlock({ style, target, onExpiry = "hide", ...props }: any) {
    const [timeLeft, setTimeLeft] = useState("12h 45m 30s");

    return (
        <div 
            style={{
                display: "inline-flex",
                gap: "8px",
                padding: "8px 12px",
                backgroundColor: "#111827",
                color: "white",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "14px",
                ...style
            }}
            {...props}
        >
            ⏳ Ending In: {timeLeft}
        </div>
    );
}

// 3. Stateful Form Elements & Intake

export function ATextareaField({ style, rows = 3, placeholder = "Enter message...", ...props }: any) {
    return (
        <textarea 
            rows={Number(rows)}
            placeholder={placeholder}
            style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "13px",
                ...style
            }}
            {...props}
        />
    );
}

export function ACheckboxField({ style, checked = "false", label = "I agree to the terms", ...props }: any) {
    return (
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", ...style }} {...props}>
            <input type="checkbox" defaultChecked={checked === "true"} />
            <span>{label}</span>
        </label>
    );
}

export function ARadioField({ style, options = "Option 1,Option 2", ...props }: any) {
    const list = options.split(",");
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }} {...props}>
            {list.map((opt: string, idx: number) => (
                <label key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px" }}>
                    <input type="radio" name="radio-group" defaultChecked={idx === 0} />
                    <span>{opt}</span>
                </label>
            ))}
        </div>
    );
}

export function ASelectField({ style, options = "Option 1,Option 2", ...props }: any) {
    const list = options.split(",");
    return (
        <select 
            style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
                fontSize: "13px",
                outline: "none",
                ...style
            }}
            {...props}
        >
            {list.map((opt: string, idx: number) => (
                <option key={idx} value={opt}>{opt}</option>
            ))}
        </select>
    );
}

export function AQuantitySelector({ style, min = 1, max = 10, step = 1, ...props }: any) {
    const [val, setVal] = useState(1);
    return (
        <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden", ...style }} {...props}>
            <button 
                onClick={() => setVal(v => Math.max(Number(min), v - Number(step)))} 
                style={{ width: "32px", height: "32px", border: "none", background: "#f3f4f6", cursor: "pointer" }}
            >
                −
            </button>
            <span style={{ width: "40px", textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>{val}</span>
            <button 
                onClick={() => setVal(v => Math.min(Number(max), v + Number(step)))} 
                style={{ width: "32px", height: "32px", border: "none", background: "#f3f4f6", cursor: "pointer" }}
            >
                +
            </button>
        </div>
    );
}

// 4. E-Commerce Content Loops & Context Proxies

export function AProductLoopContext({ children, style, limit = 4, productSort = "best-selling", ...props }: any) {
    const mockedProducts = [
        { id: 1, title: "Premium Cotton Hoodie", price: "4500.00", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
        { id: 2, title: "Slim Fit Canvas Chino", price: "3200.00", image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=500" },
        { id: 3, title: "Classic Leather Boots", price: "8900.00", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500" },
        { id: 4, title: "Minimalist Watch", price: "6200.00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" }
    ].slice(0, Number(limit));

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", width: "100%", ...style }} {...props}>
            {mockedProducts.map(prod => (
                <div key={prod.id} style={{ border: "1px solid #f3f4f6", padding: "12px", borderRadius: "8px" }}>
                    <img src={prod.image} alt={prod.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" }} />
                    <h4 style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{prod.title}</h4>
                    <p style={{ color: "#ef4444", fontWeight: "bold", fontSize: "13px" }}>Rs. {prod.price}</p>
                </div>
            ))}
        </div>
    );
}

export function ACategoryLoopContext({ children, style, limit = 4, ...props }: any) {
    const mockedCategories = [
        { id: 1, name: "Summer Collection", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500" },
        { id: 2, name: "Outerwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
        { id: 3, name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
        { id: 4, name: "Accessories", image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=500" }
    ].slice(0, Number(limit));

    return (
        <div style={{ display: "flex", gap: "16px", overflowX: "auto", width: "100%", paddingBottom: "8px", ...style }} {...props}>
            {mockedCategories.map(cat => (
                <div key={cat.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", flexShrink: 0 }}>
                    <div style={{ width: "70px", height: "70px", borderRadius: "50%", overflow: "hidden", border: "2px solid #e5e7eb" }}>
                        <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 600, marginTop: "6px", color: "#374151" }}>{cat.name}</span>
                </div>
            ))}
        </div>
    );
}

export function ACartItemsContext({ children, style, emptyMessage = "Your cart is empty", ...props }: any) {
    const mockedCart = [
        { id: 1, title: "Premium Cotton Hoodie", price: "4500.00", qty: 1 },
        { id: 2, title: "Minimalist Watch", price: "6200.00", qty: 1 }
    ];

    if (mockedCart.length === 0) {
        return <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", ...style }}>{emptyMessage}</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", ...style }} {...props}>
            {mockedCart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f4f6", paddingBottom: "8px" }}>
                    <div>
                        <h5 style={{ fontWeight: 600, fontSize: "13px" }}>{item.title}</h5>
                        <span style={{ fontSize: "11px", color: "#6b7280" }}>Qty: {item.qty}</span>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>Rs. {item.price}</span>
                </div>
            ))}
        </div>
    );
}

export function AProductVariantSelector({ style, selectorStyle = "pills", ...props }: any) {
    const [selected, setSelected] = useState("M");
    const options = ["S", "M", "L", "XL"];

    return (
        <div style={{ display: "flex", gap: "8px", ...style }} {...props}>
            {options.map(opt => (
                <button
                    key={opt}
                    onClick={() => setSelected(opt)}
                    style={{
                        padding: "6px 12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        border: selected === opt ? "2px solid #111827" : "1px solid #d1d5db",
                        background: selected === opt ? "#111827" : "white",
                        color: selected === opt ? "white" : "#374151",
                        cursor: "pointer"
                    }}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

export function AProductImageGallery({ style, thumbnails = "bottom", zoom = "false", ...props }: any) {
    const images = [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
        "https://images.unsplash.com/photo-1556821840-4160db1ac1f4?w=600"
    ];
    const [active, setActive] = useState(0);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", ...style }} {...props}>
            <div style={{ width: "100%", height: "350px", borderRadius: "8px", overflow: "hidden" }}>
                <img src={images[active]} alt="Gallery focus" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
                {images.map((img, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setActive(idx)}
                        style={{ 
                            width: "60px", 
                            height: "60px", 
                            borderRadius: "6px", 
                            overflow: "hidden", 
                            border: active === idx ? "2px solid #111827" : "1px solid #e5e7eb",
                            cursor: "pointer" 
                        }}
                    >
                        <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
