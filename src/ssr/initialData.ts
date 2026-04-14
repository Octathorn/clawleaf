export type InitialData =
  | {
      type: "blogIndex";
      posts: Array<{
        _id: string;
        slug: string;
        title: string;
        excerpt?: string;
        publishedAt?: string;
        tag?: string;
      }>;
    }
  | {
      type: "blogPost";
      post: {
        _id: string;
        slug: string;
        title: string;
        excerpt?: string;
        publishedAt?: string;
        tag?: string;
        body?: unknown;
      } | null;
    }
  | null;

declare global {
  interface Window {
    __INITIAL_DATA__?: InitialData;
  }
}

export function readInitialDataFromWindow(): InitialData {
  if (typeof window === "undefined") return null;
  return window.__INITIAL_DATA__ ?? null;
}

