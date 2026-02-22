import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Vitrex Timber Industries', path: '/vitrex' },
        { name: 'Agarwood', path: '/agarwood' },
        { name: 'Blog', path: '/blog' },
    ];

    const isDarkPage = location.pathname === '/agarwood';
    const isActive = (path) => location.pathname === path;

    const navTextColor = isDarkPage ? 'text-brand-cream' : 'text-brand-charcoal';
    const navMutedColor = isDarkPage ? 'text-brand-cream/80' : 'text-brand-charcoal/80';

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className={`text-2xl font-display font-bold italic z-50 transition-colors ${navTextColor}`}>
                    R&J <span className={`font-sans not-italic font-medium text-lg transition-colors ${isDarkPage ? 'text-brand-clay' : 'text-brand-moss'}`}>Wood Trading</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-sans text-sm tracking-wide transition-colors ${isActive(link.path) ? 'text-brand-clay font-medium' : `${navMutedColor} hover:text-brand-moss`
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className={`${isDarkPage ? 'bg-brand-cream text-brand-charcoal hover:bg-brand-clay hover:text-white' : 'bg-brand-charcoal text-brand-cream hover:bg-brand-moss'} px-6 py-2.5 rounded-full text-sm font-medium transition-colors`}>
                        Get Quote
                    </button>
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
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-8 bg-brand-charcoal text-brand-cream px-8 py-3 rounded-full text-lg font-medium"
                        >
                            Get Quote
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
