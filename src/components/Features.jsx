import React, { useEffect, useRef } from 'react';
import { Leaf, ShieldCheck, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        id: 1,
        title: "EUDR Compliant Forestry",
        subtitle: "Environmental Integrity",
        icon: Leaf,
        description: "Sourced exclusively from PEFC-certified forests, guaranteeing responsible harvesting, support for reforestation, and active protection of biodiversity. Our sustainable tropical timber is fully prepared for global environmental scrutiny."
    },
    {
        id: 2,
        title: "Verified Timber Traceability",
        subtitle: "Responsible Supply Chain",
        icon: ShieldCheck,
        description: <>Every log is mapped directly to its origin stump. We operate a comprehensive, state-of-the-art <Link to="/compliance" className="text-brand-clay font-medium hover:underline transition-colors">timber traceability system</Link> from forest harvesting to sawmilling and final export delivery.</>
    },
    {
        id: 3,
        title: "Global B2B Compliance",
        subtitle: "Sustainable Partnership",
        icon: TreePine,
        description: "Align with a premier brand delivering fully EUDR compliant timber from Malaysia. We handle complex international custom declarations, PEFC chain of custody, and physical grading reports seamlessly."
    }
];

const Features = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            gsap.fromTo(card,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-brand-surface px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-charcoal shrink-0">
                        Core Values
                    </h2>
                    <p className="text-lg text-brand-charcoal/70 max-w-2xl font-sans mt-2">
                        Our commitment to the environment defines the quality of every piece we deliver.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            ref={el => cardsRef.current[index] = el}
                            className="bg-brand-cream p-8 lg:p-10 rounded-2xl flex flex-col group hover:shadow-xl transition-all duration-500 border border-brand-charcoal/5 hover:border-brand-moss/30"
                        >
                            <div className="mb-8 w-14 h-14 rounded-full bg-brand-moss/10 flex items-center justify-center text-brand-moss group-hover:scale-110 group-hover:bg-brand-moss group-hover:text-brand-cream transition-all duration-300">
                                <feature.icon strokeWidth={1.5} size={28} />
                            </div>
                            <p className="font-mono text-brand-clay text-xs tracking-widest uppercase mb-4">
                                {feature.subtitle}
                            </p>
                            <h3 className="text-2xl font-sans font-medium text-brand-charcoal mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-brand-charcoal/70 font-sans leading-relaxed flex-grow">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
