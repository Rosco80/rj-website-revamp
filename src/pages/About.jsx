import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Globe, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Hero Animation
        gsap.fromTo(heroRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );

        // Section animations
        const sections = gsap.utils.toArray('.animate-in');
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, []);

    const team = [
        {
            name: "Andrea Rossi",
            role: "Sales & Customer Relations",
            email: "andrea@rjwoodtrading.com",
            phone: "+6011-1431 0063",
            image: "/andrea.png"
        },
        {
            name: "Firmin Rieu",
            role: "Director",
            email: "firmin@rjwoodtrading.com",
            phone: "+60 11-6972 2994",
            image: "/firmin.png"
        }
    ];

    return (
        <div className="w-full bg-brand-cream pt-32 pb-24 min-h-screen">

            {/* Hero Section */}
            <section ref={heroRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-32 opacity-0">
                <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-6">Our Legacy</p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display italic text-brand-charcoal leading-tight max-w-4xl">
                    A History Rooted in Partnership and Quality
                </h1>
            </section>

            {/* Content Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40 animate-in opacity-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
                    <div className="md:col-span-7 flex flex-col gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display text-brand-charcoal mb-8 border-b border-brand-charcoal/10 pb-4">Company History</h2>
                            <p className="text-xl text-brand-charcoal/80 font-sans leading-relaxed mb-6">
                                At R&J International Trading we believe in a sustainable wood market. That’s why we only work with trustable and certified partners to ensure the protection of the environment and the local workers.
                            </p>
                            <p className="text-lg text-brand-charcoal/70 font-sans leading-relaxed">
                                Our capital company is shared between French and Malaysian shareholders, bringing together a global perspective with deep local expertise in the timber industry.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-display text-brand-charcoal mb-8 border-b border-brand-charcoal/10 pb-4">Our Sister Company</h2>
                            <div className="bg-brand-moss/5 border border-brand-moss/10 p-8 rounded-3xl">
                                <h3 className="text-2xl font-sans font-medium text-brand-moss mb-4">Vitrex Timber Industries Sdn. Bhd.</h3>
                                <p className="text-brand-charcoal/80 leading-relaxed mb-6">
                                    Operating since 1991, Vitrex is a family-owned, Bumiputra company located in Kelantan State, Malaysia. Together, we ensure a sustainable and reliable supply of premium timber products to customers worldwide.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-center text-brand-charcoal/70">
                                        <ShieldCheck className="text-brand-clay" size={24} />
                                        <span>Replanted over 500 hectares in the past 5 years</span>
                                    </div>
                                    <div className="flex gap-4 items-center text-brand-charcoal/70">
                                        <ShieldCheck className="text-brand-clay" size={24} />
                                        <span>Strict diameter thresholds (100cm+) for harvestingth</span>
                                    </div>
                                    <div className="flex gap-4 items-center text-brand-charcoal/70">
                                        <Heart className="text-brand-clay" size={24} />
                                        <span>Working towards full FSC certification</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-5 relative">
                        <div className="sticky top-40 bg-brand-charcoal text-brand-cream p-10 rounded-[3rem] shadow-2xl overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Globe size={180} strokeWidth={0.5} />
                            </div>
                            <h3 className="text-3xl font-display italic mb-6 relative">Global Reach</h3>
                            <p className="text-brand-cream/70 leading-relaxed mb-10 relative">
                                R&J Trading manages the sales and exports of Vitrex Timber Industries high-quality timber products, delivering exceptional service to clients globally.
                            </p>
                            <Link to="/#contact" className="inline-flex items-center gap-2 text-brand-clay font-medium hover:text-white transition-colors">
                                Contact our logistics team
                                <Globe size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-32 animate-in opacity-0">
                <div className="text-center mb-20">
                    <p className="font-mono text-brand-clay tracking-widest uppercase text-xs font-medium mb-4">The Personnel</p>
                    <h2 className="text-4xl md:text-5xl font-display italic text-brand-charcoal">Our Team & Directors</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {team.map((member, i) => (
                        <div key={i} className="group">
                            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-8 shadow-xl bg-white p-8">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-brand-moss/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                            <h3 className="text-3xl font-display text-brand-charcoal mb-2">{member.name}</h3>
                            <p className="text-brand-clay font-sans uppercase tracking-widest text-xs font-bold mb-6">{member.role}</p>
                            <div className="space-y-3">
                                <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-brand-charcoal/60 hover:text-brand-moss transition-colors">
                                    <Mail size={18} />
                                    {member.email}
                                </a>
                                <div className="flex items-center gap-3 text-brand-charcoal/60">
                                    <Phone size={18} />
                                    {member.phone}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default About;
