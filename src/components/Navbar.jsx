import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isQuoteDropdownOpen, setIsQuoteDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Wood Comparison', path: '/wood-comparison' },
        { name: 'Compliance', path: '/compliance' },
        { name: 'Vitrex Timber Industries', path: '/vitrex' },
        { name: 'Agarwood', path: '/agarwood' },
        { name: 'Blog', path: '/blog' },
        { name: 'Resources', path: '/resources' },
    ];

    const isDarkPage = location.pathname === '/agarwood';
    const isActive = (path) => location.pathname === path;

    const navTextColor = isDarkPage ? 'text-brand-cream' : 'text-brand-charcoal';
    const navMutedColor = isDarkPage ? 'text-brand-cream/80' : 'text-brand-charcoal/80';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsQuoteDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setIsQuoteDropdownOpen(false);
    }, [location.pathname]);

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 lg:px-24" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className={`text-2xl font-display font-bold italic z-50 transition-colors ${navTextColor}`}>
                    R&J <span className={`font-sans not-italic font-medium text-lg transition-colors ${isDarkPage ? 'text-brand-clay' : 'text-brand-moss'}`}>Wood Trading</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-sans text-xs xl:text-sm tracking-wide whitespace-nowrap transition-colors ${isActive(link.path) ? 'text-brand-clay font-medium' : `${navMutedColor} hover:text-brand-moss`
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Get Quote Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsQuoteDropdownOpen(!isQuoteDropdownOpen)}
                            className={`flex items-center gap-1.5 ${isDarkPage ? 'bg-brand-cream text-brand-charcoal hover:bg-brand-clay hover:text-white' : 'bg-brand-charcoal text-brand-cream hover:bg-brand-moss'} px-6 py-2.5 rounded-full text-sm font-medium transition-colors`}
                        >
                            Get in Touch
                            <ChevronDown size={14} className={`transition-transform ${isQuoteDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isQuoteDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-brand-charcoal/5 overflow-hidden animate-[fadeIn_0.15s_ease-out]">
                                <Link
                                    to="/quote"
                                    className="flex flex-col px-5 py-4 hover:bg-brand-moss/5 transition-colors border-b border-brand-charcoal/5"
                                >
                                    <span className="text-sm font-semibold text-brand-charcoal">Get a Quote</span>
                                    <span className="text-xs text-brand-charcoal/50 mt-0.5">Instant indicative pricing</span>
                                </Link>
                                <Link
                                    to="/contact"
                                    className="flex flex-col px-5 py-4 hover:bg-brand-moss/5 transition-colors"
                                >
                                    <span className="text-sm font-semibold text-brand-charcoal">Contact Us</span>
                                    <span className="text-xs text-brand-charcoal/50 mt-0.5">Send us an enquiry</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`md:hidden z-50 relative transition-colors ${navTextColor}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Nav Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 bg-brand-cream/95 backdrop-blur-md z-40 flex flex-col justify-center items-center gap-8 md:hidden">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`font-display italic text-4xl ${isActive(link.path) ? 'text-brand-clay' : 'text-brand-charcoal'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/quote"
                            onClick={() => setIsOpen(false)}
                            className="mt-8 bg-brand-charcoal text-brand-cream px-8 py-3 rounded-full text-lg font-medium"
                        >
                            Get a Quote
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="bg-brand-moss text-brand-cream px-8 py-3 rounded-full text-lg font-medium"
                        >
                            Contact Us
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
