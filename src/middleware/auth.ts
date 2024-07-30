import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

const auth = createMiddleware(async (c, next) => {
	const headerToken = c.req.header('Authorization')?.replace('Bearer ', '');
	const bodyToken = (await c.req.parseBody()).access_token as string;
	if (headerToken && bodyToken) {
		throw new HTTPException(400);
	}
	const token = headerToken || bodyToken;
	if (!token) {
		throw new HTTPException(401);
	} else if (token !== Bun.env.TOKEN) {
		throw new HTTPException(401);
	}
	await next();
});

export default auth;
