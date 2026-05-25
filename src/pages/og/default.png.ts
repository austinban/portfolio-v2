import type { APIRoute } from "astro";
import { defaultOgImage } from "../../lib/og";

export const GET: APIRoute = async () => {
  const png = await defaultOgImage();
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
