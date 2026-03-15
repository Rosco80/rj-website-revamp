import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../lib/sanity';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import gsap from 'gsap';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const query = `*[_type == "post" && slug.current == $slug][0]`;
                const data = await client.fetch(query, { slug });
                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    useEffect(() => {
        if (!loading && post) {
            gsap.fromTo(".post-content",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
        }
    }, [loading, post]);

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-surface pt-40 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-moss"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-brand-surface pt-40 text-center">
                <h2 className="text-3xl font-display text-brand-charcoal mb-4">Post not found</h2>
                <Link to="/blog" className="text-brand-moss hover:text-brand-clay transition-colors underline">
                    Return to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="w-full bg-brand-surface pt-32 pb-24 min-h-screen">
            <SEO
                title={post.title}
                description={post.excerpt}
                canonical={`/blog/${post.slug.current}`}
                image={post.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.excerpt,
                    "datePublished": post.publishedAt,
                    "image": post.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined,
                    "author": { "@type": "Organization", "name": "R&J Wood Trading" },
                    "publisher": { "@type": "Organization", "name": "R&J Wood Trading", "url": "https://rjwoodtrading.com" }
                }}
            />
            <div className="max-w-4xl mx-auto px-6 md:px-12 post-content opacity-0">
                {/* Back Link */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-brand-clay font-mono text-sm uppercase tracking-widest mb-12 hover:text-brand-moss transition-colors group">
                    <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                    Back to Insights
                </Link>

                {/* Header Section */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6 text-xs font-mono tracking-widest uppercase text-brand-clay">
                        <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>
                        <span className="text-brand-charcoal/30">•</span>
                        <span className="flex items-center gap-1 text-brand-charcoal/60"><Clock size={14} /> {post.readTime}</span>
                        <span className="text-brand-charcoal/30">•</span>
                        <span className="flex items-center gap-1 text-brand-charcoal/60">
                            <Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display italic text-brand-charcoal mb-8 leading-tight">
                        {post.title}
                    </h1>
                </header>

                {/* Hero Image */}
                {post.mainImage && (
                    <figure className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-lg border border-brand-charcoal/5">
                        <img
                            src={urlFor(post.mainImage).width(1600).url()}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </figure>
                )}

                {/* Article Body */}
                <div className="prose prose-lg prose-stone prose-brand max-w-none">
                    <PortableText value={post.body} />
                </div>

                {/* External Link if provided */}
                {post.externalLink && (
                    <div className="mt-16 pt-12 border-t border-brand-charcoal/10">
                        <p className="text-sm text-brand-charcoal/50 font-mono uppercase tracking-widest mb-4">Original Source</p>
                        <a
                            href={post.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-moss hover:text-brand-clay transition-colors underline font-medium"
                        >
                            Read the full article on the original site
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
};

export default BlogPost;
