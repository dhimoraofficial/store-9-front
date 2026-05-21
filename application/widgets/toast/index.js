"use client";
import { CiCircleInfo, CiWarning } from "react-icons/ci";
import { MdOutlineErrorOutline, MdCheckCircle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { DonTHide } from "../model/HideOnBody";

export default function ToastCreator({ toast, clearToast }) {
    const onlyFirst = 7;
    const [removing, setRemoving] = useState(new Set());

    const getToastIcon = (type) => {
        switch (type) {
            case "error":
                return <MdOutlineErrorOutline size={20} className="text-red-500" />;
            case "success":
                return <MdCheckCircle size={20} className="text-green-500" />;
            case "warning":
                return <CiWarning size={20} className="text-orange-500" />;
            default:
                return <CiCircleInfo size={20} className="text-blue-500" />;
        }
    };

    const handleRemove = async (item, index) => {
        setRemoving(prev => new Set([...prev, item.id || index]));

        setTimeout(() => {
            if (typeof item.onClose === "function") {
                item.onClose();
            }
            clearToast(item.id);
            setRemoving(prev => {
                const next = new Set(prev);
                next.delete(item.id || index);
                return next;
            });
        }, 300);
    };

    useEffect(() => {
        const timers = [];

        toast.slice(0, onlyFirst).forEach((item, index) => {
            const timer = setTimeout(() => {
                handleRemove(item, index);
            }, 1000 * (item?.duration || 5));

            timers.push(timer);
        });

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [toast]);

    return (
        <>
            {!!toast?.length && (
                <DonTHide className="fixed bottom-4 right-4 z-1000 space-y-2 max-w-[380px] w-full">
                    {toast.slice(0, onlyFirst).map((item, index) => {
                        const isRemoving = removing.has(item.id || index);

                        return (
                            <div
                                key={item.id || index}
                                className={`border bg-surface rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out ${isRemoving
                                    ? 'opacity-0 translate-x-full scale-95'
                                    : 'opacity-100 translate-x-0 scale-100'
                                    }`}
                                style={{
                                    animation: isRemoving ? 'none' : 'slideIn 0.3s ease-out'
                                }}
                            >
                                <div className="fcc gap-3">
                                    <div className="shrink-0 mt-0.5">
                                        {item.icon || getToastIcon(item.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        {item?.title && <p className="text-xs font-medium">
                                            {item.title}
                                        </p>}
                                        {item?.message && (
                                            <p className="mt-1 text-xs">
                                                {item.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(item, index);
                                        }}
                                        className="shrink-0 hover:transition-colors"
                                    >
                                        <RxCross1 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </DonTHide>
            )}

            <style jsx>{`
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(100%) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}`}</style>
        </>
    );
}