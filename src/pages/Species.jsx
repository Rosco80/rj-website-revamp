import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Ruler, Anchor, Leaf, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

// Competitor Intelligence: Focus heavily on 'Forest to Final Delivery' supply chain traceability
const speciesData = {
    balau: {
        name: 'Balau',
        seoTitle: 'Buy PEFC Certified Balau Decking Wholesale',
        seoDescription: 'Direct from traceable Malaysian reserves. Export-grade Balau timber, ideal for heavy structural applications, coastal climates, and high-durability decking.',
        keywords: ['PEFC Certified Balau', 'Wholesale Balau Decking', 'Coastal Climate Timber', 'Malaysian Hardwood Export', 'Forest to Delivery Traceability'],
        heroTagline: 'Engineered by Nature for Extreme Durability.',
        heroImage: '/hero-home.jpg', // Using existing assets as placeholders
        description: 'Balau is an extremely dense, high-durability heavy hardwood. Its natural resistance to fungal decay and insect attacks makes it the undisputed choice for structural grading, extreme coastal climates, and high-traffic decking.',
        techSpecs: [
            { label: 'Classification', value: 'Heavy Hardwood' },
            { label: 'Air-Dry Density', value: '850 - 1105 kg/m³' },
            { label: 'MGR Grading', value: 'Select & Better / Standard' },
            { label: 'Moisture Content', value: 'Kiln Dried (KD) to <20%' }
        ],
        sellingPoints: [
            { title: 'Coastal Resilience', desc: 'Impervious to severe weathering, making it the premier choice for marine and coastal exposed architecture.', icon: Anchor },
            { title: 'Traceable Origin', desc: 'Forest to final delivery tracking. Replanted reserves meeting strict PEFC protocols.', icon: Leaf }
        ]
    },
    merbau: {
        name: 'Merbau',
        seoTitle: 'Malaysian Merbau Flooring Export Supplier',
        seoDescription: 'Procure premium Merbau flooring and luxury joinery timber. Sustainably sourced from Vitrex managed reserves with exact MGR parameters.',
        keywords: ['Merbau Flooring Export', 'Luxury Timber Supply', 'Malaysian Merbau', 'Sustainable Hardwood', 'High-end Architectural Finish'],
        heroTagline: 'The Standard for Luxury Architectural Finish.',
        heroImage: '/products/flooring.png', 
        description: 'Merbau stands as the pinnacle for luxury interiors. With a rich reddish-brown hue and excellent dimensional stability, it is highly sought after by premium B2B architects for custom flooring, high-end joinery, and exquisite furniture.',
        techSpecs: [
            { label: 'Classification', value: 'Heavy Hardwood (Premium)' },
            { label: 'Air-Dry Density', value: '510 - 1040 kg/m³' },
            { label: 'MGR Grading', value: 'Select & Better' },
            { label: 'Janka Hardness', value: 'Extremely High' }
        ],
        sellingPoints: [
            { title: 'Aesthetic Superiority', desc: 'Distinctive natural oils provide a rich, deep finish favored in high-end global markets.', icon: ShieldCheck },
            { title: 'Dimensional Stability', desc: 'Exceptionally stable under fluctuating temperatures, preventing luxury floor warping.', icon: Ruler }
        ]
    },
    teak: {
        name: 'Teak',
        seoTitle: 'Teak Wood Suppliers with Supply Chain Traceability',
        seoDescription: 'Direct suppliers of premium Teak. Secure, sustainable, and highly regulated harvest quotas ensuring unparalleled quality and ethical export.',
        keywords: ['Sustainable Teak Supply', 'Teak Export Traceability', 'Marine Grade Teak', 'Ethical Timber Trade'],
        heroTagline: 'Unparalleled Prestige and Marine Durability.',
        heroImage: '/hero-vitrex.jpg', 
        description: 'The global gold standard for marine and exterior luxury. Our Teak is harvested under strict plantation quotas from Kelantan and Thailand, locking in its unmatched natural oil content and environmental resilience.',
        techSpecs: [
            { label: 'Classification', value: 'Premium Hardwood' },
            { label: 'Air-Dry Density', value: '610 - 750 kg/m³' },
            { label: 'Supply Origin', value: 'Malaysian & Thai Plantations' },
            { label: 'Yield Regulation', value: 'Strict 100cm+ Diameter Harvest' }
        ],
        sellingPoints: [
            { title: 'Marine Grade', desc: 'Naturally water-repellent owing to concentrated silica and oil content.', icon: Anchor },
            { title: 'Ethical Sourcing', desc: 'Completely verifiable supply chain, insulating B2B buyers from illicit logging risks.', icon: ShieldCheck }
        ]
    }
};

