// =========================================================
//  File: src/components/Navbar.tsx
//
//  This is a React component for the navigation bar, including
//  the mobile hamburger menu and its logic.
// =========================================================
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    // State to toggle the mobile menu's open/close status
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full flex justify-start items-center p-6 z-10 font-['Inter'] md:justify-start justify-between">
                <div className="md:flex hidden items-center">
                    <a href="#" className="text-white text-base font-bold mr-8 transition-colors duration-300 uppercase hover:text-gray-300">BRAND</a>
                    <a href="#" className="navbar-link text-white text-base font-normal mr-8 transition-colors duration-300 uppercase hover:text-gray-300">Work</a>
                    <a href="#" className="navbar-link text-white text-base font-normal mr-8 transition-colors duration-300 uppercase hover:text-gray-300">About</a>
                    <a href="#" className="navbar-link text-white text-base font-normal transition-colors duration-300 uppercase hover:text-gray-300">Contact</a>
                </div>
                {/* Hamburger menu, visible on mobile only */}
                <a href="#" className="text-white text-base font-bold uppercase md:hidden block">BRAND</a>
                <div 
                    className="hamburger-icon text-3xl leading-none transition-transform duration-300 md:hidden block cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    ☰
                </div>
            </nav>

            {/* Mobile full-screen menu */}
            <div className={`fixed inset-0 bg-black flex-col justify-center items-center transition-transform duration-300 z-20 md:hidden flex ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <a href="#" className="text-[clamp(3rem,10vw,5rem)] my-4 text-white decoration-none uppercase font-normal">Work</a>
                <a href="#" className="text-[clamp(3rem,10vw,5rem)] my-4 text-white decoration-none uppercase font-normal">About</a>
                <a href="#" className="text-[clamp(3rem,10vw,5rem)] my-4 text-white decoration-none uppercase font-normal">Contact</a>
            </div>
        </>
    );
};

export default Navbar;
