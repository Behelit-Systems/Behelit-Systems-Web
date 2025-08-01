// src/components/Cursor.tsx
import React, { useState, useEffect } from 'react';

export default function Cursor() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isHovered, setIsHovered] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (window.matchMedia("(pointer: fine)").matches) {
            const handleMouseMove = (e: MouseEvent) => {
                setCursorPosition({ x: e.clientX, y: e.clientY });
            };

            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);

            const interactiveElements = document.querySelectorAll('a, button');

            window.addEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', handleMouseEnter);
                element.addEventListener('mouseleave', handleMouseLeave);
            });

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                interactiveElements.forEach(element => {
                    element.removeEventListener('mouseenter', handleMouseEnter);
                    element.removeEventListener('mouseleave', handleMouseLeave);
                });
            };
        }
    }, []);

    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        return null;
    }

    return (
        <div
            className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
            style={{
                transform: `translate(calc(-50% + ${cursorPosition.x}px), calc(-50% + ${cursorPosition.y}px))`,
            }}
        ></div>
    );
}