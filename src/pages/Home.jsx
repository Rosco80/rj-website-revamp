import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

// ─── FAQ data — visible on page AND used in FAQPage schema ───────────────────
const faqs = [
    {
        question: "What timber species does R&J Wood Trading supply?",
        answerText: "We supply a comprehensive range of premium Malaysian hardwoods including Balau, Merbau, Keruing, and Teak. These are available as heavy hardwood, medium hardwood, light hardwood, mixed hardwood, plywood, and hardwood flooring. All species are responsibly sourced through our sister company, Vitrex Timber Industries Sdn. Bhd.",
        answer: <>We supply a comprehensive range of premium Malaysian hardwoods including <Link to="/products/balau" className="text-brand-clay font-medium hover:underline">Balau</Link>, <Link to="/products/merbau" className="text-brand-clay font-medium hover:underline">Merbau</Link>, Keruing, and <Link to="/products/teak" className="text-brand-clay font-medium hover:underline">Teak</Link>. These are available as heavy hardwood, medium hardwood, light hardwood, mixed hardwood, plywood, and hardwood flooring. All species are responsibly sourced through our sister company, Vitrex Timber Industries Sdn. Bhd.</>
    },
    {
        question: "Is your timber FSC or PEFC certified?",
        answerText: "R&J Wood Trading is actively pursuing FSC certification and adheres to PEFC standards through our sister company Vitrex Timber Industries. We practice selective harvesting (trees must be 100cm+ in diameter), have replanted over 500 hectares in the past five years, and maintain full supply chain traceability from forest to final delivery.",
        answer: <>R&J Wood Trading is actively pursuing FSC certification and adheres to PEFC standards through our sister company <Link to="/vitrex" className="text-brand-clay font-medium hover:underline">Vitrex Timber Industries</Link>. We practice selective harvesting (trees must be 100cm+ in diameter), have replanted over 500 hectares in the past five years, and maintain full supply chain traceability from forest to final delivery.</>
    },
    {
        question: "Do you ship timber internationally?",
        answerText: "Yes. We supply clients globally with reliable, timely international shipping. Our operations are based in Kelantan, Malaysia, and we export to markets across Europe, North America, the Middle East, and East Asia. Contact us via the quote form to discuss specific shipping requirements for your region.",
        answer: <>Yes. We supply clients globally with reliable, timely international shipping. Our operations are based in Kelantan, Malaysia, and we export to markets across Europe, North America, the Middle East, and East Asia. Contact us via the <Link to="/quote" className="text-brand-clay font-medium hover:underline">quote form</Link> to discuss specific shipping requirements for your region.</>
    },
    {
        question: "What is the difference between Balau and Merbau timber?",
        answerText: "Balau is an extremely dense, high-durability hardwood ideal for heavy structural applications, decking, and marine uses. Merbau is slightly less dense but highly workable, with a richer reddish-brown colour — making it a popular choice for flooring, furniture, and interior joinery. Both are sustainably sourced from our managed Malaysian plantations.",
        answer: <><Link to="/products/balau" className="text-brand-clay font-medium hover:underline">Balau</Link> is an extremely dense, high-durability hardwood ideal for heavy structural applications, decking, and marine uses. <Link to="/products/merbau" className="text-brand-clay font-medium hover:underline">Merbau</Link> is slightly less dense but highly workable, with a richer reddish-brown colour — making it a popular choice for flooring, furniture, and interior joinery. Both are sustainably sourced from our managed Malaysian <Link to="/vitrex" className="text-brand-clay font-medium hover:underline">plantations</Link>.</>
    },
    {
        question: "How can I request a custom timber quote?",
        answerText: "You can submit your project requirements through our Request a Quote page. Our team will review your specifications — timber species, dimensions, volume, and delivery requirements — and respond with a tailored proposal. You can also reach us directly at info@rjwoodtrading.com.",
        answer: <>You can submit your project requirements through our <Link to="/quote" className="text-brand-clay font-medium hover:underline">Request a Quote</Link> page. Our team will review your specifications — timber species, dimensions, volume, and delivery requirements — and respond with a tailored proposal. You can also reach us directly at <a href="mailto:info@rjwoodtrading.com" className="text-brand-clay font-medium hover:underline">info@rjwoodtrading.com</a>.</>
    }
];

