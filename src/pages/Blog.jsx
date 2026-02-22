import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const query = `*[_type == "post"] | order(publishedAt desc)`;
                const data = await client.fetch(query);
                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();

        // SEO page load animation
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    useEffect(() => {
        if (!loading && posts.length > 0) {
            // Staggered article reveal triggered after data is loaded
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
        }
    }, [loading, posts]);

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
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-moss"></div>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-16">
                        {posts.map((post) => (
                            <article key={post._id} className="blog-post flex flex-col group cursor-pointer opacity-0">
                                {/* Semantic Image Wrapper */}
                                <figure className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative bg-brand-cream border border-brand-charcoal/5 shadow-sm">
                                    <img
                                        src={urlFor(post.mainImage).width(800).url()}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
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

                                    {/* Link */}
                                    <div className="mt-auto">
                                        <a
                                            href={post.externalLink}
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
                ) : (
                    <div className="text-center py-20 text-brand-charcoal/50">
                        <p>No articles found yet. Log in to Sanity to create your first post!</p>
                    </div>
                )}
            </section>

        </main>
    );
};

export default Blog;

