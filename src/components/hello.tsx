import type { FC } from "hono/jsx";

export const Hello: FC = () => {
	return <h1>Hello, {Bun.env.NAME}</h1>;
};
