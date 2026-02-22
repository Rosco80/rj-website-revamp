import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
    {
        id: 1,
        title: "Why Choose Sustainable Malaysian Timber",
        excerpt: "The construction industry is a highly demanding sector. If you're concerned about strength, resilience, quality, and sustainability, sourcing from a serious Malaysian hardwood exporter is a genius move.",
        category: "Construction & Architecture",
        readTime: "5 min read",
        link: "https://www.rjwoodtrading.com/why-choose-sustainable-malaysian-timber-for-your-construction-and-furniture",
        image: "/blog-timber.jpg"
    },
    {
        id: 2,
        title: "Exploring Merbau, Balau, and Keruing Woods",
        excerpt: "Tropical hardwoods have a reputation for being robust, attractive, and able to withstand harsh conditions. We zoom in on the unique qualities of three of these: Merbau, Balau, and Keruing.",
        category: "Product Spotlight",
        readTime: "4 min read",
        link: "https://www.rjwoodtrading.com/exploring-the-unique-qualities-of-merbau-balau-and-keruing-wood",
        image: "/blog-logs.jpg"
    },
    {
        id: 3,
        title: "The Benefits of Teak Wood: From Plantation to Finished Product",
        excerpt: "Teak wood, recognized for its durability and aesthetic appeal, has been a cornerstone in woodworking for centuries. Explore the journey of teak wood from its plantation roots to the luxurious finished products.",
        category: "Industry Insights",
        readTime: "6 min read",
        link: "https://www.rjwoodtrading.com/exploring-the-benefits-of-teak-wood-from-plantation-to-finished-product",
        image: "/blog-teak.jpg"
    },
    {
        id: 4,
        title: "Agarwood Essential Oil - A Complete Guide",
        excerpt: "For thousands of years, this mysterious essence has captivated civilizations with its complex fragrance and remarkable therapeutic properties. Discover the process from harvest to production and usage.",
        category: "Aromatherapy",
        readTime: "8 min read",
        link: "https://www.rjwoodtrading.com/agarwood-essential-oil-the-complete-guide-to-natures-liquid-gold",
        image: "/blog-agarwood.jpg"
    }
];

const Blog = () => {
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        // Semantic SEO page load animation
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Staggered article reveal
        const articles = gsap.utils.toArray('article.blog-post');
        gsap.fromTo(articles,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    }, []);

    return (
        <main className="w-full bg-brand-surface pt-32 pb-24 min-h-screen">

            {/* SEO Optimized Header */}
            <header ref={headerRef} className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-24 opacity-0">
                <BookOpen className="w-12 h-12 text-brand-clay mx-auto mb-6" strokeWidth={1.5} />
                <h1 className="text-5xl md:text-7xl font-display italic text-brand-charcoal mb-6 leading-tight">
                    Insights & Expertise
                </h1>
                <p className="text-lg text-brand-charcoal/70 font-sans leading-relaxed">
                    Explore our latest articles on sustainable forestry, timber characteristics, industry insights, and the profound benefits of natural wood products.
                </p>
            </header>

            {/* Semantic Article Grid */}
            <section ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-16">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="blog-post flex flex-col group cursor-pointer opacity-0">
                            {/* Semantic Image Wrapper */}
                            <figure className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative bg-brand-cream border border-brand-charcoal/5 shadow-sm">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy" /* SEO Optimization for performance */
                                />
                                <div className="absolute inset-0 bg-brand-moss/0 group-hover:bg-brand-moss/10 transition-colors duration-500"></div>
                            </figure>

                            {/* Semantic Content Area */}
                            <div className="flex flex-col flex-grow">
                                {/* Metadata */}
                                <div className="flex items-center gap-4 mb-4 text-xs font-mono tracking-widest uppercase text-brand-clay">
                                    <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>
                                    <span className="text-brand-charcoal/30">•</span>
                                    <span className="flex items-center gap-1 text-brand-charcoal/60"><Clock size={14} /> {post.readTime}</span>
                                </div>

                                {/* Heading */}
                                <h2 className="text-2xl font-sans font-medium text-brand-charcoal mb-3 group-hover:text-brand-moss transition-colors line-clamp-2">
                                    {post.title}
                                </h2>

                                {/* SEO description */}
                                <p className="text-brand-charcoal/70 font-sans leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* External Link tracking */}
                                <div className="mt-auto">
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-brand-moss font-medium font-sans group-hover:text-brand-clay transition-colors group/link"
                                        aria-label={`Read full article: ${post.title}`}
                                    >
                                        <span className="border-b border-transparent group-hover/link:border-brand-clay transition-colors pb-0.5">Read Article</span>
                                        <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

        </main>
    );
};

export default Blog;