const Species = () => {
    const { id } = useParams();
    const speciesInfo = speciesData[id.toLowerCase()];

    useEffect(() => {
        if (speciesInfo) {
            gsap.fromTo('.silo-hero',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );
        }
    }, [id, speciesInfo]);

    if (!speciesInfo) {
        return <Navigate to="/products" replace />;
    }

    const { name, seoTitle, seoDescription, keywords, heroTagline, heroImage, description, techSpecs, sellingPoints } = speciesInfo;

    return (
        <div className="w-full bg-brand-cream pt-32 pb-24 min-h-screen">
            <SEO
                title={seoTitle}
                description={seoDescription}
                canonical={`/products/${id}`}
                schemas={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": `${name} - Premium Sawn Timber`,
                        "description": description,
                        "material": name,
                        "brand": {
                            "@type": "Brand",
                            "name": "R&J Wood Trading"
                        },
                        "countryOfOrigin": {
                            "@type": "Country",
                            "name": "Malaysia"
                        },
                        "keywords": keywords.join(', ')
                    }
                ]}
            />

            {/* Silo Hero */}
            <section className="silo-hero max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link to="/products" className="text-brand-clay font-mono text-xs tracking-widest uppercase mb-6 inline-flex hover:underline">
                            ← Back to Portfolio
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-display italic text-brand-charcoal mb-4">
                            {name}
                        </h1>
                        <p className="font-mono text-brand-moss tracking-widest uppercase text-sm font-medium mb-8">
                            {heroTagline}
                        </p>
                        <p className="text-lg text-brand-charcoal/80 font-sans leading-relaxed mb-6">
                            {description}
                        </p>
                        <p className="text-md text-brand-charcoal/70 font-sans leading-relaxed border-l-2 border-brand-clay pl-4">
                            <strong>Forest to Final Delivery:</strong> We skip the brokers. This allows us to enforce strict PEFC benchmarks, verify origins, and guarantee immense B2B reliability.
                        </p>
                    </div>
                    <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        <img src={heroImage} alt={`${name} Timber`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-brand-moss/10 mix-blend-multiply"></div>
                    </div>
                </div>
            </section>

            {/* Tech Specs */}
            <section className="bg-brand-charcoal text-brand-cream py-24 px-6 md:px-12 lg:px-24 mb-24">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display mb-12 text-center text-brand-cream border-b border-brand-cream/10 pb-6">
                        Architectural & Grading Specifications
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {techSpecs.map((spec, i) => (
                            <div key={i} className="text-center p-6 bg-brand-surface/5 rounded-xl border border-brand-cream/5">
                                <p className="font-mono text-brand-clay text-xs tracking-widest uppercase mb-2">{spec.label}</p>
                                <p className="font-sans text-lg font-medium tracking-tight">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Targeted Sales Approach */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {sellingPoints.map((point, i) => (
                        <div key={i} className="flex gap-6 bg-white p-8 rounded-2xl shadow-sm border border-brand-charcoal/5 hover:border-brand-moss/30 transition-colors">
                            <div className="text-brand-moss shrink-0">
                                <point.icon size={32} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-sans font-medium text-brand-charcoal mb-3">{point.title}</h3>
                                <p className="text-brand-charcoal/70 leading-relaxed font-sans">{point.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Procurement CTA */}
            <section className="max-w-4xl mx-auto px-6 text-center">
                <div className="bg-brand-moss/5 rounded-3xl p-12 border border-brand-moss/10">
                    <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-4">
                        Secure Your Supply
                    </p>
                    <h2 className="text-3xl font-display italic text-brand-charcoal mb-6">
                        Request {name} Pricing
                    </h2>
                    <Link
                        to="/quote"
                        className="inline-flex items-center gap-3 bg-brand-clay text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#a64526] transition-colors"
                    >
                        Export & Wholesale Quote
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Species;
