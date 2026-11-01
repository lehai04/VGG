FROM node:26.12.1-bookworm-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
RUN npm ci
COPY frontend frontend
COPY backend backend
COPY deploy/handover deploy/handover
# Change only the disposable build copy; keep the developer checkout unchanged.
RUN node deploy/handover/prepare-build.mjs
ENV PUBLIC_APP_URL=https://sdh.vlu.edu.vn VGG_DEMO_NEWS=false VGG_DEMO_RESOURCES=false NEXT_TELEMETRY_DISABLED=1
RUN DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build npm run build
RUN ./node_modules/.bin/esbuild backend/prisma/seed-public.ts --bundle --platform=node --format=esm --packages=external --outfile=backend/dist/seed-public.mjs
RUN npm prune --omit=dev
RUN mkdir -p /release/fe/frontend/.next /release/be/backend /out && \
    cp -a frontend/.next/standalone/. /release/fe/ && \
    cp -a frontend/.next/static /release/fe/frontend/.next/ && \
    cp -a frontend/public /release/fe/frontend/ && \
    cp -a backend/dist /release/be/backend/ && \
    cp backend/package.json /release/be/backend/ && \
    cp -a node_modules /release/be/ && \
    rm -f /release/be/node_modules/@vgg/backend /release/be/node_modules/@vgg/frontend && \
    find /release -name '*.map' -delete && \
    tar -czf /out/fe-linux-amd64.tar.gz -C /release/fe . && \
    tar -czf /out/be-linux-amd64.tar.gz -C /release/be . && \
    cd /out && sha256sum *.tar.gz > SHA256SUMS
FROM scratch AS export
COPY --from=build /out/ /
