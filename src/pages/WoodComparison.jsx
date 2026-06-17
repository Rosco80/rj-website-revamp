import React, { useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, ShieldCheck, TreePine, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const woodData = [
    {
        name: "Ipe",
        origin: "South America",
        density: "1050 – 1120 kg/m³",
        janka: "~14,400 N",
        jankaValue: 14400,
        durability: "Exceptional (Class 1)",
        moisture: "Excellent",
        color: "Dark / chocolate brown",
        stability: "Very Good",
        workability: "Difficult (extremely hard)",
        lifespan: "50–75 years",
        uses: "Decking, bridges, cladding",
        highlight: false,
    },
    {
        name: "Merbau",
        origin: "Southeast Asia, Pacific",
        density: "830 – 880 kg/m³",
        janka: "~7,600 N",
        jankaValue: 7600,
        durability: "Very Good (Class 2)",
        moisture: "Very Good",
        color: "Reddish-brown / yellow veins",
        stability: "Good",
        workability: "Moderate",
        lifespan: "30–50 years",
        uses: "Decking, Flooring, Joinery",
        highlight: true,
    },
    {
        name: "Chengal",
        origin: "Malaysia, Indonesia",
        density: "900 – 1050 kg/m³",
        janka: "~12,000 N",
        jankaValue: 12000,
        durability: "Exceptional (Class 1)",
        moisture: "Excellent",
        color: "Dark brown / greenish undertones",
        stability: "Very Good",
        workability: "Difficult",
        lifespan: "50–80 years",
        uses: "Framing, bridges, marine construction",
        highlight: true,
    },
    {
        name: "Myanmar Teak",
        origin: "Myanmar",
        density: "600 – 750 kg/m³",
        janka: "~5,900 N",
        jankaValue: 5900,
        durability: "Excellent (Class 1)",
        moisture: "Excellent (natural oils)",
        color: "Golden brown to medium brown",
        stability: "Excellent",
        workability: "Easy",
        lifespan: "40–60 years",
        uses: "Furniture, boat building, decking",
        highlight: true,
    },
    {
        name: "Thai Teak",
        origin: "Thailand",
        density: "620 – 680 kg/m³",
        janka: "~5,600 N",
        jankaValue: 5600,
        durability: "Excellent (Class 1)",
        moisture: "Excellent (natural oils)",
        color: "Medium golden / light brown",
        stability: "Excellent",
        workability: "Easy",
        lifespan: "40–50 years",
        uses: "Furniture, boat building, decking",
        highlight: true,
    },
    {
        name: "Malaysian Teak",
        origin: "Malaysia",
        density: "550 – 630 kg/m³",
        janka: "~5,200 N",
        jankaValue: 5200,
        durability: "Excellent (Class 1)",
        moisture: "Excellent (natural oils)",
        color: "Pale yellow / Light brown",
        stability: "Excellent",
        workability: "Easy",
        lifespan: "40–50 years",
        uses: "Furniture, boat building, decking",
        highlight: true,
    }
];

const MAX_JANKA = 15000;

const technicalSheets = [
    { name: "IPÊ Technical Sheet (2022)", file: "/Wood/IPÊ 2022.pdf" },
    { name: "MERBAU Technical Sheet (2024)", file: "/Wood/MERBAU 2024.pdf" },
    { name: "CHENGAL Technical Sheet (2024)", file: "/Wood/CHENGAL 2024.pdf" },
    { name: "Myanmar TECK Technical Sheet (2023)", file: "/Wood/Myanmar TECK 2023.pdf" },
];

const WoodComparison = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        const sections = gsap.utils.toArray('.animate-section');
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }, []);

    return (
        <div className="w-full bg-brand-surface text-brand-charcoal pt-32 pb-24 min-h-screen">
            <SEO
                title="Premium Wood Comparison | Ipe Alternatives"
                description="Compare popular South American Ipe with our sustainable, premium Malaysian hardwood alternatives like Merbau, Chengal, and Teak."
                canonical="/wood-comparison"
            />

            {/* Header Section */}
            <section ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 opacity-0">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <p className="font-mono text-brand-moss tracking-widest uppercase text-sm font-medium mb-4">
                            Architectural Hardwoods
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-brand-charcoal mb-6 leading-tight">
                            Smarter Alternatives to Ipe
                        </h1>
                        <p className="max-w-xl mx-auto lg:mx-0 text-lg text-brand-charcoal/70 font-sans leading-relaxed">
                            While South American Ipe is renowned for its strength, our sustainably sourced Malaysian hardwoods offer comparable—and sometimes superior—performance, durability, and beauty for your most demanding architectural projects.
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-brand-clay/10 translate-x-4 translate-y-4 rounded-[2rem] -z-10"></div>
                        <img src="/Wood/IMG-20230510-WA0006.webp" alt="Premium hardwood grain" className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl border border-brand-charcoal/5" loading="lazy" />
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="max-w-[90rem] mx-auto px-4 md:px-8 lg:px-12 mb-24 animate-section opacity-0">
                <div className="bg-brand-cream rounded-[2rem] border border-brand-charcoal/5 shadow-sm overflow-hidden p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-charcoal/10 pb-6 mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-display italic text-brand-charcoal">
                                Technical Comparison Matrix
                            </h2>
                            <p className="text-sm text-brand-charcoal/60 font-sans mt-2">
                                Analyzing density, durability, and lifespan across premium species.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-brand-moss bg-brand-moss/5 px-4 py-2 rounded-lg text-sm border border-brand-moss/10 self-start md:self-auto">
                            <ShieldCheck size={18} />
                            <span className="font-sans font-medium">PEFC & EUDR Compliant Alternatives</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto pb-4">
                        <table className="w-full text-left font-sans text-sm min-w-[1000px]" aria-label="Wood Specification Comparison Table">
                            <thead>
                                <tr className="border-b-2 border-brand-charcoal/10">
                                    <th scope="col" className="py-4 px-4 font-medium text-brand-charcoal/50 uppercase tracking-wider text-xs">Species</th>
                                    <th scope="col" className="py-4 px-4 font-medium text-brand-charcoal/50 uppercase tracking-wider text-xs">Origin</th>
                                    <th scope="col" className="py-4 px-4 font-medium text-brand-charcoal/50 uppercase tracking-wider text-xs">Density</th>
                                    <th scope="col" className="py-4 px-4 font-medium text-brand-charcoal/50 uppercase tracking-wider text-xs">Hardness (Janka)</th>
                                    <th scope="col" className="py-4 px-4 font-medium text-brand-charcoal/50 uppercase tracking-wider text-xs">Durability</th>
                                    <th scope="col" className="py-4 px-4 font-medium text-brand-charcoal/50 uppercase tracking-wider text-xs">Color & Appearance</th>
                                    <th scope="col" className="py-4 px-4 font-medium text-brand-charcoal/50 uppercase tracking-wider text-xs">Lifespan (Outdoor)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {woodData.map((wood, index) => (
                                    <tr 
                                        key={wood.name} 
                                        className={`border-b border-brand-charcoal/5 hover:bg-white/50 transition-colors ${wood.highlight ? 'bg-brand-moss/5' : ''}`}
                                    >
                                        <td className="py-5 px-4 font-medium text-brand-charcoal flex items-center gap-2">
                                            {wood.highlight && <TreePine size={16} className="text-brand-moss" />}
                                            {wood.name}
                                        </td>
                                        <td className="py-5 px-4 text-brand-charcoal/70">{wood.origin}</td>
                                        <td className="py-5 px-4 text-brand-charcoal/70 font-mono text-xs">{wood.density}</td>
                                        <td className="py-5 px-4 text-brand-charcoal/70 font-mono text-xs">
                                            <div className="flex items-center justify-between gap-3 min-w-[120px]">
                                                <span>{wood.janka}</span>
                                                <div className="h-1.5 flex-1 bg-brand-charcoal/10 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${wood.highlight ? 'bg-brand-moss' : 'bg-brand-clay'}`} 
                                                        style={{ width: `${(wood.jankaValue / MAX_JANKA) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-4 text-brand-charcoal/70">{wood.durability}</td>
                                        <td className="py-5 px-4 text-brand-charcoal/70">{wood.color}</td>
                                        <td className="py-5 px-4 text-brand-charcoal/70">{wood.lifespan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-6 text-center animate-section opacity-0">
                <h2 className="text-3xl md:text-4xl font-display italic text-brand-charcoal mb-6">Ready to source sustainable alternatives?</h2>
                <p className="text-lg text-brand-charcoal/60 mb-10 max-w-2xl mx-auto">
                    Contact our timber experts for a detailed consultation on substituting Ipe with our premium Malaysian hardwoods for your specific project requirements.
                </p>
                <Link to="/quote" className="inline-flex items-center gap-3 bg-brand-charcoal text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-brand-moss transition-colors shadow-lg shadow-brand-charcoal/10 focus:outline-none focus:ring-2 focus:ring-brand-moss focus:ring-offset-2">
                    Request a Quote
                    <ArrowRight size={20} />
                </Link>
            </section>
        </div>
    );
};

export default WoodComparison;
