import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';
import auth from './middleware/auth';
import { micropubSchema } from './schemas';
import { generateFilename, generateMarkdown } from './markdown';
import { addFile } from './github';
import { generateEditUrl } from './pagescms';

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

app.post('/micropub', auth, zValidator('json', micropubSchema), async (c) => {
	const { properties } = c.req.valid('json');
	const fileContent = await generateMarkdown(properties);
	const filename = generateFilename(properties);
	const response = await addFile(filename, fileContent);
	if (response.status === 201) {
		c.res.headers.set('Location', generateEditUrl(filename));
		return c.json({}, 202);
	}
	throw new HTTPException(500);
});

app.post('/media', auth, async (c) => {
	throw new HTTPException(500);
});

export default app;
