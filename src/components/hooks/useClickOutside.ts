"use client";

import { useEffect, useCallback, RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickOutside(
    ref: RefObject<HTMLElement | null>,
    callback: () => void,
    enabled: boolean = true
) {
    const handleClick = useCallback(
        (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        },
        [ref, callback]
    );

    useEffect(() => {
        if (!enabled) return;

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [enabled, handleClick]);
}
