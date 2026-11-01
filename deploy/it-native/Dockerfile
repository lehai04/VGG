FROM node:26.12.1-bookworm-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
COPY cms/package.json cms/package.json
RUN npm ci
COPY frontend frontend
COPY backend backend
COPY cms cms
COPY shared shared
COPY deploy/it-native deploy/it-native
RUN node deploy/it-native/prepare-build.mjs
ENV NEXT_PUBLIC_CMS_BASE_PATH=/cms NEXT_PUBLIC_WEBSITE_URL=https://sdh.vlu.edu.vn/vi PUBLIC_APP_URL=https://sdh.vlu.edu.vn SITE_INDEXABLE=true VGG_DEMO_NEWS=false VGG_DEMO_RESOURCES=false
RUN DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build npm run build
RUN npm run test --workspace=frontend && node --test deploy/it-native/tests/*.test.mjs
# Keep the locked dependencies including Prisma CLI for offline migrations.
RUN mkdir -p /release/backend /release/frontend/.next /release/cms/.next /out && \
    cp -a frontend/.next/standalone/. /release/ && \
    cp -a cms/.next/standalone/. /release/ && \
    cp -a frontend/.next/static /release/frontend/.next/ && \
    cp -a frontend/public /release/frontend/ && \
    cp -a cms/.next/static /release/cms/.next/ && \
    cp -a cms/public /release/cms/ && \
    cp -a backend/dist backend/prisma backend/scripts backend/prisma.config.ts backend/package.json /release/backend/ && \
    cp package-lock.json /release/backend/package-lock.json && \
    cp backend/package.json /release/backend/runtime-package.json && \
    cp -a node_modules/. /release/node_modules/ && \
    ln -s ../node_modules /release/backend/node_modules && \
    test -f /release/frontend/server.js && test -f /release/cms/server.js && \
    test -f /release/backend/dist/server.js && \
    test -f /release/node_modules/.prisma/client/schema.prisma && \
    NODE_ENV=production DATABASE_URL=postgresql://build:build@127.0.0.1:1/build CMS_APP_URL=https://sdh.vlu.edu.vn/cms node /release/backend/scripts/check-runtime.mjs backend && \
    NODE_ENV=production CMS_APP_URL=https://sdh.vlu.edu.vn/cms BACKEND_INTERNAL_URL=http://127.0.0.1:4000 node /release/backend/scripts/check-runtime.mjs cms && \
    cp -a deploy/it-native /out/configuration && \
    tar -czf /out/release-linux-amd64.tar.gz -C /release . && \
    cd /out && sha256sum release-linux-amd64.tar.gz > SHA256SUMS
FROM scratch AS export
COPY --from=build /out/ /
