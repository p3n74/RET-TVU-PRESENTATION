# Use a specific Bun version for reproducibility (matches local toolchain).
FROM oven/bun:1.3.2 AS base
WORKDIR /app

# ---- Build stage ----
FROM base AS builder

# Install dependencies first (better layer caching).
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the static site into /app/dist.
COPY . .
RUN bun run build

# ---- Production stage ----
FROM base AS runner
ENV NODE_ENV=production

# Coolify / Cloud Run inject PORT; default to 3002 otherwise.
ENV PORT=3002

WORKDIR /app

# The static server only uses Bun built-ins, so no node_modules are needed —
# copy just the built assets and the server entrypoint.
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/serve.ts ./serve.ts
COPY --from=builder /app/package.json ./package.json

EXPOSE 3002

# Health check: confirm the server responds on the active port.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:'+(process.env.PORT??3002)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Serve the built site.
CMD ["bun", "run", "serve.ts"]
