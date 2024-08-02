import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

const auth = createMiddleware(async (c, next) => {
	const headerToken = c.req.header('Authorization')?.replace('Bearer ', '');
	if (headerToken !== Bun.env.MICROPUB_TOKEN) {
		throw new HTTPException(401);
	}
	await next();
});

export default auth;
