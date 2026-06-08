import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn, ArrowRight, ShieldCheck, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const timberProducts = [
    {
        title: "Heavy Hardwood",
        category: "Structural Timber",
        image: "/products/Heavy_hard_wood.png",
        description: "Extremely durable, high-density timber designed for heavy structural use and critical load-bearing applications.",
        keywords: "Wholesale Balau timber, Merbau wood export"
    },
    {
        title: "Medium Hardwood",
        category: "Versatile Timber",
        image: "/products/medium_hardwood_lumber.png",
        description: "Balanced strength and workability, ideal for general construction, heavy duty furniture, and decking.",
        keywords: "Sustainably sourced Keruing, Malaysian timber supplier"
    },
    {
        title: "Light Hardwood",
        category: "Interior & Joinery",
        image: "/products/Light_hardwood_P1.png",
        description: "Premium light hardwoods perfect for fine interior joinery, light structural work, and elegant paneling.",
        keywords: "Red Meranti supplier, light tropical hardwood"
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

const furnitureProducts = [
    {
        title: "Solid Wood Live Edge Tabletop",
        category: "Premium Furniture",
        image: "/authority/premium-live-edge-hardwood-tabletop.jpeg",
        description: "A breathtaking, hand-finished solid wood live edge table showcasing the natural grain and immense scale of our premium hardwoods."
    },
    {
        title: "Live Edge Workshop Commission",
        category: "Bespoke Furniture",
        image: "/authority/live-edge-solid-wood-table-workshop.jpeg",
        description: "Custom live edge pieces crafted to exact specifications, highlighting the raw, sculptural beauty of sustainable timber."
    },
    {
        title: "Traditional Canopy Bed",
        category: "Bespoke Furniture",
        image: "/products/furniture_lifestyle_2.png",
        description: "A masterfully crafted wooden bed frame featuring intricate traditional detailing and robust timber construction."
    },
    {
        title: "Executive Wooden Desk",
        category: "Office Furniture",
        image: "/products/furniture_lifestyle_3.png",
        description: "A substantial, finely polished solid wood desk that commands attention, perfect for a sophisticated home office."
    }
];

const flooringProducts = [
    {
        title: "Balau Parquet Flooring",
        category: "Interior Flooring",
        image: "/products/flooring_lifestyle_1.png",
        description: "Warm, inviting, and incredibly durable. Our Balau flooring brings nature's resilience indoors.",
        keywords: "Balau timber flooring, sustainable parquet"
    },
    {
        title: "Merbau Wide Plank Flooring",
        category: "Interior Flooring",
        image: "/products/flooring_lifestyle_2.png",
        description: "Rich, dark tones with stunning grain patterns that elevate any contemporary or classic room.",
        keywords: "Merbau flooring planks, dark tropical hardwood"
    },
    {
        title: "Teak Herringbone Pattern",
        category: "Premium Flooring",
        image: "/products/flooring_lifestyle_3.png",
        description: "Timeless elegance meets modern installation. Sustainably sourced Teak in a classic herringbone layout.",
        keywords: "Bespoke Teak flooring, high-end wood flooring"
    }
];

const Products = () => {
    const headerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef(null);
    const modalImageRef = useRef(null);

    // References for scrolling
    const timberSectionRef = useRef(null);
    const flooringSectionRef = useRef(null);
    const furnitureSectionRef = useRef(null);

    useEffect(() => {
        // Header Animation
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // ScrollTrigger animations for sections
        const sections = [timberSectionRef.current, flooringSectionRef.current, furnitureSectionRef.current];
        sections.forEach((sec) => {
            if (sec) {
                gsap.fromTo(sec.querySelectorAll('.product-card'),
                    { opacity: 0, y: 45 },
                    {
                        scrollTrigger: {
                            trigger: sec,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out"
                    }
                );
            }
        });
    }, []);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Modal scroll lock
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    const closeModal = () => {
        setSelectedImage(null);
    };

    // Gather all schemas for full SEO coverage
    const productSchemas = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Sustainably Sourced Malaysian Hardwoods & Timber Products",
            "description": "Premium Malaysian hardwoods (Balau, Merbau, Teak) certified sustainable, PEFC-adherent and EUDR-compliant.",
            "url": "https://rjwoodtrading.com/products"
        },
        ...timberProducts.map((p, idx) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": p.title,
            "image": `https://rjwoodtrading.com${p.image}`,
            "description": p.description,
            "category": "Timber > " + p.category,
            "brand": {
                "@type": "Brand",
                "name": "R&J Wood Trading"
            },
            "additionalProperty": [
                {
                    "@type": "PropertyValue",
                    "name": "Sourcing Certification",
                    "value": "PEFC Certified (Chain of Custody)"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Regulatory Compliance",
                    "value": "EUDR Compliant (Deforestation-Free)"
                }
            ],
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "priceRange": "$$$"
            }
        }))
    ];

    return (
        <div className="w-full bg-brand-surface pt-32 pb-24 min-h-screen">
            <SEO
                title="Sustainably Sourced Malaysian Hardwoods & Timber Products"
                description="Explore R&J Wood Trading's complete range of premium Balau, Merbau, and Teak hardwoods. Fully EUDR compliant, PEFC certified wholesale timber supplier."
                canonical="/products"
                schemas={productSchemas}
            />

            {/* Modal Overlay */}
            {selectedImage && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 cursor-zoom-out p-4 md:p-12"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 text-white hover:text-brand-clay transition-colors z-[110] bg-black/20 p-2 rounded-full backdrop-blur-md"
                        aria-label="Close modal"
                    >
                        <X size={32} />
                    </button>
                    <div className="relative max-w-7xl w-full flex items-center justify-center">
                        <img
                            ref={modalImageRef}
                            src={selectedImage}
                            alt="Product full view"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl bg-white p-4"
                        />
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Header Section */}
                <div ref={headerRef} className="text-center mb-16">
                    <p className="font-mono text-brand-moss tracking-widest uppercase text-sm font-medium mb-4">
                        Sustainable Hardwood Catalog
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display italic text-brand-charcoal mb-8">
                        Premium Quality,<br className="hidden md:block" /> Sustained.
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-brand-charcoal/70 font-sans leading-relaxed">
                        From robust heavy hardwoods for structural engineering to precision-finished flooring and custom statement furniture, our timber is strictly PEFC certified and compliant with global EUDR guidelines.
                    </p>
                </div>

                {/* Sticky Sub-Navigation */}
                <div className="sticky top-24 z-40 flex justify-center mb-20">
                    <div className="inline-flex bg-white/85 backdrop-blur-md rounded-full p-1.5 shadow-md border border-brand-charcoal/5">
                        <button
                            onClick={() => scrollToSection(timberSectionRef)}
                            className="px-6 py-2.5 rounded-full font-sans font-medium text-xs md:text-sm text-brand-charcoal/80 hover:text-brand-moss transition-colors"
                        >
                            Sustainably Sourced Timber
                        </button>
                        <button
                            onClick={() => scrollToSection(flooringSectionRef)}
                            className="px-6 py-2.5 rounded-full font-sans font-medium text-xs md:text-sm text-brand-charcoal/80 hover:text-brand-moss transition-colors"
                        >
                            Architectural Flooring
                        </button>
                        <button
                            onClick={() => scrollToSection(furnitureSectionRef)}
                            className="px-6 py-2.5 rounded-full font-sans font-medium text-xs md:text-sm text-brand-charcoal/80 hover:text-brand-moss transition-colors"
                        >
                            Bespoke Furniture
                        </button>
                    </div>
                </div>

                {/* SECTION 1: TIMBER */}
                <div ref={timberSectionRef} className="mb-24 scroll-mt-36">
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-charcoal/10 pb-6 mb-12">
                        <div>
                            <span className="font-mono text-brand-clay text-xs uppercase tracking-widest">Premium Hardwoods</span>
                            <h2 className="text-3xl md:text-4xl font-display italic text-brand-charcoal mt-1">
                                Sustainably Sourced Malaysian Timber
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0 text-brand-moss bg-brand-moss/5 px-4 py-2 rounded-lg text-sm border border-brand-moss/10">
                            <ShieldCheck size={18} />
                            <span className="font-sans font-medium">PEFC Certified & EUDR Compliant</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {timberProducts.map((prod, index) => (
                            <div
                                key={`timber-${index}`}
                                className="product-card group flex flex-col bg-brand-cream rounded-3xl overflow-hidden border border-brand-charcoal/5 hover:border-brand-moss/20 hover:shadow-xl transition-all duration-500"
                            >
                                <div
                                    className="relative aspect-[4/3] overflow-hidden bg-white cursor-zoom-in"
                                    onClick={() => setSelectedImage(prod.image)}
                                >
                                    <img
                                        src={prod.image}
                                        alt={`${prod.title} — sustainable Malaysian timber`}
                                        title={`${prod.title} supplied by R&J Wood Trading`}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/5 transition-colors duration-500"></div>
                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <ZoomIn size={20} />
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <p className="font-mono text-brand-clay text-xs tracking-widest uppercase mb-2">
                                        {prod.category}
                                    </p>
                                    <h3 className="text-2xl font-sans font-medium text-brand-charcoal mb-4 group-hover:text-brand-moss transition-colors">
                                        {prod.title}
                                    </h3>
                                    <p className="text-brand-charcoal/70 font-sans leading-relaxed text-sm mb-6 flex-grow">
                                        {prod.description}
                                    </p>
                                    {prod.keywords && (
                                        <span className="text-[11px] font-mono text-brand-moss/80 mb-4 block">
                                            {prod.keywords}
                                        </span>
                                    )}
                                    <Link to="/about" className="inline-flex items-center gap-2 text-brand-moss font-medium text-sm hover:text-brand-clay transition-colors mt-auto group/link">
                                        Learn about grading
                                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 2: FLOORING */}
                <div ref={flooringSectionRef} className="mb-24 scroll-mt-36">
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-charcoal/10 pb-6 mb-12">
                        <div>
                            <span className="font-mono text-brand-clay text-xs uppercase tracking-widest">Architectural Interiors</span>
                            <h2 className="text-3xl md:text-4xl font-display italic text-brand-charcoal mt-1">
                                Premium Architectural Hardwood Flooring
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0 text-brand-moss bg-brand-moss/5 px-4 py-2 rounded-lg text-sm border border-brand-moss/10">
                            <TreePine size={18} />
                            <span className="font-sans font-medium">Balau, Merbau, & Teak Profiles</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {flooringProducts.map((prod, index) => (
                            <div
                                key={`flooring-${index}`}
                                className="product-card group flex flex-col bg-brand-cream rounded-3xl overflow-hidden border border-brand-charcoal/5 hover:border-brand-moss/20 hover:shadow-xl transition-all duration-500"
                            >
                                <div
                                    className="relative aspect-[4/3] overflow-hidden bg-white cursor-zoom-in"
                                    onClick={() => setSelectedImage(prod.image)}
                                >
                                    <img
                                        src={prod.image}
                                        alt={`${prod.title} — wholesale wood flooring`}
                                        title={`${prod.title} - premium B2B range`}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/5 transition-colors duration-500"></div>
                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <ZoomIn size={20} />
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <p className="font-mono text-brand-clay text-xs tracking-widest uppercase mb-2">
                                        {prod.category}
                                    </p>
                                    <h3 className="text-2xl font-sans font-medium text-brand-charcoal mb-4 group-hover:text-brand-moss transition-colors">
                                        {prod.title}
                                    </h3>
                                    <p className="text-brand-charcoal/70 font-sans leading-relaxed text-sm mb-6 flex-grow">
                                        {prod.description}
                                    </p>
                                    {prod.keywords && (
                                        <span className="text-[11px] font-mono text-brand-moss/80 mb-4 block">
                                            {prod.keywords}
                                        </span>
                                    )}
                                    <Link to="/quote" className="inline-flex items-center gap-2 text-brand-clay font-medium text-sm hover:text-[#a64526] transition-colors mt-auto group/link">
                                        Request flooring specs
                                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 3: FURNITURE */}
                <div ref={furnitureSectionRef} className="mb-24 scroll-mt-36">
                    <div className="border-b border-brand-charcoal/10 pb-6 mb-12">
                        <span className="font-mono text-brand-clay text-xs uppercase tracking-widest">Heritage Handcraft</span>
                        <h2 className="text-3xl md:text-4xl font-display italic text-brand-charcoal mt-1">
                            Bespoke Solid Wood Timber Furniture
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {furnitureProducts.map((prod, index) => (
                            <div
                                key={`furniture-${index}`}
                                className="product-card group flex flex-col bg-brand-cream rounded-3xl overflow-hidden border border-brand-charcoal/5 hover:border-brand-moss/20 hover:shadow-xl transition-all duration-500"
                            >
                                <div
                                    className="relative aspect-[4/3] overflow-hidden bg-white cursor-zoom-in"
                                    onClick={() => setSelectedImage(prod.image)}
                                >
                                    <img
                                        src={prod.image}
                                        alt={`${prod.title} — solid wood custom furniture`}
                                        title={`${prod.title} artisan wood piece`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/5 transition-colors duration-500"></div>
                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <ZoomIn size={20} />
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <p className="font-mono text-brand-clay text-xs tracking-widest uppercase mb-2">
                                        {prod.category}
                                    </p>
                                    <h3 className="text-2xl font-sans font-medium text-brand-charcoal mb-4 group-hover:text-brand-moss transition-colors">
                                        {prod.title}
                                    </h3>
                                    <p className="text-brand-charcoal/70 font-sans leading-relaxed text-sm mb-6 flex-grow">
                                        {prod.description}
                                    </p>
                                    <Link to="/quote" className="inline-flex items-center gap-2 text-brand-clay font-medium text-sm hover:text-[#a64526] transition-colors mt-auto group/link">
                                        Inquire about commissions
                                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 text-center">
                    <p className="text-brand-charcoal/60 font-sans mb-6">
                        Need detailed engineering reports, custom dimensions, or EUDR declarations?
                    </p>
                    <Link
                        to="/quote"
                        className="inline-flex items-center gap-3 bg-brand-charcoal text-brand-cream px-8 py-4 rounded-full font-sans font-medium hover:bg-brand-moss transition-colors"
                    >
                        Inquire About Custom Orders
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Products;
