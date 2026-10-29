import { createFileRoute } from "@tanstack/react-router";
import { getFeed } from "@/lib/intel/aggregate.server";

export const Route = createFileRoute("/api/feed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const force = new URL(request.url).searchParams.get("fresh") === "1";
        try {
          const feed = await getFeed(force);
          return Response.json(feed, {
            headers: {
              "cache-control": "public, max-age=8, s-maxage=12, stale-while-revalidate=40",
            },
          });
        } catch {
          return Response.json({ error: "strumień niedostępny" }, { status: 502 });
        }
      },
    },
  },
});
