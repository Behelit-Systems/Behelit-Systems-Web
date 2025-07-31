// =========================================================
//  File: src/components/HeroSection.tsx
//
//  This is a React component containing the interactive hero text,
//  custom cursor logic, all styled with Tailwind.
// =========================================================
import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar.tsx';

const HeroSection: React.FC = () => {
    // Refs for the custom cursor element
    const cursorDotRef = useRef<HTMLDivElement | null>(null);

    // Effect hook to handle the custom cursor's position and hover state
    useEffect(() => {
        const cursorDot = document.querySelector('.cursor-dot') as HTMLDivElement | null;
        cursorDotRef.current = cursorDot;
        const interactiveElements = document.querySelectorAll('.navbar-link, .hero-word, .hamburger-icon');

        // Handles cursor position and hover state
        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth > 768) {
                if (cursorDotRef.current) {
                    // Set the position of the cursor dot directly to the mouse coordinates.
                    // The CSS `transform: translate(-50%, -50%)` centers the dot.
                    cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                }

                // Check if the mouse is hovering over an interactive element
                const isHoveringInteractive = Array.from(interactiveElements || []).some(el => el.contains(e.target as Node));
                
                if (isHoveringInteractive) {
                    cursorDotRef.current?.classList.add('hovered');
                } else {
                    cursorDotRef.current?.classList.remove('hovered');
                }
            }
        };

        // Add event listener for mouse movement
        document.addEventListener('mousemove', handleMouseMove);

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const originalWords: string[] = ["SECURING", "WHAT", "OTHERS", "MISS"];
    const newWords: string[] = ["HIDDEN", "IN", "PLAIN", "SIGHT"];

    return (
        <>
            <Navbar />
            {/* Custom cursor element, visible on desktop only */}
            <div className="cursor md:block hidden">
                <div className="cursor-dot home"></div>
            </div>

            {/* Hero section with interactive text */}
            <div className="flex flex-col justify-center items-center w-full h-full p-4">
                <h1 className="hero-text-wrapper font-['Helvetica'] font-bold leading-tight text-center flex flex-row flex-wrap justify-center">
                    {originalWords.map((word, index) => (
                        <span className="hero-word group relative text-[clamp(3rem,8vw,6rem)] mx-3 my-1" key={index}>
                            <span className="original transition-opacity duration-300 text-white opacity-100 group-hover:opacity-0 whitespace-nowrap">{word}</span>
                            <span className="new absolute top-0 left-0 transition-opacity duration-300 text-red-500 font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap">{newWords[index]}</span>
                        </span>
                    ))}
                </h1>
            </div>
        </>
    );
};

export default HeroSection;