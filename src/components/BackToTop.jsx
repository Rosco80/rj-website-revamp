import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = React.useRef(null);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                if (!isVisible) setIsVisible(true);
            } else {
                if (isVisible) setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [isVisible]);

    useEffect(() => {
        if (isVisible && buttonRef.current) {
            gsap.fromTo(buttonRef.current,
                { opacity: 0, scale: 0.5, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            ref={buttonRef}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[60] bg-brand-charcoal text-white hover:bg-brand-clay p-4 rounded-full shadow-2xl transition-all duration-300 group flex items-center justify-center border border-white/10 backdrop-blur-sm"
            aria-label="Back to top"
        >
            <ArrowUp
                size={24}
                className="group-hover:-translate-y-1 transition-transform duration-300"
            />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-brand-clay opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
        </button>
    );
};

export default BackToTop;
