import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import groq from "groq";
import { getSanityClient, getSanityConfig } from "@/lib/sanity";
import { TextReveal } from "@/components/site/TextReveal";
import { Reveal, fadeUp } from "@/components/site/primitives";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { PostCover, gradientForTag } from "@/components/site/PostCover";

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
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "2-digit" }).format(
    new Date(iso),
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogIndexPost[] | undefined>(undefined);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [corsBlocked, setCorsBlocked] = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [subscribed, setSubscribed] = useState(false);

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

  // Category chips derived from the posts' own tags (only shown when tags exist).
  const categories = useMemo(() => {
    const tags = Array.from(new Set((posts ?? []).map((p) => p.tag).filter(Boolean) as string[]));
    return tags.length > 1 ? ["All", ...tags] : [];
  }, [posts]);

  const list = posts ?? [];
  const filtered = activeCat === "All" ? list : list.filter((p) => p.tag === activeCat);
  const [featured, ...rest] = filtered;

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  const loading = posts === undefined;

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

      <section className="noise relative overflow-hidden pt-36 pb-14 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid mask-fade-edges opacity-60" />
          <div className="aurora left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 bg-primary/20" />
        </div>

        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow eyebrow-dot justify-center">Blog</span>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              <TextReveal text="Insights & Research" />
            </h1>
            <motion.p
              className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The latest in healthcare AI automation, research, and product updates.
            </motion.p>
          </div>

          {categories.length ? (
            <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`rounded-full border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider transition-all duration-300 ${
                    activeCat === c
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="section-padding !pt-0">
        <div className="container-wide">
          {/* Loading skeletons */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[hsl(var(--card))]">
                  <div className="h-44 animate-pulse bg-white/[0.04]" />
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-24 animate-pulse rounded bg-white/[0.06]" />
                    <div className="h-5 w-4/5 animate-pulse rounded bg-white/[0.06]" />
                    <div className="h-4 w-full animate-pulse rounded bg-white/[0.04]" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-white/[0.04]" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Featured */}
          {!loading && featured ? (
            <Reveal>
              <Link
                to={`/blog/${featured.slug}`}
                className="border-gradient group grid overflow-hidden rounded-3xl border border-white/[0.08] bg-[hsl(var(--card))] transition-all duration-500 hover:-translate-y-1 hover:shadow-glow lg:grid-cols-2"
              >
                {featured.coverImageUrl ? (
                  <div className="relative h-64 overflow-hidden lg:h-full lg:min-h-[22rem]">
                    <img
                      src={featured.coverImageUrl}
                      alt={featured.coverImageAlt ?? ""}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <PostCover
                    tag={featured.tag ?? "Article"}
                    {...gradientForTag(featured.tag)}
                    large
                    className="h-64 w-full lg:h-full lg:min-h-[22rem]"
                  />
                )}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">Featured</span>
                    {featured.tag ? (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground">
                        {featured.tag}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {featured.title}
                  </h2>
                  {featured.excerpt ? (
                    <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                  ) : null}
                  {featured.publishedAt ? (
                    <p className="mt-6 text-sm text-muted-foreground">{formatPublishedDate(featured.publishedAt)}</p>
                  ) : null}
                  <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary">
                    Read article{" "}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ) : null}

          {/* Grid */}
          {!loading && rest.length ? (
            <motion.div
              className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {rest.map((post) => (
                <motion.div key={post._id} variants={fadeUp}>
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <SpotlightCard className="flex h-full flex-col overflow-hidden">
                      {post.coverImageUrl ? (
                        <div className="h-44 overflow-hidden">
                          <img
                            src={post.coverImageUrl}
                            alt={post.coverImageAlt ?? ""}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <PostCover tag={post.tag ?? "Article"} {...gradientForTag(post.tag)} className="h-44 w-full" />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        {post.tag ? (
                          <span className="mb-3 w-fit rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-primary">
                            {post.tag}
                          </span>
                        ) : null}
                        <h3 className="font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                        {post.excerpt ? (
                          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>
                        ) : null}
                        {post.publishedAt ? (
                          <div className="mt-5 border-t border-white/[0.06] pt-4 text-xs text-muted-foreground">
                            {formatPublishedDate(post.publishedAt)}
                          </div>
                        ) : null}
                      </div>
                    </SpotlightCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          {/* Empty / error state */}
          {!loading && !filtered.length ? (
            <div className="mx-auto max-w-lg rounded-3xl border border-white/[0.08] bg-[hsl(var(--card))] p-10 text-center">
              <p className="text-muted-foreground">
                {loadError ? "We couldn't load posts right now — please refresh." : "No articles published yet. Check back soon."}
              </p>
              {corsBlocked ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  If you're the site owner, add this origin to your Sanity CORS settings.
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Newsletter band */}
          {!loading ? (
            <Reveal delay={0.1}>
              <div className="border-gradient relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-[hsl(var(--surface-2))] p-8 sm:p-12">
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-grid opacity-30 mask-fade-edges" />
                  <div className="aurora right-0 top-0 h-64 w-96 bg-primary/20" />
                </div>
                <div className="grid items-center gap-8 lg:grid-cols-2">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                      Get research in your inbox
                    </h3>
                    <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                      New pieces on healthcare AI, agents, and compliance — straight to your inbox. No spam, unsubscribe anytime.
                    </p>
                  </div>
                  <div>
                    {subscribed ? (
                      <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-sm text-emerald-300">
                        <Check size={16} /> You're on the list. We'll be in touch.
                      </div>
                    ) : (
                      <form onSubmit={onSubscribe} className="flex flex-col gap-2.5 sm:flex-row">
                        <input
                          type="email"
                          required
                          placeholder="you@hospital.com"
                          aria-label="Email address"
                          className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                        />
                        <button type="submit" className="btn-primary shrink-0 justify-center">
                          Subscribe <ArrowUpRight size={16} />
                        </button>
                      </form>
                    )}
                    <p className="mt-3 text-center text-xs text-muted-foreground sm:text-left">
                      Prefer to talk?{" "}
                      <Link to="/contact" className="font-medium text-primary">
                        Contact our team
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>
      <Footer />
    </div>
  );
}
