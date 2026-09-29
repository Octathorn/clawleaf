import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import groq from "groq";
import { getSanityClient, getSanityConfig } from "@/lib/sanity";
import { PostCover, gradientForTag } from "@/components/site/PostCover";

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

type RelatedPost = {
  _id: string;
  slug: string;
  title: string;
  tag?: string;
  coverImageUrl?: string;
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

const relatedQuery = groq`*[_type == "post" && defined(slug.current) && slug.current != $slug] | order(publishedAt desc)[0...3] {
  _id, "slug": slug.current, title, tag, "coverImageUrl": coverImage.asset->url
}`;

function formatPublishedDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "2-digit" }).format(
    new Date(iso),
  );
}

export default function BlogArticlePage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [corsBlocked, setCorsBlocked] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (!getSanityConfig().projectId) {
      setPost(null);
      return;
    }
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
    client
      .fetch(relatedQuery, { slug })
      .then((res) => !cancelled && setRelated(((res as RelatedPost[]) ?? []).filter(Boolean)))
      .catch(() => {
        /* related is optional */
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title =
    post?.title ??
    (slug ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Blog");
  const description = post?.excerpt ?? "Read the latest insights from Clawleaf AI.";
  const canonical = slug ? `https://clawleaf.com/blog/${slug}` : "https://clawleaf.com/blog";

  useEffect(() => {
    document.title = `${title} · Clawleaf AI`;
  }, [title]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Navbar />

      <article className="noise relative overflow-hidden pt-36 section-padding sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid mask-fade-edges opacity-50" />
          <div className="aurora left-1/2 top-0 h-64 w-[34rem] -translate-x-1/2 bg-primary/15" />
        </div>

        <div className="container-wide max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} /> Back to Blog
          </Link>

          <motion.header
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post?.tag ? (
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-primary">
                {post.tag}
              </span>
            ) : null}
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            {post?.publishedAt ? (
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={14} /> {formatPublishedDate(post.publishedAt)}
              </div>
            ) : null}
          </motion.header>

          {/* Cover */}
          {post?.coverImageUrl ? (
            <motion.div
              className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08] shadow-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              <img src={post.coverImageUrl} alt={post.coverImageAlt ?? ""} className="w-full" loading="eager" />
            </motion.div>
          ) : null}

          {/* Body */}
          <div className="mt-10">
            {post === undefined ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 animate-pulse rounded bg-white/[0.05]" style={{ width: `${90 - (i % 3) * 15}%` }} />
                ))}
              </div>
            ) : post === null ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(var(--card))] p-8 text-center">
                <p className="text-muted-foreground">
                  {!getSanityConfig().projectId
                    ? "Blog content isn't available in this environment."
                    : loadError
                    ? "Couldn't load this post — please refresh."
                    : "Post not found."}
                </p>
                {corsBlocked ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    If you're the site owner, add this origin to your Sanity CORS settings.
                  </p>
                ) : null}
                <Link to="/blog" className="btn-secondary mt-5 inline-flex">
                  Browse all articles
                </Link>
              </div>
            ) : post.body ? (
              <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary prose-strong:text-foreground">
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
                              className="w-full rounded-2xl border border-white/[0.08] shadow-card"
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
              </div>
            ) : (
              <p className="text-muted-foreground">No content yet.</p>
            )}
          </div>

          {/* CTA */}
          {post ? (
            <div className="border-gradient relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[hsl(var(--surface-2))] p-8 text-center">
              <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
              <h3 className="font-display text-2xl font-semibold text-foreground">See it work on your data</h3>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Book a demo and watch Clawleaf agents run one of your real workflows end to end.
              </p>
              <Link to="/contact" className="btn-primary mt-6 inline-flex">
                Schedule a Demo <ArrowRight size={16} />
              </Link>
            </div>
          ) : null}
        </div>
      </article>

      {/* Keep reading */}
      {post && related.length ? (
        <section className="section-padding !pt-0">
          <div className="container-wide max-w-5xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-foreground/50">Keep reading</span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p._id} to={`/blog/${p.slug}`} className="group block">
                  <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[hsl(var(--card))] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/15 group-hover:shadow-glow">
                    {p.coverImageUrl ? (
                      <div className="h-32 overflow-hidden">
                        <img src={p.coverImageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </div>
                    ) : (
                      <PostCover tag={p.tag ?? "Article"} {...gradientForTag(p.tag)} className="h-32 w-full" />
                    )}
                    <div className="p-5">
                      <h4 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {p.title}
                      </h4>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  );
}
