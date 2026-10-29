import { createFileRoute } from "@tanstack/react-router";
import { getDesk } from "@/lib/desk/yahoo.server";

export const Route = createFileRoute("/api/desk")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const force = url.searchParams.get("fresh") === "1";
        const shortId = url.searchParams.get("short") ?? "15m-5d";
        const longId = url.searchParams.get("long") ?? "1d-1y";
        try {
          const desk = await getDesk(shortId, longId, force);
          return Response.json(desk, {
            headers: {
              "cache-control": "public, max-age=20, s-maxage=30, stale-while-revalidate=60",
            },
          });
        } catch {
          return Response.json({ error: "biurko niedostępne" }, { status: 502 });
        }
      },
    },
  },
});
