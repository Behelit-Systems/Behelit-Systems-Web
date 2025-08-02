import React, { useEffect, useRef } from 'react';
import '../styles/cursor.css';

const Cursor: React.FC = () => {
    // Refs for the cursor elements
    const cursorContainerRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>();

    // This single useEffect hook handles all cursor logic.
    useEffect(() => {
        // On component mount, move the cursor's container div to be a direct
        // child of the document body. This prevents layout conflicts with the
        // luxy.js smooth-scrolling library, fixing the footer interaction issue.
        if (cursorContainerRef.current) {
            document.body.appendChild(cursorContainerRef.current);
        }

        const mousePos = { x: -100, y: -100 };

        // --- Main Animation Loop ---
        const animate = () => {
            if (cursorDotRef.current) {
                // Update the dot's position directly using CSS transforms.
                cursorDotRef.current.style.left = `${mousePos.x}px`;
                cursorDotRef.current.style.top = `${mousePos.y}px`;
            }
            animationFrameId.current = requestAnimationFrame(animate);
        };
        animate();

        // --- Event Listener Functions ---
        const updateMousePosition = (e: MouseEvent) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        };

        // Toggles the '.hovered' class on the dot for interactive elements.
        const onMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button')) {
                cursorDotRef.current?.classList.add('hovered');
            }
        };
        const onMouseOut = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button')) {
                cursorDotRef.current?.classList.remove('hovered');
            }
        };

        // Toggles the '.home' class for the special homepage cursor style.
        const checkPath = () => {
            if (cursorDotRef.current) {
                if (window.location.pathname === '/') {
                    cursorDotRef.current.classList.add('home');
                } else {
                    cursorDotRef.current.classList.remove('home');
                }
            }
        };

        // --- Setup and Teardown ---
        checkPath(); // Initial check on component mount.
        window.addEventListener('mousemove', updateMousePosition);
        document.body.addEventListener('mouseover', onMouseOver);
        document.body.addEventListener('mouseout', onMouseOut);
        document.addEventListener('astro:page-load', checkPath); // Re-check on every page navigation.

        // Cleanup function to prevent memory leaks.
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('mousemove', updateMousePosition);
            document.body.removeEventListener('mouseover', onMouseOver);
            document.body.removeEventListener('mouseout', onMouseOut);
            document.removeEventListener('astro:page-load', checkPath);
            
            // On unmount, remove the cursor element from the body to be tidy.
            if (cursorContainerRef.current && cursorContainerRef.current.parentNode) {
                cursorContainerRef.current.parentNode.removeChild(cursorContainerRef.current);
            }
        };
    }, []); // Empty dependency array ensures this runs only once.

    // The component now renders its div via a ref, which is then moved in the useEffect.
    return (
        <div ref={cursorContainerRef} className="cursor">
            <div ref={cursorDotRef} className="cursor-dot"></div>
        </div>
    );
};

export default Cursor;
