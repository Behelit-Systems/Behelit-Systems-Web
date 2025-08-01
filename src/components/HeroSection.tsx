// =========================================================
//  File: src/components/HeroSection.tsx
//
//  This is a React component containing the interactive hero text,
//  styled with Tailwind. The cursor logic has been moved to a separate component.
//
//  This version has been refactored to use a grid system for
//  better layout and Swiss design-inspired asymmetry.
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
                {/* Main Hero Section Grid - Now centered */}
                <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-7xl mx-auto md:gap-4 items-center justify-center">
                    
                    {/* Main Hero Text - Now centered on all screen sizes */}
                    <div className="col-span-12 flex flex-col justify-center text-center">
                        <h1 className="hero-text-wrapper font-['Helvetica'] font-bold leading-tight text-white
                                       flex flex-row flex-nowrap justify-center">
                            {originalWords.map((word, index) => (
                                <span 
                                    className={`hero-word relative text-[clamp(1.5rem,5vw,6rem)] mx-1 sm:mx-3 my-1 cursor-pointer 
                                                ${!isMobile ? 'group' : ''}`}
                                    key={index} 
                                    onClick={() => handleWordClick(index)}
                                >
                                    <span 
                                        className={`original transition-opacity duration-300 whitespace-nowrap 
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

                    {/* Subtext and CTA Button - Now centered on all screen sizes */}
                    <div className="col-span-12 flex flex-col items-center justify-center mt-4 sm:mt-8 md:mt-0 space-y-4 sm:space-y-6 md:space-y-4">
                        <h2 className="text-sm sm:text-2xl font-normal text-neutral-400 uppercase tracking-widest text-center">
                            Engineering unyielding resilience, from silicon to people.
                        </h2>
                        {/* The new "CONTACT" button with text-swap hover effect */}
                        <a href="mailto:hello@behelitsystems.com" className="group relative flex w-[170px] h-[45px] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-transparent no-underline">
                            <div className="btn-txt-1 absolute flex h-full w-full items-center justify-center text-white transition-transform duration-300 group-hover:-translate-y-[45px] font-bold uppercase">
                                CONTACT
                            </div>
                            <div className="btn-txt-2 absolute flex h-full w-full translate-y-[45px] items-center justify-center bg-white text-black transition-transform duration-300 group-hover:translate-y-0 font-bold uppercase">
                                CONTACT
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HeroSection;
