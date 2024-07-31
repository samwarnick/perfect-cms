import { zValidator } from '@hono/zod-validator';
import { Context, Hono } from 'hono';
import { logger } from 'hono/logger';
import { db } from './db/db';
import { insertMessageSchema, messages } from './db/schema';
import { HTTPException } from 'hono/http-exception';
import auth from './middleware/auth';
import { z } from 'zod';
import titleCase from 'better-title-case';
import { DateTime } from 'luxon';
import * as matter from 'gray-matter';

const app = new Hono();

app.use(logger());
// app.use(auth);

app.get('/', async (c) => {
	return c.html(`<html><head>
    <title>Micropub Endpoint</title>
    <link rel="micropub" href="https://e5a7-207-182-81-24.ngrok-free.app/micropub">
  </head></html>`);
});

app.get('/micropub', auth, async (c) => {
	return c.json({});
});

const micropubSchema = z.object({
	type: z.enum(['h-entry']).array().length(1),
	properties: z.object({
		name: z.string().array().length(1),
		content: z.string().array().length(1),
		'post-status': z.enum(['draft']).array().length(1),
	}),
});
type Micropub = z.infer<typeof micropubSchema>;

app.post('/micropub', auth, zValidator('json', micropubSchema), async (c) => {
	const { properties } = c.req.valid('json');
	const fileContent = await generateMarkdown(properties);
	console.log(fileContent);
	return c.json({}, 202);
});

async function generateMarkdown(properties: Micropub['properties']) {
	const data = await generateFrontmatterData(properties);
	console.log(data);
	return matter.stringify(properties.content[0], data);
}

async function generateFrontmatterData(properties: Micropub['properties']) {
	const title = titleCase(properties.name[0]);
	const date = DateTime.now()
		.setZone('America/New_York')
		.toFormat("yyyy-MM-dd'T'T");
	return {
		title,
		date,
		summary: '',
		tags: [],
		published: false,
	};
}

app.post('/media', auth, async (c) => {
	throw new HTTPException(500);
});

export default app;
