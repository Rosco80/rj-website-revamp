import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Globe, ShieldCheck, TreePine, Warehouse, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

// Competitor Intelligence: Focus heavily on 'Forest to Final Delivery' supply chain traceability and strict GEO targeting
const regionData = {
    europe: {
        name: 'Europe',
        seoTitle: 'Sustainable Wood Export to Europe | PEFC Certified',
        seoDescription: 'Direct export of PEFC certified Malaysian hardwood. Meeting Europe\'s strictly regulated carbon and forestry standards with Merbau and Teak.',
        keywords: ['PEFC Certified Export', 'European Timber Supplier', 'EUDR Compliant Timber', 'Sustainable Malaysian Hardwood', 'FSC Pursuit Export'],
        heroTagline: 'Compliance, Traceability, and Environmental Excellence.',
        heroImage: '/hero-vitrex.jpg', 
        description: 'For the highly regulated European market, transparency is non-negotiable. R&J Wood Trading bypasses brokers to provide direct, verifiable shipments of premium Merbau and Teak that align perfectly with stringent EU forestry directives and carbon compliance metrics.',
        marketFocus: 'High-end architectural finishing, luxury marine decking, and EUDR-compliant structural integration.',
        sellingPoints: [
            { title: 'Strict PEFC Standards', desc: 'Every shipment adheres to PEFC guidelines, insulating EU buyers from compliance risks.', icon: ShieldCheck },
            { title: 'Premium Aesthetic Demand', desc: 'Focused primarily on luxury aesthetic woods (Merbau, Teak) for European high-end residential and marine sectors.', icon: TreePine }
        ]
    },
    'middle-east': {
        name: 'Middle East',
        seoTitle: 'Malaysian Heavy Hardwood Exporter | Middle East Projects',
        seoDescription: 'Bulk timber exporter for Middle Eastern infrastructure. Reliable supply of Keruing, Balau, and Teak for massive-scale developments.',
        keywords: ['Middle East Timber Export', 'UAE Hardwood Supplier', 'Saudi Infrastructure Wood', 'Bulk Keruing Export', 'Durable Coastal Timber'],
        heroTagline: 'Bulk Reliability for Massive Scale Development.',
        heroImage: '/hero-home.jpg', 
        description: 'The Middle East demands structural resilience and bulk reliability. We supply high-density Keruing and Balau optimized for immense heat and structural load, alongside luxury Teak for the booming high-end real estate sectors in the UAE and Saudi Arabia.',
        marketFocus: 'Large-scale infrastructure, coastal development resilience, and ultra-luxury project finishing.',
        sellingPoints: [
            { title: 'Extreme Climate Durability', desc: 'High-density timber specifically graded to withstand intense heat, arid conditions, and coastal salinity.', icon: Warehouse },
            { title: 'Bulk Supply Chain', desc: 'Direct from our sister company\'s 500+ hectare reserves, ensuring unbroken supply chains for massive multi-year projects.', icon: Globe }
        ]
    }
};

const ExportRegion = () => {
    const { region } = useParams();
    const regionInfo = regionData[region.toLowerCase()];

    useEffect(() => {
        if (regionInfo) {
            gsap.fromTo('.geo-hero',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );
        }
    }, [region, regionInfo]);

    if (!regionInfo) {
        return <Navigate to="/" replace />;
    }

    const { name, seoTitle, seoDescription, keywords, heroTagline, heroImage, description, marketFocus, sellingPoints } = regionInfo;

    return (
        <div className="w-full bg-brand-surface pt-32 pb-24 min-h-screen">
            <SEO
                title={seoTitle}
                description={seoDescription}
                canonical={`/export/${region}`}
                schemas={[
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": seoTitle,
                        "description": description,
                        "keywords": keywords.join(', '),
                        "audience": {
                            "@type": "Audience",
                            "audienceType": `B2B Timber Importers in ${name}`
                        }
                    }
                ]}
            />

            {/* GEO Hero */}
            <section className="geo-hero max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-6 flex items-center gap-2">
                            <Globe size={18} />
                            Strategic Export Hub
                        </p>
                        <h1 className="text-5xl md:text-7xl font-display italic text-brand-charcoal mb-4">
                            Logistics to {name}
                        </h1>
                        <p className="font-mono text-brand-moss tracking-widest text-sm uppercase font-medium mb-8">
                            {heroTagline}
                        </p>
                        <p className="text-xl text-brand-charcoal/80 font-sans leading-relaxed mb-6">
                            {description}
                        </p>
                        <div className="bg-brand-cream/50 p-6 border-l-4 border-brand-clay mt-8">
                            <strong className="text-brand-charcoal block mb-2 font-display text-xl">Market Focus:</strong>
                            <span className="text-brand-charcoal/80 leading-relaxed font-sans">{marketFocus}</span>
                        </div>
                    </div>
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative">
                            <img src={heroImage} alt={`Timber export to ${name}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent flex items-end p-8">
                                <p className="text-brand-cream font-mono text-sm tracking-widest uppercase mb-2">Direct Logistics Port</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Targeted Sales Approach */}
            <section className="bg-brand-cream py-24 px-6 md:px-12 lg:px-24 mb-24 border-y border-brand-charcoal/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display mb-12 text-center text-brand-charcoal border-b border-brand-charcoal/10 pb-6">
                        Why Partner with R&J for {name}?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {sellingPoints.map((point, i) => (
                            <div key={i} className="flex gap-6 bg-white p-8 rounded-2xl shadow-sm border border-brand-charcoal/5 group">
                                <div className="text-brand-moss shrink-0 group-hover:scale-110 transition-transform">
                                    <point.icon size={36} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-sans font-medium text-brand-charcoal mb-3">{point.title}</h3>
                                    <p className="text-brand-charcoal/70 leading-relaxed font-sans">{point.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Procurement CTA */}
            <section className="max-w-4xl mx-auto px-6 text-center">
                <div className="bg-brand-charcoal rounded-3xl p-12 text-brand-cream">
                    <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-4">
                        Secure Global Logistics
                    </p>
                    <h2 className="text-3xl font-display italic mb-6">
                        Contact our {name} Export Team
                    </h2>
                    <p className="text-brand-cream/70 mb-8 max-w-xl mx-auto">
                        Our logistics division operates directly out of Malaysia, providing streamlined freight forwarding, strict customs compliance, and dedicated client tracking.
                    </p>
                    <Link
                        to="/quote"
                        className="inline-flex items-center gap-3 bg-brand-clay text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#a64526] transition-colors"
                    >
                        Request Regional Quote
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ExportRegion;
