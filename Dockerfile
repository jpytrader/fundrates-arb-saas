# 🌟 Use the official Bun Alpine image which is public and downloads instantly everywhere
FROM oven/bun:alpine
WORKDIR /app

# 🌟 Install Git, Bash, and the missing system library compatibility wrappers needed by Supabase
RUN apk add --no-cache git bash libc6-compat

COPY README.md package*.json bun.lock* .npmrc ./
RUN bun install --production --no-frozen-lockfile
COPY dist/ ./dist/

# Explicitly copy ONLY what the Supabase CLI needs to deploy schemas & functions
COPY migrations/ ./migrations/
COPY edge-functions/ ./edge-functions/

# 🌟 Install the exact stable Supabase CLI binary package natively via Bun
# RUN bun add supabase@2.108.0

# Inject the production orchestration entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
# Run the application utilizing bun execution parameters
CMD ["bun", "run", "dist/index.js"] 
