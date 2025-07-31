// =========================================================
//  File: src/components/HeroSection.tsx
//
//  This is a React component containing the interactive hero text,
//  custom cursor logic, all styled with Tailwind.
// =========================================================
import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar.tsx';

const HeroSection: React.FC = () => {
    // Refs for the custom cursor element
    const cursorDotRef = useRef<HTMLDivElement | null>(null);
    // State to track the index of the word that is currently "tapped" on mobile
    const [tappedWordIndex, setTappedWordIndex] = useState<number | null>(null);
    // State to track if the device is mobile or not
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Effect hook to determine if the device is mobile and to handle custom cursor's position and hover state
    useEffect(() => {
        // This code only runs on the client, so `window` is always defined here.
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set initial state
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        const cursorDot = document.querySelector('.cursor-dot') as HTMLDivElement | null;
        cursorDotRef.current = cursorDot;
        const interactiveElements = document.querySelectorAll('.navbar-link, .hero-word, .hamburger-icon');

        // Handles cursor position and hover state on desktop only
        const handleMouseMove = (e: MouseEvent) => {
            if (!isMobile) {
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

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMobile]); // Re-run effect when isMobile state changes

    const originalWords: string[] = ["SECURING", "WHAT", "OTHERS", "MISS"];
    const newWords: string[] = ["HIDDEN", "IN", "PLAIN", "SIGHT"];

    // Handle click events for text on mobile
    const handleWordClick = (index: number) => {
        if (isMobile) {
            setTappedWordIndex(index === tappedWordIndex ? null : index);
        }
    };

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
                        <span 
                            className={`hero-word relative text-[clamp(3rem,8vw,6rem)] mx-3 my-1 cursor-pointer 
                                        ${!isMobile ? 'group' : ''}`}
                            key={index} 
                            onClick={() => handleWordClick(index)}
                        >
                            <span 
                                className={`original transition-opacity duration-300 text-white whitespace-nowrap 
                                            ${!isMobile ? 'group-hover:opacity-0' : ''} 
                                            ${tappedWordIndex === index ? 'opacity-0' : 'opacity-100'}`}
                            >
                                {word}
                            </span>
                            <span 
                                className={`new absolute top-0 left-0 transition-opacity duration-300 text-red-500 font-bold whitespace-nowrap 
                                            ${!isMobile ? 'group-hover:opacity-100' : ''} 
                                            ${tappedWordIndex === index ? 'opacity-100' : 'opacity-0'}`}
                            >
                                {newWords[index]}
                            </span>
                        </span>
                    ))}
                </h1>
            </div>
        </>
    );
};

export default HeroSection;