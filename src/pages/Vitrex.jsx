import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { ShieldCheck, Leaf, Target, Award, Globe, LeafyGreen, TreePine, Warehouse, Brush } from 'lucide-react';
import gsap from 'gsap';

const products = [
    { name: 'Logs (Local Market Only)', desc: 'High-quality logs sourced from sustainably managed forests.', icon: TreePine },
    { name: 'Planks', desc: 'Perfect for construction and flooring; available in various hardwoods.', icon: Warehouse },
    { name: 'Pallets', desc: 'Durable, sustainably sourced pallets for industrial use.', icon: Target },
    { name: 'Flooring', desc: 'Stylish and long-lasting hardwood flooring (e.g., Merbau, Balau).', icon: Globe },
    { name: 'Furniture', desc: 'High-quality timber for creating chairs, tables, and custom pieces.', icon: Brush },
    { name: 'Design Products', desc: 'Ideal for bespoke design products in commercial spaces or luxury residential projects.', icon: Award },
];

const Vitrex = () => {
    useEffect(() => {
        // Simple fade in for the page
        gsap.fromTo('.vitrex-hero',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
    }, []);

    return (
        <div className="w-full bg-brand-cream pt-32 pb-24">
            <SEO
                title="Vitrex Timber Industries"
                description="Vitrex Timber Industries Sdn. Bhd. — R&J's sister company operating sustainable teak and hardwood plantations in Kelantan, Malaysia since 1991."
                canonical="/vitrex"
                schemas={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Vitrex Timber Industries Sdn. Bhd.",
                        "foundingDate": "1991",
                        "description": "Sustainable timber harvesting and plantation management operating in Kelantan State, Malaysia.",
                        "knowsAbout": ["Sustainable Forestry", "Teak Plantations", "Malaysian Hardwoods", "Balau", "Merbau", "Keruing", "PEFC Standards"],
                        "parentOrganization": {
                            "@type": "Organization",
                            "name": "R&J Wood Trading",
                            "url": "https://rjwoodtrading.com"
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "addressRegion": "Kelantan",
                            "addressCountry": "MY"
                        }
                    }
                ]}
            />
            {/* Hero Section */}
            <section className="vitrex-hero max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-32 text-center md:text-left">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <p className="font-mono text-brand-moss tracking-widest uppercase text-sm font-medium mb-4">
                            Our Sister Company
                        </p>
                        <h1 className="text-5xl md:text-7xl font-display italic text-brand-charcoal leading-tight mb-6">
                            Vitrex Timber Industries
                        </h1>
                        <p className="text-lg text-brand-charcoal/80 font-sans leading-relaxed">
                            Since 1991, Vitrex Timber Industries Sdn. Bhd. has been a trusted name in the timber industry, operating with a deep commitment to sustainability and quality. As a family-owned Bumiputra company, we are proud of our heritage and dedication to responsible forestry practices.
                        </p>
                        <p className="text-lg text-brand-charcoal/80 font-sans leading-relaxed mt-4">
                            Our operations are based in Kelantan State, Malaysia, and we work closely with partners in Thailand to manage premium teak plantations.
                        </p>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[2/3] max-h-[80vh] w-full overflow-hidden rounded-[2rem] lg:rounded-bl-[6rem] lg:rounded-tr-[6rem] shadow-2xl">
                            <img
                                src="/hero-vitrex.jpg"
                                alt="Sustainable forestry and teak plantations in Malaysia"
                                className="w-full h-full object-cover origin-center"
                            />
                            <div className="absolute inset-0 bg-brand-moss/10 mix-blend-multiply transition-opacity hover:opacity-0 duration-700"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainable Practices */}
            <section className="bg-brand-moss text-brand-cream py-24 px-6 md:px-12 lg:px-24 mb-32">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-medium mb-16">Sustainable Forestry Practices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h3 className="text-2xl font-sans font-medium text-brand-clay mb-4">Reforestation</h3>
                            <p className="opacity-80">Over the past five years, we have successfully replanted more than 500 hectares of land in Kelantan State, maintaining a healthy ecosystem.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-sans font-medium text-brand-clay mb-4">Selective Harvesting</h3>
                            <p className="opacity-80">We carefully select our timber, ensuring that only trees with a diameter of 100cm or more are harvested so younger trees can thrive.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-sans font-medium text-brand-clay mb-4">High-Yield</h3>
                            <p className="opacity-80">Our sustainable practices have resulted in an impressive yield of 8 tons per acre, balancing environmental responsibility with production efficiency.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Vitrex */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-brand-charcoal">Why Choose Vitrex?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Sustainable Practices', desc: 'Heart of everything we do. FSC pursuit minimizes footprint.' },
                        { title: 'Professional Expertise', desc: 'Over 30 years as a leader. Family-run reliability.' },
                        { title: 'Premium Quality', desc: 'Responsible harvesting of Balau, Merbau, Keruing, and Teak.' },
                        { title: 'Competitive Pricing', desc: 'Efficient methods mean high quality without a high price.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-brand-surface p-8 rounded-2xl border border-brand-charcoal/10 hover:border-brand-clay transition-colors group">
                            <h3 className="text-xl font-sans font-medium text-brand-charcoal mb-3 group-hover:text-brand-clay transition-colors">{item.title}</h3>
                            <p className="text-brand-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products Showcase */}
            <section className="bg-brand-surface py-24 px-6 md:px-12 lg:px-24 border-y border-brand-charcoal/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-brand-charcoal mb-4 text-center">Our Products</h2>
                    <p className="text-brand-charcoal/70 text-center max-w-2xl mx-auto mb-16">Diverse selection tailored to meet the needs of both domestic and international markets.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((prod, i) => (
                            <div key={i} className="flex gap-4 p-6 bg-brand-cream rounded-xl">
                                <div className="bg-brand-charcoal/5 p-3 rounded-lg h-fit text-brand-moss">
                                    <prod.icon size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="font-sans font-medium text-brand-charcoal mb-1">{prod.name}</h4>
                                    <p className="text-brand-charcoal/60 text-sm">{prod.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Reach */}
            <section className="max-w-4xl mx-auto px-6 md:px-12 pt-32 text-center text-brand-charcoal">
                <Globe size={48} className="mx-auto text-brand-clay mb-6" strokeWidth={1} />
                <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">Our Global Reach</h2>
                <p className="text-lg opacity-80 leading-relaxed">
                    While our roots are in Malaysia, Vitrex Timber’s reach extends globally through our partnership with <span className="font-medium text-brand-moss">R&J Wood Trading</span>, our sister company responsible for exporting our premium timber to international markets. Together, we provide seamless service from sustainable harvesting to worldwide distribution.
                </p>
            </section>
        </div>
    );
};

export default Vitrex;
