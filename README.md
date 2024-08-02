To install dependencies:

```sh
bun install
```

To setup database:

```sh
bun db:setup
```

To run:

```sh
bun run dev
```

open http://localhost:3000

```sh
docker build --pull --platform linux/amd64 -t ghcr.io/samwarnick/perfect-cms .
docker push ghcr.io/samwarnick/perfect-cms:latest
```
