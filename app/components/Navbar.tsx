"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {data: session} = useSession();
    console.log(session)



    return (
        <nav className=" z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center w-3/4">
                        <Link href="/" className="group">
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent hover:from-white hover:to-white transition-all duration-300 cursor-pointer tracking-tight">
                                H-Developers
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-8">
                        <li>
                            <Link href="https://github.com/hamsashahbaz11-rgb" className="relative text-white/80 hover:text-white transition-colors duration-300 group">
                                <span className="relative z-10">GitHub</span>
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/30 group-hover:w-full transition-all duration-300"></div>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.linkedin.com/in/hamza-shahbaz-a37637380/" className="relative text-white/80 hover:text-white transition-colors duration-300 group">
                                <span className="relative z-10">LinkedIn</span>
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/30 group-hover:w-full transition-all duration-300"></div>
                            </Link>
                        </li>
                        <li>
                            {session?.user ? (
                                <Link href="/upload" className="relative text-white/80 hover:text-white transition-colors duration-300 group">
                                    <span className="relative z-10">{session.user.email}</span>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/30 group-hover:w-full transition-all duration-300"></div>
                                </Link>) : (
                                <Link href="/register" className="relative text-white/80 hover:text-white transition-colors duration-300 group">
                                    <span className="relative z-10">Register</span>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/30 group-hover:w-full transition-all duration-300"></div>
                                </Link>)}
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center group"
                        aria-label="Toggle menu"
                    >
                        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`}></div>
                        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="pt-4 pb-2 space-y-3">
                        <li>
                            <Link
                                href="https://github.com/hamsashahbaz11-rgb"
                                className="block text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                GitHub
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://www.linkedin.com/in/hamza-shahbaz-a37637380/"
                                className="block text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                LinkedIn
                            </Link>
                        </li>
                        <li>
                             {session?.user ? (
                                <Link href="/upload"  className="block text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                                onClick={() => setIsMenuOpen(false)}>
                                    <span className="relative z-10">{session.user.email}</span>
                                  
                                </Link>) : (
                                <Link href="/register"  className="block text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                                onClick={() => setIsMenuOpen(false)}>
                                    <span className="relative z-10">Register</span>
                                 </Link>)}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

