"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "lucide-react";

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

interface SimplifiedChatProps {
    onSendMessage?: (message: string) => void;
    placeholder?: string;
}

export function SimplifiedChat({ 
    onSendMessage, 
    placeholder = "Got any follow-up questions?" 
}: SimplifiedChatProps) {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 36, // Reduced by 15% from 42px
        maxHeight: 119, // Reduced by 15% from 140px
    });

    const handleSendMessage = () => {
        if (value.trim()) {
            onSendMessage?.(value);
            setValue("");
            adjustHeight(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="w-[77%] mx-auto min-w-0"> 
            <div className="relative bg-[var(--main-white)] rounded-3xl border border-neutral-200 h-16"> {/* Added fixed height */}
                <div className="relative overflow-y-auto flex items-center h-full"> {/* Added h-full to take full container height */}
                    <Textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            adjustHeight();
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className={cn(
                            "w-full px-5 py-1.5 pr-10",
                            "resize-none",
                            "bg-transparent",
                            "border-none",
                            "text-[var(--main-text-bg)] text-sm",
                            "focus:outline-none",
                            "focus-visible:ring-0 focus-visible:ring-offset-0",
                            "placeholder:text-[var(--neutral-500)] placeholder:text-sm",
                            "min-h-[36px]",
                            "flex items-center",
                            "leading-normal",
                            "align-middle",
                            "my-auto" // Added for vertical centering within parent
                        )}
                        style={{
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center"
                        }}
                    />
                    
                    {/* Positioned button for vertical alignment */}
                    <button
                        type="button"
                        onClick={handleSendMessage}
                        className={cn(
                            "absolute right-2 top-1/2 transform -translate-y-1/2",
                            "px-1 py-0.5 rounded-full text-sm transition-colors border",
                            value.trim()
                                ? "bg-[var(--main-text-bg)] text-[var(--main-white)] border-[var(--main-text-bg)] hover:bg-[var(--neutral-800)]"
                                : "text-[var(--neutral-500)] border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100"
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
        </div>
    );
}
