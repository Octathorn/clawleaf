import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { PortableText } from "@portabletext/react";
import { useEffect, useMemo, useState } from "react";
import groq from "groq";
import { getSanityClient, getSanityConfig } from "@/lib/sanity";

type BlogPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  tag?: string;
  publishedAt?: string;
  body?: unknown;
  coverImageUrl?: string;
  coverImageAlt?: string;
};

const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  tag,
  publishedAt,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "alt": alt
    }
  }
}`;

function formatPublishedDate(iso: string) {
  // Must be deterministic across SSR (Node) + client (browser) to avoid hydration mismatches.
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(iso));
}

export default function BlogArticlePage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [corsBlocked, setCorsBlocked] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (!getSanityConfig().projectId) {
      setPost(null);
      return;
    }
    if (post !== undefined && post?.slug === slug) return;
    let cancelled = false;
    setPost(undefined);
    setLoadError(null);
    setCorsBlocked(false);
    const client = getSanityClient();
    if (!client) {
      setPost(null);
      return;
    }
    client
      .fetch(postBySlugQuery, { slug })
      .then((res) => {
        if (cancelled) return;
        setPost((res as BlogPost) ?? null);
      })
      .catch((e) => {
        if (cancelled) return;
        const status = (e as any)?.statusCode ?? (e as any)?.status ?? null;
        const msg = String((e as any)?.message ?? "");
        if (status === 403 || msg.includes("403")) setCorsBlocked(true);
        setLoadError(e?.message ?? "Failed to load post");
        setPost(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title = post?.title ?? (slug ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Blog");
  const description = post?.excerpt ?? "Read the latest insights from Clawleaf AI.";
  const canonical = slug ? `https://clawleaf.com/blog/${slug}` : "https://clawleaf.com/blog";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title} · Clawleaf AI</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {post?.tag ? (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.tag}</span>
            ) : null}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mt-4 mb-4">{title}</h1>
            {post?.publishedAt ? (
              <p className="text-muted-foreground mb-8">
                Published {formatPublishedDate(post.publishedAt)}
              </p>
            ) : null}

            {post?.coverImageUrl ? (
              <img
                src={post.coverImageUrl}
                alt={post.coverImageAlt ?? ""}
                className="w-full rounded-2xl border border-border shadow-card mb-8 bg-secondary/50"
                loading="eager"
                decoding="async"
              />
            ) : null}
            <div className="prose prose-lg max-w-none">
              {post === undefined ? (
                <p className="text-muted-foreground leading-relaxed">Loading…</p>
              ) : post === null ? (
                <p className="text-muted-foreground leading-relaxed">
                  {!getSanityConfig().projectId ? (
                    <>
                      Blog CMS is not configured yet. Set <code>VITE_SANITY_PROJECT_ID</code> and{" "}
                      <code>VITE_SANITY_DATASET</code> in <code>.env</code>.
                    </>
                  ) : loadError ? (
                    <>Couldn’t load this post. {loadError} — try refreshing.</>
                  ) : (
                    "Post not found."
                  )}
                </p>
              ) : post?.body ? (
                <PortableText
                  value={post.body as any}
                  components={{
                    types: {
                      image: ({ value }: any) => {
                        const src = value?.url;
                        if (!src) return null;
                        return (
                          <figure className="my-8">
                            <img
                              src={src}
                              alt={value?.alt ?? ""}
                              className="w-full rounded-2xl border border-border shadow-card bg-secondary/50"
                              loading="lazy"
                              decoding="async"
                            />
                            {value?.alt ? (
                              <figcaption className="mt-2 text-sm text-muted-foreground">{value.alt}</figcaption>
                            ) : null}
                          </figure>
                        );
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-muted-foreground leading-relaxed">No content yet.</p>
              )}
            </div>
            {corsBlocked ? (
              <p className="text-sm text-muted-foreground mt-6">
                This looks like a Sanity <b>CORS</b> block. In Sanity Manage → <b>API</b> → <b>CORS Origins</b>, add{" "}
                <code>http://localhost:8080</code> (and whichever port Vite is running on), then refresh.
              </p>
            ) : null}
          </motion.article>
        </div>
      </section>
      <Footer />
    </div>
  );
}
