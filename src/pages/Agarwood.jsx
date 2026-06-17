import React, { useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplet, Sparkles, Wind, ArrowRight, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
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
            <SEO
                title="Pure Agarwood Oil"
                description="Premium agarwood essential oil from private Malaccensis tree plantations in Malaysia. Nature's liquid gold — pure, potent, and sustainably produced."
                canonical="/agarwood"
                image="/agarwood-oil.webp"
                schemas={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": "Pure Agarwood Essential Oil (Oud)",
                        "description": "Premium agarwood essential oil distilled from Aquilaria Malaccensis trees, sustainably cultivated in private Malaysian plantations. Nature's liquid gold — pure, potent, and ethically produced.",
                        "brand": { "@type": "Brand", "name": "R&J Wood Trading" },
                        "material": "Aquilaria Malaccensis",
                        "countryOfOrigin": { "@type": "Country", "name": "Malaysia" },
                        "image": "https://rjwoodtrading.com/agarwood-oil.webp",
                        "offers": {
                            "@type": "Offer",
                            "availability": "https://schema.org/InStock",
                            "url": "https://rjwoodtrading.com/quote"
                        }
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is Agarwood Oil (Oud)?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Agarwood oil, also known as Oud, is a highly prized essential oil distilled from the resinous heartwood of Aquilaria trees (specifically Aquilaria Malaccensis) when they become infected with a specific mold. It is famous for its complex, warm, woody aroma."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is your Agarwood Oil sustainably sourced?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, at R&J Wood Trading, we harvest our Agarwood oil exclusively from sustainably managed private plantations in Malaysia, preserving wild Aquilaria species and supporting biodiversity."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What makes Malaysian Aquilaria Malaccensis unique?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Aquilaria Malaccensis is the most sought-after Agarwood species. Its distilled oil delivers a distinctively rich, deep, animalic, and woody note with sweet, balsamic undertones that make it superior to other varieties."
                                }
                            }
                        ]
                    }
                ]}
            />

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
                            src="/agarwood-oil.webp"
                            alt="Pure Malaysian Agarwood essential oil from Aquilaria Malaccensis plantations"
                            title="R&J Wood Trading — Premium Agarwood Oil"
                            className="w-full h-full object-cover"
                            loading="lazy"
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
            <section className="bg-brand-moss/20 border-y border-brand-moss/30 py-32 px-6 md:px-12 lg:px-24 mb-20 animate-section opacity-0">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-8">The Ancient Art of Processing</h2>
                    <p className="text-lg text-brand-cream/80 font-sans leading-relaxed mb-6">
                        For thousands of years, this mysterious essence has captivated civilizations with its complex fragrance. From the tranquil temples of Japan to the bustling souks of the Middle East, agarwood transcends ordinary essential oils.
                    </p>
                    <p className="text-lg text-brand-cream/80 font-sans leading-relaxed mb-12">
                        At <Link to="/" className="text-white font-medium hover:underline transition-colors">R&J Wood Trading</Link>, we source directly from our own carefully managed <span className="text-brand-clay font-medium italic">Malaccensis</span> tree plantations. We honor the traditional extraction processes, preserving the therapeutic integrity and producing true "liquid gold."
                    </p>
                </div>
            </section>

            {/* The Journey Timeline Section */}
            <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 mb-32">
                <div className="text-center mb-16 animate-section opacity-0">
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">The Journey of our Agar Oil</h2>
                    <p className="text-brand-cream/60 font-sans max-w-2xl mx-auto">
                        From our sustainably managed plantations to the final distillation, witness the meticulous process behind the creation of our pure liquid gold.
                    </p>
                </div>

                <div className="space-y-24 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                    
                    {/* Timeline Item 1 */}
                    <article className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-section opacity-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#1A1A1A] bg-brand-clay text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <span className="font-mono text-xs">01</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xl group-hover:border-brand-clay/50 transition-colors">
                            <img src="/agarwood_trees.webp" alt="Sustainable Aquilaria Malaccensis plantation" className="rounded-xl w-full h-48 md:h-64 object-cover mb-4" loading="lazy" />
                            <h3 className="text-2xl font-display text-white mb-2">Cultivation & Inoculation</h3>
                            <p className="text-brand-cream/60 font-sans text-sm leading-relaxed">
                                Our Aquilaria trees are carefully nurtured in Southeast Asia. We use sustainable methods to induce the natural defense mechanism that creates the prized resin. Only infected trees produce this "liquid gold," making the process a rare art.
                            </p>
                        </div>
                    </article>

                    {/* Timeline Item 2 */}
                    <article className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-section opacity-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#1A1A1A] bg-brand-clay text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <span className="font-mono text-xs">02</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xl group-hover:border-brand-clay/50 transition-colors">
                            <img src="/sap_harvested.webp" alt="Harvesting the dark, resinous agarwood heartwood" className="rounded-xl w-full h-48 md:h-64 object-cover mb-4" loading="lazy" />
                            <h3 className="text-2xl font-display text-white mb-2">Harvesting the Resin</h3>
                            <p className="text-brand-cream/60 font-sans text-sm leading-relaxed">
                                After years of careful monitoring, the dark, fragrant resin-impregnated heartwood is expertly harvested. The rich, woody, and sweet scent is already apparent in the raw wood before distillation even begins.
                            </p>
                        </div>
                    </article>

                    {/* Timeline Item 3 */}
                    <article className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-section opacity-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#1A1A1A] bg-brand-moss text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <span className="font-mono text-xs">03</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xl group-hover:border-brand-moss/50 transition-colors">
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <img src="/Agar Oil/IMG-20241010-WA0003.webp" alt="Distillation process" className="rounded-xl w-full h-24 md:h-32 object-cover" loading="lazy" />
                                <img src="/Agar Oil/IMG-20241010-WA0005.webp" alt="Pure Oud Oil droplets" className="rounded-xl w-full h-24 md:h-32 object-cover" loading="lazy" />
                            </div>
                            <h3 className="text-2xl font-display text-white mb-2">Artisanal Distillation</h3>
                            <p className="text-brand-cream/60 font-sans text-sm leading-relaxed">
                                The wood is processed and slowly distilled to extract the concentrated essential oil. We focus on producing "Super/Pure Oud" grade—the highest quality offering an extremely rich, complex, and long-lasting aroma.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* Authenticity & Lab Results Section */}
            <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 mb-40 animate-section opacity-0">
                <div className="bg-gradient-to-b from-brand-clay/5 to-transparent border border-brand-clay/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-clay/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 text-brand-clay bg-brand-clay/10 px-4 py-2 rounded-full w-fit mb-6 border border-brand-clay/30">
                                <ShieldCheck size={20} />
                                <span className="font-sans font-medium text-sm">Independently Lab Tested & Certified</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
                                Uncompromising Purity & Authenticity
                            </h2>
                            <p className="text-brand-cream/70 font-sans leading-relaxed mb-6">
                                Because pure Agarwood oil is one of the most expensive natural oils in the world, authenticity is paramount. Our oil is rigorously tested by independent laboratories, including the Forest Research Institute Malaysia (FRIM) and Lexva Analytique in France.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-brand-clay mt-1 shrink-0" />
                                    <p className="text-brand-cream/80 text-sm font-sans">
                                        <strong className="text-white block mb-1">High Concentration of Active Compounds</strong>
                                        Lexva analysis confirms optimal levels of crucial sesquiterpenes and agarofurans, validating its therapeutic and aromatic potency.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-brand-clay mt-1 shrink-0" />
                                    <p className="text-brand-cream/80 text-sm font-sans">
                                        <strong className="text-white block mb-1">100% Pure Distillate</strong>
                                        No synthetic additives, diluents, or carrier oils. Verified as true Aquilaria Malaccensis extract.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-brand-clay mt-1 shrink-0" />
                                    <p className="text-brand-cream/80 text-sm font-sans">
                                        <strong className="text-white block mb-1">FRIM Certified Source</strong>
                                        Verified by the Forest Research Institute Malaysia, guaranteeing ethical sourcing and high-grade quality from our plantations.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Certificate Downloads */}
                            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
                                <a href="/Agar Oil/87015 Agarwood TROPICAL EXTRACT Analyses Lexva_260616_183034.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-clay text-white px-5 py-3 rounded-xl hover:bg-[#a64526] transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-clay focus:ring-offset-2 focus:ring-offset-[#1A1A1A]">
                                    <FileText size={18} />
                                    <span className="font-sans text-sm font-medium">Download Lexva Analysis</span>
                                </a>
                                <a href="/Agar Oil/Frim Analysis.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/5 text-white border border-white/10 px-5 py-3 rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1A]">
                                    <FileText size={18} />
                                    <span className="font-sans text-sm font-medium">Download FRIM Report</span>
                                </a>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
                            <img src="/Agar Oil/IMG-20250210-WA0013.webp" alt="Agarwood purity testing" className="rounded-xl w-full h-full object-cover shadow-lg border border-white/10" loading="lazy" />
                            <img src="/Agar Oil/IMG-20250224-WA0003.webp" alt="Laboratory analysis vials" className="rounded-xl w-full h-full object-cover shadow-lg border border-white/10 translate-y-6" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 mb-40 animate-section opacity-0">
                <div className="border-t border-white/10 pt-20 mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-brand-cream/60 font-sans max-w-xl mx-auto">
                        Quick answers about our premium Agarwood harvesting, distillation, and sustainability.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                        <h3 className="text-xl font-sans text-white font-medium mb-3">What is Agarwood Oil (Oud)?</h3>
                        <p className="text-brand-cream/60 leading-relaxed text-sm">
                            Agarwood oil, also known as Oud, is a highly prized essential oil distilled from the resinous heartwood of Aquilaria trees (specifically Aquilaria Malaccensis) when they become infected with a specific mold. It is famous for its complex, warm, woody aroma.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                        <h3 className="text-xl font-sans text-white font-medium mb-3">Is your Agarwood Oil sustainably sourced?</h3>
                        <p className="text-brand-cream/60 leading-relaxed text-sm">
                            Yes, at R&J Wood Trading, we harvest our Agarwood oil exclusively from sustainably managed private plantations in Malaysia, preserving wild Aquilaria species and supporting biodiversity.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                        <h3 className="text-xl font-sans text-white font-medium mb-3">What makes Malaysian Aquilaria Malaccensis unique?</h3>
                        <p className="text-brand-cream/60 leading-relaxed text-sm">
                            Aquilaria Malaccensis is the most sought-after Agarwood species. Its distilled oil delivers a distinctively rich, deep, animalic, and woody note with sweet, balsamic undertones that make it superior to other varieties.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                        <h3 className="text-xl font-sans text-white font-medium mb-3">How do I store pure Oud oil?</h3>
                        <p className="text-brand-cream/60 leading-relaxed text-sm">
                            Store pure Oud oil in a cool, dark place in a tightly sealed glass vial. Like fine wine, authentic pure Oud oil ages beautifully and matures over time, becoming smoother and deeper.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-6 text-center animate-section opacity-0">
                <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">Elevate Your Senses</h2>
                <p className="text-xl text-brand-cream/60 mb-12 max-w-2xl mx-auto">
                    Transform your daily rituals into extraordinary experiences. If you’re looking for premium Agarwood Essential Oils, get in touch with our team today.
                </p>
                <Link to="/quote" className="inline-flex items-center gap-3 bg-brand-clay text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#a64526] transition-colors shadow-lg shadow-brand-clay/20">
                    Request a Quote
                    <ArrowRight size={20} />
                </Link>
            </section>

        </div>
    );
};

export default Agarwood;
