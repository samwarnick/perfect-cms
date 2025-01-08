FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/src src
COPY --from=prerelease /usr/src/app/package.json .

ENV MICROPUB_URL=${MICROPUB_URL}
ENV MICROPUB_TOKEN=${MICROPUB_TOKEN}
ENV ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
ENV GITHUB_OWNER=${GITHUB_OWNER}
ENV GITHUB_REPO=${GITHUB_REPO}
ENV GITHUB_ACCESS_TOKEN=${GITHUB_ACCESS_TOKEN}
ENV CONTENT_PATH=${CONTENT_PATH}

USER bun
RUN mkdir -p /usr/src/app/media
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]

LABEL org.opencontainers.image.source https://github.com/samwarnick/perfect-cms
