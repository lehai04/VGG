FROM node:26.12.1-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS build
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY cms/package.json cms/package.json
COPY backend/package.json backend/package.json
RUN npm ci
COPY shared shared
COPY frontend frontend
COPY cms cms
COPY backend backend
ARG NEXT_PUBLIC_WEBSITE_URL
ENV NEXT_PUBLIC_WEBSITE_URL=$NEXT_PUBLIC_WEBSITE_URL
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npm run build

# One-shot migration/interactive staff tools; never publish this service.
FROM build AS tools
ENV NODE_ENV=production
USER node
CMD ["npm", "run", "db:deploy"]

FROM build AS production-deps
RUN npm prune --omit=dev --ignore-scripts

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/backend/package.json ./backend/package.json
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/backend/scripts ./backend/scripts
COPY --from=build /app/frontend/package.json /app/frontend/next.config.ts ./frontend/
COPY --from=build --chown=node:node /app/frontend/.next ./frontend/.next
COPY --from=build /app/frontend/public ./frontend/public
COPY --from=build /app/cms/public ./cms/public
COPY --from=build /app/cms/package.json /app/cms/next.config.ts ./cms/
COPY --from=build --chown=node:node /app/cms/.next ./cms/.next
USER node
CMD ["npm", "run", "start:backend"]
