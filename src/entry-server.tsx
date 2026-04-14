import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import type { InitialData } from "./ssr/initialData";

export async function render(url: string, initialData: InitialData) {
  const helmetContext: Record<string, unknown> = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );

  const helmet = (helmetContext as any).helmet;
  const headTags = [
    helmet?.title?.toString?.() ?? "",
    helmet?.priority?.toString?.() ?? "",
    helmet?.meta?.toString?.() ?? "",
    helmet?.link?.toString?.() ?? "",
    helmet?.script?.toString?.() ?? "",
  ].join("");

  const serialized = JSON.stringify(initialData).replace(/</g, "\\u003c");
  const initialDataHtml = `<script>window.__INITIAL_DATA__=${serialized}</script>`;

  return { appHtml, headTags, initialDataHtml };
}

