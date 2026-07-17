import { useState, useEffect } from "react";

/**
 * Typing + deleting animation hook.
 * Types out `text` character by character, pauses, then deletes and loops.
 */
export function useTypingAnimation(text, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1000) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;

        if (!isDeleting) {
            if (displayedText.length < text.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(text.slice(0, displayedText.length + 1));
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), pauseTime);
            }
        } else {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(text.slice(0, displayedText.length - 1));
                }, deletingSpeed);
            } else {
                setIsDeleting(false);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, text, typingSpeed, deletingSpeed, pauseTime]);

    return displayedText;
}

/**
 * Typewriter hook with configurable speeds.
 */
export function useTypewriter(text, typingSpeed = 250, deletingSpeed = 250, pauseTime = 1000) {
    return useTypingAnimation(text, typingSpeed, deletingSpeed, pauseTime);
}
