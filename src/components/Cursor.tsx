import React, { useEffect, useRef } from 'react';
import '../styles/cursor.css';

const Cursor: React.FC = () => {
    const cursorContainerRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        // --- Mobile Device Check ---
        // If the user is on a mobile device, do not initialize the custom cursor.
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            return; // Exit the effect, disabling the cursor.
        }

        // Move the cursor container to the body to avoid stacking context issues.
        if (cursorContainerRef.current) {
            document.body.appendChild(cursorContainerRef.current);
        }

        const mousePos = { x: -100, y: -100 };
        const animate = () => {
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${mousePos.x}px`;
                cursorDotRef.current.style.top = `${mousePos.y}px`;
            }
            animationFrameId.current = requestAnimationFrame(animate);
        };
        animate();

        const updateMousePosition = (e: MouseEvent) => { mousePos.x = e.clientX; mousePos.y = e.clientY; };
        const onMouseOver = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a, button')) cursorDotRef.current?.classList.add('hovered'); };
        const onMouseOut = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a, button')) cursorDotRef.current?.classList.remove('hovered'); };
        const checkPath = () => {
            if (cursorDotRef.current) {
                cursorDotRef.current.classList.toggle('home', window.location.pathname === '/');
            }
        };

        checkPath();
        window.addEventListener('mousemove', updateMousePosition);
        document.body.addEventListener('mouseover', onMouseOver);
        document.body.addEventListener('mouseout', onMouseOut);
        document.addEventListener('astro:page-load', checkPath);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('mousemove', updateMousePosition);
            document.body.removeEventListener('mouseover', onMouseOver);
            document.body.removeEventListener('mouseout', onMouseOut);
            document.removeEventListener('astro:page-load', checkPath);
            if (cursorContainerRef.current?.parentNode) {
                cursorContainerRef.current.parentNode.removeChild(cursorContainerRef.current);
            }
        };
    }, []);

    // The component will still render the div initially, but the useEffect hook will
    // not run on mobile, so it will remain empty and unattached.
    return (
        <div ref={cursorContainerRef} className="cursor">
            <div ref={cursorDotRef} className="cursor-dot"></div>
        </div>
    );
};

export default Cursor;


