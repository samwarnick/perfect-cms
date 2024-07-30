import { zValidator } from '@hono/zod-validator';
import { Context, Hono } from 'hono';
import { logger } from 'hono/logger';
import { db } from './db/db';
import { insertMessageSchema, messages } from './db/schema';
import { HTTPException } from 'hono/http-exception';
import auth from './middleware/auth';

const app = new Hono();

app.use(logger());
app.use(auth);

app.post('/', async (c) => {
	return c.text('Hello', 202);
});

app.post('/media', async (c) => {
	throw new HTTPException(500);
});

export default app;
