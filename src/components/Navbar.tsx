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
            <nav 
                className="fixed top-0 left-0 w-full flex items-center z-10 font-sans h-[70px] backdrop-blur-sm bg-black/80 border-b border-white/20 shadow-lg"
                style={{ boxShadow: '0 9px 20px -10px #000000ad' }}
            >
                <div className="md:flex hidden items-center ml-[70px] space-x-[50px]">
                    <a href="/" className="menu-link text-white text-base font-normal uppercase transition-all duration-300 hover:text-neutral-500">HOME</a>
                    <a href="/projects" className="menu-link text-white text-base font-normal uppercase transition-all duration-300 hover:text-neutral-500">PROJECTS</a>
                    <a href="/misc" className="menu-link text-white text-base font-normal uppercase transition-all duration-300 hover:text-neutral-500">MISC</a>
                    <a href="/about" className="menu-link text-white text-base font-normal uppercase transition-all duration-300 hover:text-neutral-500">ABOUT</a>
                </div>
                {/* Hamburger menu, visible on mobile only */}
                <div 
                    className="hamburger-icon text-3xl leading-none transition-transform duration-300 md:hidden block cursor-pointer ml-auto mr-6"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? '×' : '☰'}
                </div>
            </nav>

            {/* Mobile full-screen menu */}
            <div className={`fixed inset-0 bg-black flex-col justify-center items-center transition-transform duration-300 z-20 md:hidden flex ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close button for the mobile menu */}
                <div 
                    className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    ×
                </div>
                <a href="/" className="text-[clamp(3rem,10vw,5rem)] my-4 text-white decoration-none uppercase font-normal">HOME</a>
                <a href="/projects" className="text-[clamp(3rem,10vw,5rem)] my-4 text-white decoration-none uppercase font-normal">PROJECTS</a>
                <a href="/misc" className="text-[clamp(3rem,10vw,5rem)] my-4 text-white decoration-none uppercase font-normal">MISC</a>
                <a href="/about" className="text-[clamp(3rem,10vw,5rem)] my-4 text-white decoration-none uppercase font-normal">ABOUT</a>
            </div>
        </>
    );
};

export default Navbar;