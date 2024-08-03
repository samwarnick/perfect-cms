This is a lightweight [Micropub](https://indieweb.org/Micropub) server built with [Hono](https://hono.dev) and [Bun](https://bun.sh).

It is intended for my personal use only, but could be adapted pretty easily 🤷🏻‍♂️. I just wanted to publish to my [blog](https://samwarnick) from iA Writer.

```sh
bun install
bun dev
```

open http://localhost:3000

```sh
docker build --pull --platform linux/amd64 -t ghcr.io/samwarnick/perfect-cms .
docker push ghcr.io/samwarnick/perfect-cms:latest
```
