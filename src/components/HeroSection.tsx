// =========================================================
//  File: src/components/HeroSection.tsx
//
//  This is a React component containing the interactive hero text,
//  styled with Tailwind. The cursor logic has been moved to a separate component.
// =========================================================
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.tsx';

const HeroSection: React.FC = () => {
    // State to track the index of the word that is currently "tapped" on mobile
    const [tappedWordIndex, setTappedWordIndex] = useState<number | null>(null);
    // State to track if the device is mobile or not, initialized to false for server render
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // This effect runs only on the client side to correctly determine the device type
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set initial state
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this runs once on mount

    const originalWords: string[] = ["SECURING", "WHAT", "OTHERS", "MISS"];
    const newWords: string[] = ["HIDDEN", "IN", "PLAIN", "SIGHT"];

    // Handle click events for text on mobile
    const handleWordClick = (index: number) => {
        // We only want to handle this logic on mobile, where the cursor is not visible
        if (isMobile) {
            setTappedWordIndex(index === tappedWordIndex ? null : index);
        }
    };

    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center justify-center min-h-screen pt-[70px] px-4">
                {/* Hero section with interactive text */}
                <div className="flex flex-col justify-center items-center w-full">
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
                                    className={`new absolute top-0 left-0 transition-opacity duration-300 text-neutral-300 font-bold whitespace-nowrap 
                                                ${!isMobile ? 'group-hover:opacity-100' : ''} 
                                                ${tappedWordIndex === index ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    {newWords[index]}
                                </span>
                            </span>
                        ))}
                    </h1>
                </div>
            </main>
        </>
    );
};

export default HeroSection;