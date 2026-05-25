import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { workOgImage } from "../../../lib/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("work");
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: {
      title: entry.data.title,
      description: entry.data.description,
      role: entry.data.role,
      tags: entry.data.tags,
      year: entry.data.year,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await workOgImage(props as any);
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
