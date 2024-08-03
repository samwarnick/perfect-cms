This is a lightweight [Micropub](https://indieweb.org/Micropub) server built with [Hono](https://hono.dev) and [Bun](https://bun.sh).

It does not fully implement the Micropub spec and is only tested with iA Writer. Built specifically for me and my [blog](https://samwarnick.com).

```sh
bun install
bun dev
```

open http://localhost:3000

```sh
docker build --pull --platform linux/amd64 -t ghcr.io/samwarnick/perfect-cms .
docker push ghcr.io/samwarnick/perfect-cms:latest
```