// ─── Trust stats ─────────────────────────────────────────────────────────────
const trustStats = [
    { value: "30+", label: "Years Industry Experience" },
    { value: "500+", label: "Hectares Replanted" },
    { value: "8 T/acre", label: "Sustainable Yield" },
    { value: "Global", label: "Delivery Worldwide" },
];

// ─── Structured data ─────────────────────────────────────────────────────────
const homeSchemas = [
    {
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness"],
        "name": "R&J Wood Trading",
        "url": "https://rjwoodtrading.com",
        "description": "Premium sustainable Malaysian timber supplier — Balau, Merbau, Keruing and Teak from certified Malaysian forests.",
        "email": "info@rjwoodtrading.com",
        "address": { "@type": "PostalAddress", "addressCountry": "MY", "addressRegion": "Kelantan" },
        "sameAs": []
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "R&J Wood Trading",
        "url": "https://rjwoodtrading.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://rjwoodtrading.com/blog?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answerText }
        }))
    }
];

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FAQItem({ faq, index }) {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="border-b border-brand-charcoal/10 last:border-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                aria-expanded={open}
            >
                <h3 className="font-sans font-medium text-brand-charcoal text-lg leading-snug group-hover:text-brand-moss transition-colors">
                    {faq.question}
                </h3>
                <ChevronDown
                    size={20}
                    className={`shrink-0 mt-0.5 text-brand-clay transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            {open && (
                <p className="font-sans text-brand-charcoal/70 leading-relaxed pb-6 -mt-2">
                    {faq.answer}
                </p>
            )}
        </div>
    );
}

function Home() {
    return (
        <>
            <SEO
                description="R&J Wood Trading supplies premium, sustainably sourced Malaysian hardwoods — Balau, Merbau, Keruing and Teak. FSC/PEFC committed. Global delivery from forest to final destination."
                canonical="/"
                schemas={homeSchemas}
            />
            <Hero />
            <Features />

            {/* ── Trust & Credentials ──────────────────────────────────────── */}
            <section className="bg-brand-charcoal py-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                        {trustStats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <span className="text-4xl md:text-5xl font-display italic text-brand-clay font-medium">
                                    {stat.value}
                                </span>
                                <span className="font-mono text-brand-cream/60 text-xs tracking-widest uppercase">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Certification badges */}
                    <div className="mt-12 pt-10 border-t border-brand-cream/10 flex flex-wrap items-center justify-center gap-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-moss/40 text-brand-moss font-mono text-xs tracking-widest uppercase">
                            FSC Certification — In Progress
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-moss/40 text-brand-moss font-mono text-xs tracking-widest uppercase">
                            PEFC Standards
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-clay/40 text-brand-clay font-mono text-xs tracking-widest uppercase">
                            Sustainably Sourced
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cream/20 text-brand-cream/60 font-mono text-xs tracking-widest uppercase">
                            Vertically Integrated Supply Chain
                        </span>
                    </div>
                </div>
            </section>

            <Philosophy />
            <Protocol />

            {/* ── FAQ ──────────────────────────────────────────────────────── */}
            <section className="bg-brand-cream py-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-4">
                            Common Questions
                        </p>
                        <h2 className="text-4xl md:text-5xl font-display italic text-brand-charcoal">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div>
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} faq={faq} index={i} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-brand-charcoal/60 font-sans mb-4">
                            Have a specific requirement?
                        </p>
                        <Link
                            to="/quote"
                            className="inline-flex items-center gap-2 bg-brand-clay text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#a64526] transition-colors"
                        >
                            Request a Custom Quote
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
