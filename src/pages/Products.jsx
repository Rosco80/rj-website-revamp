import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Note: Google Drive view links need to be converted to user content urls for img tags, 
// using the direct file ID extraction trick: https://drive.google.com/thumbnail?id=<FILE_ID>&sz=w1000
const getDriveImgUrl = (url) => {
    const match = url.match(/\/d\/(.*?)\/view/);
    if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
    return url;
};

const products = [
    {
        title: "Heavy Hardwood",
        category: "Structural Timber",
        image: "/products/Heavy_hard_wood.png",
        description: "Extremely durable, high-density timber designed for heavy structural use and critical load-bearing applications."
    },
    {
        title: "Medium Hardwood",
        category: "Versatile Timber",
        image: "/products/medium_hardwood_lumber.png",
        description: "Balanced strength and workability, ideal for general construction, heavy duty furniture, and decking."
    },
    {
        title: "Light Hardwood",
        category: "Interior & Joinery",
        image: "/products/Light_hardwood_P1.png",
        description: "Premium light hardwoods perfect for fine interior joinery, light structural work, and elegant paneling."
    },
    {
        title: "Light Hardwood (Alternative Profile)",
        category: "Interior & Joinery",
        image: "/products/light_hardwood_P2.png",
        description: "Alternative profiles of our signature light hardwoods, tailored for specialized architectural finishes."
    },
    {
        title: "Mixed Hardwood",
        category: "General Construction",
        image: "/products/mixed_Hardwood.png",
        description: "A robust combination of selected hardwood species offering excellent utility and structural value."
    },
    {
        title: "Plywood",
        category: "Engineered Wood",
        image: "/products/plywoodpng.png",
        description: "High-grade, sustainably bonded plywood providing exceptional stability for both structural and decorative purposes."
    },
    {
        title: "Hardwood Flooring",
        category: "Interiors",
        image: "/products/flooring.png",
        description: "Elegant and resilient flooring solutions combining structural integrity with rich, warm organic textures."
    }
];

const Products = () => {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef(null);
    const modalImageRef = useRef(null);

    useEffect(() => {
        // Header Animation
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Staggered Grid Animation
        const cards = gsap.utils.toArray('.product-card');
        cards.forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, []);

    // Modal fade in/out animations
    useEffect(() => {
        if (selectedImage && modalRef.current && modalImageRef.current) {
            // Document body scroll lock
            document.body.style.overflow = 'hidden';

            gsap.timeline()
                .fromTo(modalRef.current,
                    { opacity: 0, backdropFilter: "blur(0px)" },
                    { opacity: 1, backdropFilter: "blur(12px)", duration: 0.4, ease: "power2.out" }
                )
                .fromTo(modalImageRef.current,
                    { scale: 0.9, opacity: 0, y: 20 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
                    "-=0.2"
                );
        } else {
            // Restore smooth scrolling on close
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    const closeModal = () => {
        if (modalRef.current && modalImageRef.current) {
            gsap.timeline({ onComplete: () => setSelectedImage(null) })
                .to(modalImageRef.current, { scale: 0.95, opacity: 0, y: 10, duration: 0.3, ease: "power2.in" })
                .to(modalRef.current, { opacity: 0, backdropFilter: "blur(0px)", duration: 0.3, ease: "power2.in" }, "-=0.2");
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <div className="w-full bg-brand-surface pt-32 pb-24 min-h-screen">

            {/* Modal Overlay */}
            {selectedImage && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-charcoal/80 p-4 md:p-8 cursor-zoom-out"
                    onClick={closeModal}
                >
                    <button
                        className="absolute top-6 right-6 text-brand-cream hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all z-[110]"
                        onClick={(e) => { e.stopPropagation(); closeModal(); }}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-full max-w-6xl max-h-[90vh] flex items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
                        <img
                            ref={modalImageRef}
                            src={selectedImage}
                            alt="Expanded product view"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl bg-white p-4"
                        />
                    </div>
                </div>
            )}

            {/* Products Header */}
            <section ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 text-center relative opacity-0">
                <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-4">
                    Our Portfolio
                </p>
                <h1 className="text-5xl md:text-7xl font-display italic text-brand-charcoal mb-6">
                    Complete Product Range
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-brand-charcoal/70 font-sans leading-relaxed">
                    From raw, sustainably logged teak to precision-cut architectural flooring. Explore our diverse selection of premium Malaysian timber, specifically processed to meet the rigorous demands of domestic and international markets.
                </p>
            </section>

            {/* Featured Wide Image */}
            <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-24 product-card">
                <div className="w-full h-[50vh] md:h-[60vh] rounded-[2rem] overflow-hidden relative shadow-2xl">
                    <img
                        src="/hero-products.png"
                        alt="Stacked Vitrex Timber Industries Logs"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-moss/80 via-transparent to-transparent flex items-end p-8 md:p-12">
                        <div className="max-w-xl text-white">
                            <p className="font-mono text-brand-cream/80 text-sm tracking-widest mb-2 uppercase">Signature Collection</p>
                            <h2 className="text-3xl md:text-4xl font-sans font-medium">Responsibly Managed Plantations</h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Layout */}
            <section ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-16">
                    {products.map((prod, i) => (
                        <div key={i} className="product-card group flex flex-col opacity-0">
                            <div
                                className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative bg-white border border-brand-charcoal/5 flex items-center justify-center p-6 shadow-sm cursor-zoom-in group/img"
                                onClick={() => setSelectedImage(prod.image)}
                            >
                                <img
                                    src={prod.image}
                                    alt={prod.title}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover/img:scale-105"
                                />
                                {/* Darken overlay on hover */}
                                <div className="absolute inset-0 bg-brand-charcoal/0 group-hover/img:bg-brand-charcoal/5 transition-colors duration-500"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 text-brand-charcoal p-3 rounded-full shadow-lg transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300">
                                        <ZoomIn className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <p className="font-mono text-brand-clay text-xs tracking-widest uppercase mb-2">
                                    {prod.category}
                                </p>
                                <h3 className="text-2xl font-sans font-medium text-brand-charcoal mb-3 group-hover:text-brand-moss transition-colors">
                                    {prod.title}
                                </h3>
                                <p className="text-brand-charcoal/70 font-sans leading-relaxed">
                                    {prod.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Products;
