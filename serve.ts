// Minimal, dependency-free static file server for the built Vite site.
// Serves ./dist and listens on PORT (Coolify/Cloud Run inject this) or 3002.
// Uses only Bun built-ins, so the production image needs no node_modules.

const port = Number(process.env.PORT ?? 3002);
const distDir = `${import.meta.dir}/dist`;

const server = Bun.serve({
  port,
  hostname: "0.0.0.0",
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    // Block path traversal outright.
    if (pathname.includes("..")) {
      return new Response("Forbidden", { status: 403 });
    }
    if (pathname.endsWith("/")) pathname += "index.html";

    let file = Bun.file(`${distDir}${pathname}`);
    if (!(await file.exists())) {
      // Single-page fallback to index.html.
      file = Bun.file(`${distDir}/index.html`);
      if (!(await file.exists())) {
        return new Response("Not Found", { status: 404 });
      }
    }

    const headers: Record<string, string> = {};
    // Vite emits content-hashed assets, so they can be cached forever.
    if (pathname.startsWith("/assets/")) {
      headers["Cache-Control"] = "public, max-age=31536000, immutable";
    }
    return new Response(file, { headers });
  },
});

console.log(`Presentation serving on http://${server.hostname}:${server.port}`);
