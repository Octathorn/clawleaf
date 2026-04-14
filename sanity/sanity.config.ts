import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Clawleaf CMS",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

