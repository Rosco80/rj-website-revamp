import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const timberProducts = [
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

const furnitureProducts = [
    {
        title: "Modern Minimalist Bench",
        category: "Premium Furniture",
        image: "/products/furniture_lifestyle_1.png",
        description: "Sustainably crafted from high-grade Merbau, offering clean lines and robust durability for modern living spaces."
    },
    {
        title: "Artisan Wood Coffee Table",
        category: "Bespoke Furniture",
        image: "/products/furniture_lifestyle_2.png",
        description: "A beautifully polished centerpiece showcasing the natural grain and rich tones of Malaysian hardwood."
    },
    {
        title: "Elegant Dining Set",
        category: "Dining Furniture",
        image: "/products/furniture_lifestyle_3.png",
        description: "Luxurious, solid wood dining pieces crafted with precision, designed to be heirlooms."
    }
];

const flooringProducts = [
    {
        title: "Balau Parquet Flooring",
        category: "Interior Flooring",
        image: "/products/flooring_lifestyle_1.png",
        description: "Warm, inviting, and incredibly durable. Our Balau flooring brings nature's resilience indoors."
    },
    {
        title: "Merbau Wide Plank Flooring",
        category: "Interior Flooring",
        image: "/products/flooring_lifestyle_2.png",
        description: "Rich, dark tones with stunning grain patterns that elevate any contemporary or classic room."
    },
    {
        title: "Teak Herringbone Pattern",
        category: "Premium Flooring",
        image: "/products/flooring_lifestyle_3.png",
        description: "Timeless elegance meets modern installation. Sustainably sourced Teak in a classic herringbone layout."
    }
];

const Products = () => {
    const headerRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Timber');
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef(null);
    const modalImageRef = useRef(null);

    const activeProducts = activeTab === 'Timber' ? timberProducts : activeTab === 'Furniture' ? furnitureProducts : flooringProducts;

    useEffect(() => {
        // Header Animation
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    // Animate grid items when tab changes
    useEffect(() => {
        gsap.fromTo('.product-card',
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all"
            }
        );
        ScrollTrigger.refresh();
    }, [activeTab]);

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
            <SEO
                title="Our Products & Portfolio"
                description="Explore R&J Wood Trading's complete range of sustainable Malaysian timber, premium furniture, and bespoke flooring solutions."
                canonical="/products"
                schemas={[
                    {
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Timber Products & Portfolio — R&J Wood Trading",
                        "description": "Complete range of sustainably sourced Malaysian hardwoods, bespoke furniture, and flooring solutions.",
                        "url": "https://rjwoodtrading.com/products"
                    }
                ]}
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
                            alt={`${activeProducts.find(p => p.image === selectedImage)?.title || 'Product'} — full size product image`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl bg-white p-4"
                        />
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Header Section */}
                <div ref={headerRef} className="text-center mb-16">
                    <p className="font-mono text-brand-moss tracking-widest uppercase text-sm font-medium mb-4">
                        Our Portfolio
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display italic text-brand-charcoal mb-8">
                        Premium Quality,<br className="hidden md:block" /> Sustained.
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-brand-charcoal/70 font-sans leading-relaxed">
                        From robust heavy hardwoods for construction to beautifully crafted furniture and elegant flooring, our timber is meticulously graded and sourced from managed Malaysian reserves.
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-brand-charcoal/5">
                        {['Timber', 'Furniture', 'Flooring'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full font-sans font-medium text-sm transition-all duration-300 ${
                                    activeTab === tab
                                        ? 'bg-brand-moss text-white shadow-md'
                                        : 'text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-moss/5'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {activeProducts.map((prod, index) => (
                        <div
                            key={`${activeTab}-${index}`}
                            className="product-card group flex flex-col bg-brand-cream rounded-3xl overflow-hidden border border-brand-charcoal/5 hover:border-brand-moss/20 hover:shadow-xl transition-all duration-500"
                        >
                            {/* Image Container with Zoom hint */}
                            <div
                                className="relative aspect-[4/3] overflow-hidden bg-white cursor-zoom-in"
                                onClick={() => setSelectedImage(prod.image)}
                            >
                                <img
                                    src={prod.image}
                                    alt={`${prod.title} — sustainable Malaysian timber product`}
                                    title={`${prod.title} from R&J Wood Trading`}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover/img:scale-105"
                                    loading="lazy"
                                />
                                {/* Darken overlay on hover */}
                                <div className="absolute inset-0 bg-brand-charcoal/0 group-hover/img:bg-brand-charcoal/5 transition-colors duration-500"></div>
                                {/* Zoom Icon */}
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <ZoomIn size={20} />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-mono text-brand-clay text-xs tracking-widest uppercase mb-2">
                                            {prod.category}
                                        </p>
                                        <h3 className="text-2xl font-sans font-medium text-brand-charcoal group-hover:text-brand-moss transition-colors">
                                            {prod.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-brand-charcoal/70 font-sans leading-relaxed text-sm mb-6 flex-grow">
                                    {prod.description}
                                </p>
                                
                                {activeTab === 'Timber' ? (
                                    <Link to="/about" className="inline-flex items-center gap-2 text-brand-moss font-medium text-sm hover:text-brand-clay transition-colors mt-auto group/link">
                                        Learn about grading
                                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <Link to="/quote" className="inline-flex items-center gap-2 text-brand-clay font-medium text-sm hover:text-[#a64526] transition-colors mt-auto group/link">
                                        Request a bespoke quote
                                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 text-center">
                    <p className="text-brand-charcoal/60 font-sans mb-6">
                        Need detailed specifications or PEFC certification documents?
                    </p>
                    <Link
                        to="/quote"
                        className="inline-flex items-center gap-3 bg-brand-charcoal text-brand-cream px-8 py-4 rounded-full font-sans font-medium hover:bg-brand-moss transition-colors"
                    >
                        Contact Sales Team
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Products;
