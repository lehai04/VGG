FROM node:26.12.1-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
COPY cms/package.json cms/package.json
RUN npm ci --ignore-scripts

FROM deps AS source
COPY frontend frontend
COPY backend/src/modules/content backend/src/modules/content
COPY shared shared
COPY deploy/static-web/prepare.mjs /prepare.mjs
ENV NEXT_TELEMETRY_DISABLED=1 PUBLIC_APP_URL=https://sdh.vlu.edu.vn SITE_INDEXABLE=true VGG_DEMO_NEWS=true VGG_DEMO_RESOURCES=true

FROM source AS vi
RUN node /prepare.mjs vi && npm run build --workspace=frontend
FROM source AS en
RUN node /prepare.mjs en && npm run build --workspace=frontend
FROM scratch AS export
COPY deploy/static-web/index.html /web/index.html
COPY --from=vi /app/frontend/out/ /web/
COPY --from=en /app/frontend/out/en/ /web/en/
COPY --from=en /app/frontend/out/_next/ /web/_next/
