"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    Calendar,
    FileType,
    Globe,
    User,
    CloudOff,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    Filter
} from "lucide-react";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
            
            // Enable scrolling if content exceeds maxHeight
            if (maxHeight && textarea.scrollHeight > maxHeight) {
                textarea.style.overflowY = "auto";
            } else {
                textarea.style.overflowY = "hidden";
            }
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface VercelV0ChatProps {
    onSubmit?: (message: string) => void;
}

export function VercelV0Chat({ onSubmit }: VercelV0ChatProps = {}) {
    const [value, setValue] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const handleSubmit = () => {
        if (value.trim()) {
            // If external handler exists, call it with the current value
            if (onSubmit) {
                onSubmit(value.trim());
            }
            
            // Reset the input field
            setValue("");
            adjustHeight(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8 min-w-0">
            <h1 className="text-4xl font-bold text-black dark:text-white text-center">
                What are you searching for today ?
            </h1>

            <div className="w-full min-w-0 relative">
                <div className="relative bg-[var(--main-white)] rounded-xl border border-neutral-200">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me for anything, I’ll probe your knowledge base for you"
                            className={cn(
                                "w-full px-4 py-3",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-[var(--main-bg-text)] text-sm",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-[var(--neutral-500)] placeholder:text-sm",
                                "min-h-[60px]",
                                "[scrollbar-width:none]", /* Firefox */
                                "[&::-webkit-scrollbar]:hidden" /* WebKit */
                            )}
                            style={{
                                overflowY: "auto", // Allow vertical scrolling
                                msOverflowStyle: "none", // IE and Edge
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="group p-2 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Paperclip className="w-4 h-4 text-[var(--main-text-bg)]" />
                                <span className="text-xs text-[var(--neutral-500)] hidden group-hover:inline transition-opacity">
                                    Attach
                                </span>
                            </button>
                        
                            <button
                                type="button"
                                className="group p-2 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Globe className="w-4 h-4 text-[var(--main-text-bg)]" />
                                <span className="text-xs text-[var(--neutral-500)] hidden group-hover:inline transition-opacity">
                                    Web Search
                                </span>
                            </button>
                        
                            <button
                                type="button"
                                className="group p-2 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <CloudOff className="w-4 h-4 text-[var(--main-text-bg)]" />
                                <span className="text-xs text-[var(--neutral-500)] hidden group-hover:inline transition-opacity">
                                    Disconnect Drive
                                </span>
                            </button>
                        
                            <button
                                type="button"
                                onClick={toggleFilters}
                                className={cn(
                                    "group p-2 rounded-lg transition-colors flex items-center gap-1",
                                    showFilters 
                                        ? "bg-[var(--primary-500)] hover:bg-[var(--primary-600)]" 
                                        : "hover:bg-neutral-100"
                                )}
                            >
                                <Filter className={cn(
                                    "w-4 h-4", 
                                    showFilters ? "text-white" : "text-[var(--main-text-bg)]"
                                )} />
                                <span className={cn(
                                    "text-xs hidden group-hover:inline transition-opacity",
                                    showFilters ? "text-white" : "text-[var(--neutral-500)]"
                                )}>
                                    Filter
                                </span>
                            </button>
                        </div>
                        
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={cn(
                                "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 flex items-center justify-between gap-1",
                                value.trim()
                                    ? "bg-[var(--main-text-bg)] text-[var(--main-white)]"
                                    : "text-[var(--neutral-500)]"
                            )}
                        >
                            <ArrowUpIcon
                                className={cn(
                                    "w-4 h-4",
                                    value.trim()
                                        ? "text-[var(--main-white)]"
                                        : "text-[var(--main-text-bg)]"
                                )}
                            />
                            <span className="sr-only">Send</span>
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="absolute left-0 right-0 top-full mt-4 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-top-5 duration-300">
                        <ActionButton
                            icon={<Calendar className="w-4 h-4" />}
                            label="File Date"
                        />
                        <ActionButton
                            icon={<User className="w-4 h-4" />}
                            label="File Author"
                        />
                        <ActionButton
                            icon={<FileType className="w-4 h-4" />}
                            label="File Type"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--main-white)] hover:bg-neutral-100 rounded-full border border-neutral-200 text-[var(--neutral-500)] hover:text-[var(--main-text-bg)] transition-colors"
        >
            <span className="text-[var(--main-text-bg)]">{icon}</span>
            <span className="text-xs">{label}</span>
        </button>
    );
}


