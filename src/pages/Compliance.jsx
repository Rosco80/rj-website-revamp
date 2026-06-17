import React, { useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Map, Truck, TreePine, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
    {
        icon: <TreePine size={32} className="text-brand-moss" />,
        title: "Sustainable Harvesting",
        description: "Our timber begins its journey in sustainably managed Malaysian forests and our Kelantan plantations (Vitrex Timber Industries). We strictly adhere to selective harvesting practices to regenerate forest ecosystems.",
        keyword: "PEFC certified hardwood supplier",
        image: "/REPLANTING/IMG-20260617-WA0033.jpg"
    },
    {
        icon: <Map size={32} className="text-brand-moss" />,
        title: "Geolocated Traceability",
        description: "Every log is tagged and recorded at the stump. We map exact GPS coordinates to ensure absolute proof of origin, satisfying the strictest global import regulations.",
        keyword: "Timber traceability system",
        image: "/REPLANTING/IMG-20260617-WA0040.jpg"
    },
    {
        icon: <ShieldCheck size={32} className="text-brand-moss" />,
        title: "EUDR & Legal Compliance",
        description: "Before milling, the timber undergoes rigorous verification. We provide full documentation proving deforestation-free origins, ensuring seamless clearance at destination ports.",
        keyword: "EUDR compliant timber Malaysia"
    },
    {
        icon: <Truck size={32} className="text-brand-moss" />,
        title: "Global Delivery",
        description: "From our sawmills to your site, the chain of custody remains unbroken. We export premium Balau, Merbau, Keruing, and Teak globally with absolute transparency."
    }
];

const Compliance = () => {
    const headerRef = useRef(null);
    const timelineRef = useRef(null);
    const stepRefs = useRef([]);

    useEffect(() => {
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );

        stepRefs.current.forEach((step, index) => {
            gsap.fromTo(step,
                { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
                {
                    scrollTrigger: {
                        trigger: step,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power2.out"
                }
            );
        });
    }, []);

    return (
        <div className="w-full bg-brand-surface pt-32 pb-24 min-h-screen font-sans">
            <SEO
                title="EUDR Compliance & Traceability"
                description="R&J Wood Trading guarantees full traceability for EUDR compliant timber from Malaysia. PEFC certified hardwood supplier with a verified forest-to-delivery system."
                canonical="/compliance"
                schemas={[
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "EUDR Compliance & Timber Traceability",
                        "description": "Information on R&J Wood Trading's strict adherence to EUDR and PEFC compliance for Malaysian hardwood exports."
                    }
                ]}
            />

            <div className="max-w-5xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20">
                    <p className="font-mono text-brand-moss tracking-widest uppercase text-sm font-medium mb-4">
                        Absolute Transparency
                    </p>
                    <h1 className="text-4xl md:text-6xl font-display italic text-brand-charcoal mb-6">
                        Verified Sustainability & <br className="hidden md:block"/> Legal Compliance
                    </h1>
                    <p className="text-lg text-brand-charcoal/80 max-w-3xl mx-auto leading-relaxed">
                        For modern B2B buyers, sustainability is not just a promise—it is a legal requirement. We operate a rigorous <strong>timber traceability system</strong> to ensure every piece of hardwood we export is fully EUDR and PEFC compliant.
                    </p>
                </div>

                {/* Interactive Timeline */}
                <div ref={timelineRef} className="relative py-12">
                    {/* Center Line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-moss/20 -translate-x-1/2"></div>
                    
                    <div className="flex flex-col gap-16 md:gap-24 relative z-10">
                        {timelineSteps.map((step, index) => (
                            <div 
                                key={index} 
                                ref={el => stepRefs.current[index] = el}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Side */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-brand-charcoal/5 hover:border-brand-moss/30 transition-colors duration-500`}>
                                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                        {index % 2 === 1 && <div className="p-3 bg-brand-cream rounded-full border border-brand-moss/20">{step.icon}</div>}
                                        <h3 className="text-2xl font-display text-brand-charcoal">{step.title}</h3>
                                        {index % 2 === 0 && <div className="p-3 bg-brand-cream rounded-full border border-brand-moss/20">{step.icon}</div>}
                                    </div>
                                    <p className="text-brand-charcoal/70 leading-relaxed mb-4">
                                        {step.description}
                                    </p>
                                    {step.keyword && (
                                        <p className="inline-block px-3 py-1 bg-brand-moss/5 text-brand-moss text-xs font-mono font-medium rounded-md uppercase tracking-wide">
                                            {step.keyword}
                                        </p>
                                    )}
                                </div>

                                {/* Node Side (Visual Spacer for Timeline) */}
                                <div className="hidden md:flex flex-1 justify-center relative items-center">
                                    <div className="w-4 h-4 rounded-full bg-brand-moss absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-[0_0_15px_rgba(30,63,32,0.3)] z-20"></div>
                                    {step.image && (
                                        <div className={`w-[70%] max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-brand-charcoal/5 ${index % 2 === 0 ? 'ml-auto mr-12' : 'mr-auto ml-12'}`}>
                                            <img src={step.image} alt={step.title} className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105" loading="lazy" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compliance Documents CTA */}
                <div className="mt-24 text-center bg-brand-charcoal text-brand-cream rounded-3xl p-12 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-5 bg-[url('/wood-grain-pattern.png')] bg-cover mix-blend-overlay transition-opacity duration-700 group-hover:opacity-10"></div>
                    <div className="relative z-10">
                        <FileText size={48} className="mx-auto mb-6 text-brand-cream/80" />
                        <h2 className="text-3xl font-display italic mb-4">Need Official Documentation?</h2>
                        <p className="text-brand-cream/70 max-w-xl mx-auto mb-8 font-sans">
                            Our team can provide detailed PEFC certification, EUDR compliance reports, and geolocated harvesting data for your specific order.
                        </p>
                        <Link 
                            to="/quote" 
                            className="inline-flex items-center bg-brand-cream text-brand-charcoal px-8 py-4 rounded-full font-sans font-medium hover:bg-brand-moss hover:text-white transition-colors duration-300"
                        >
                            Request Documentation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compliance;
