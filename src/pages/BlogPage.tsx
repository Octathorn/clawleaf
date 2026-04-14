import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import groq from "groq";
import { getSanityClient, getSanityConfig } from "@/lib/sanity";

type BlogIndexPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  tag?: string;
  publishedAt?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
};

const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  tag,
  publishedAt,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt
}`;

const EMPTY_POSTS: BlogIndexPost[] = [];

function formatPublishedDate(iso: string) {
  // Must be deterministic across SSR (Node) + client (browser) to avoid hydration mismatches.
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(iso));
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogIndexPost[] | undefined>(undefined);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [corsBlocked, setCorsBlocked] = useState(false);

  useEffect(() => {
    const cfg = getSanityConfig();
    if (!cfg.projectId) {
      if (posts === undefined) setPosts(EMPTY_POSTS);
      return;
    }
    if (posts !== undefined) return;
    let cancelled = false;
    setLoadError(null);
    setCorsBlocked(false);
    const client = getSanityClient();
    if (!client) {
      setPosts(EMPTY_POSTS);
      return;
    }
    client
      .fetch(postsQuery)
      .then((res) => {
        if (cancelled) return;
        setPosts((res as BlogIndexPost[]) ?? EMPTY_POSTS);
      })
      .catch((e) => {
        if (cancelled) return;
        const status = (e as any)?.statusCode ?? (e as any)?.status ?? null;
        const msg = String((e as any)?.message ?? "");
        if (status === 403 || msg.includes("403")) setCorsBlocked(true);
        setLoadError(e?.message ?? "Failed to load posts");
        setPosts(EMPTY_POSTS);
      });
    return () => {
      cancelled = true;
    };
  }, [posts]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog · Clawleaf AI</title>
        <meta
          name="description"
          content="Insights & research on healthcare AI automation, OCR, voice AI, compliance, and product updates."
        />
        <link rel="canonical" href="https://clawleaf.com/blog" />
      </Helmet>
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Blog</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Insights & Research</h1>
            <p className="text-lg text-muted-foreground max-w-[50ch] mx-auto">The latest in healthcare AI automation, research, and product updates.</p>
          </motion.div>

          {posts === undefined ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-2xl overflow-hidden shadow-card border border-border animate-pulse"
                >
                  <div className="h-40 bg-secondary/50" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-28 bg-secondary/60 rounded" />
                    <div className="h-5 w-4/5 bg-secondary/60 rounded" />
                    <div className="h-4 w-full bg-secondary/50 rounded" />
                    <div className="h-4 w-3/4 bg-secondary/50 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {loadError ? (
            <p className="text-sm text-destructive mt-6 text-center">
              Couldn’t load blog posts. {loadError} — try refreshing.
            </p>
          ) : null}
          {corsBlocked ? (
            <p className="text-sm text-muted-foreground mt-3 text-center">
              This looks like a Sanity <b>CORS</b> block. In Sanity Manage → <b>API</b> → <b>CORS Origins</b>, add{" "}
              <code>http://localhost:8080</code> (and whichever port Vite is running on), then refresh.
            </p>
          ) : null}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(posts ?? []).map((post, i) => (
              <motion.div
                key={post.slug}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt={post.coverImageAlt ?? ""}
                    className="h-40 w-full object-cover bg-secondary/50"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="h-40 bg-secondary/50" />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {post.tag ? (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {post.tag}
                      </span>
                    ) : null}
                    {post.publishedAt ? (
                      <span className="text-xs text-muted-foreground">
                        {formatPublishedDate(post.publishedAt)}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-base font-semibold mb-3 group-hover:text-primary animate-settle">{post.title}</h3>
                  {post.excerpt ? (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  ) : null}
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          {!getSanityConfig().projectId && posts?.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-8 text-center">
              Blog CMS is not configured yet. Set <code>VITE_SANITY_PROJECT_ID</code> and{" "}
              <code>VITE_SANITY_DATASET</code> in <code>.env</code>.
            </p>
          ) : null}
          {posts?.length === 0 && !loadError ? (
            <p className="text-sm text-muted-foreground mt-8 text-center">
              No posts yet. Create and publish a <code>Post</code> in Sanity Studio.
            </p>
          ) : null}
        </div>
      </section>
      <Footer />
    </div>
  );
}
