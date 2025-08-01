// =========================================================
//  File: src/components/Cursor.tsx
//
//  This is a new React component for the custom cursor.
//  It handles the cursor's position and hover effects.
// =========================================================
import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
    // Refs for the custom cursor element
    const cursorDotRef = useRef<HTMLDivElement | null>(null);
    // State to track if the device is mobile or not
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set initial state
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        const cursorDot = document.querySelector('.cursor-dot') as HTMLDivElement | null;
        cursorDotRef.current = cursorDot;
        // Select all elements that should trigger the cursor hover effect
        const interactiveElements = document.querySelectorAll('.menu-link, .hero-word, .hamburger-icon, a, button');

        const handleMouseMove = (e: MouseEvent) => {
            if (!isMobile) {
                if (cursorDotRef.current) {
                    cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                }

                const isHoveringInteractive = Array.from(interactiveElements || []).some(el => el.contains(e.target as Node));

                if (isHoveringInteractive) {
                    cursorDotRef.current?.classList.add('hovered');
                } else {
                    cursorDotRef.current?.classList.remove('hovered');
                }
            }
        };

        // Add event listener for mouse movement on desktop
        document.addEventListener('mousemove', handleMouseMove);

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMobile]);

    return (
        // Custom cursor element, visible on desktop only
        <div className="cursor md:block hidden">
            <div className="cursor-dot home"></div>
        </div>
    );
};

export default Cursor;
