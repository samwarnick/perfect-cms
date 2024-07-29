import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { db } from './db/db';
import { insertMessageSchema, messages } from './db/schema';

const app = new Hono();

app.use(logger());

app.post('/', zValidator('form', insertMessageSchema), async (c) => {
	const newMessage = c.req.valid('form');
	await db.insert(messages).values({ message: newMessage.message });
	return c.html(<li>{newMessage.message}</li>);
});

export default app;
