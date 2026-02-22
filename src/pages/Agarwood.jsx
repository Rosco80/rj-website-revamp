import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplet, Sparkles, Wind, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Agarwood = () => {
    const headerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Hero Animation
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );

        // Section animations
        const sections = gsap.utils.toArray('.animate-section');
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, []);

    return (
        <div className="w-full bg-[#1A1A1A] text-brand-cream pt-32 pb-24 min-h-screen selection:bg-brand-clay selection:text-white">

            {/* Hero Section */}
            <section ref={headerRef} className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-32 relative opacity-0">
                <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-6">
                    Nature's Liquid Gold
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display italic text-brand-cream leading-tight mb-8">
                    Pure Agarwood Oil
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-brand-cream/70 font-sans leading-relaxed">
                    Indulge in the luxurious benefits of Agar oil from our private Malaccensis tree plantations, crafted from the rarest Agarwood with unmatched purity and potency.
                </p>
            </section>

            {/* Rare & Luxurious Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40 animate-section opacity-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden">
                        <img
                            src="/agarwood-oil.jpg"
                            alt="Pouring essential oil"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply"></div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <h2 className="text-4xl md:text-5xl font-display text-white mb-8">Why Agar Oil is a Must-Have</h2>
                        <ul className="space-y-8">
                            <li className="flex gap-6 items-start">
                                <span className="bg-brand-moss/30 p-4 rounded-xl text-brand-moss border border-brand-moss/20">
                                    <Wind strokeWidth={1.5} size={28} />
                                </span>
                                <div>
                                    <h3 className="text-2xl font-sans text-white mb-2">Reduces Stress and Anxiety</h3>
                                    <p className="text-brand-cream/60 leading-relaxed">The deep, woody aroma grounds the mind, helping to alleviate modern day anxieties and bring tranquility to your space.</p>
                                </div>
                            </li>
                            <li className="flex gap-6 items-start">
                                <span className="bg-brand-clay/20 p-4 rounded-xl text-brand-clay border border-brand-clay/20">
                                    <Sparkles strokeWidth={1.5} size={28} />
                                </span>
                                <div>
                                    <h3 className="text-2xl font-sans text-white mb-2">Enhances Skin Health Naturally</h3>
                                    <p className="text-brand-cream/60 leading-relaxed">Rich in potent antioxidants and anti-inflammatory properties, pure agar oil promotes a radiant, youthful complexion.</p>
                                </div>
                            </li>
                            <li className="flex gap-6 items-start">
                                <span className="bg-white/5 p-4 rounded-xl text-white/80 border border-white/10">
                                    <Droplet strokeWidth={1.5} size={28} />
                                </span>
                                <div>
                                    <h3 className="text-2xl font-sans text-white mb-2">Rich, Calming Aroma</h3>
                                    <p className="text-brand-cream/60 leading-relaxed">A transformative olfactory masterpiece with earthy base notes, mysterious middle depths, and unexpected elegant highs.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* The Source Section */}
            <section className="bg-brand-moss/20 border-y border-brand-moss/30 py-32 px-6 md:px-12 lg:px-24 mb-32 animate-section opacity-0">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-8">The Ancient Art of Processing</h2>
                    <p className="text-lg text-brand-cream/80 font-sans leading-relaxed mb-6">
                        For thousands of years, this mysterious essence has captivated civilizations with its complex fragrance. From the tranquil temples of Japan to the bustling souks of the Middle East, agarwood transcends ordinary essential oils.
                    </p>
                    <p className="text-lg text-brand-cream/80 font-sans leading-relaxed mb-12">
                        At R&J Woods, we source directly from our own carefully managed <span className="text-brand-clay font-medium italic">Malaccensis</span> tree plantations. We honor the traditional extraction processes, preserving the therapeutic integrity and producing true "liquid gold."
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-6 text-center animate-section opacity-0">
                <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">Elevate Your Senses</h2>
                <p className="text-xl text-brand-cream/60 mb-12 max-w-2xl mx-auto">
                    Transform your daily rituals into extraordinary experiences. If you’re looking for premium Agarwood Essential Oils, get in touch with our team today.
                </p>
                <Link to="/#contact" className="inline-flex items-center gap-3 bg-brand-clay text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#a64526] transition-colors shadow-lg shadow-brand-clay/20">
                    Request a Quote
                    <ArrowRight size={20} />
                </Link>
            </section>

        </div>
    );
};

export default Agarwood;
