import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';
import auth from './middleware/auth';
import { mediaSchema, micropubSchema } from './schemas';
import { generateFilename, generateMarkdown } from './markdown';
import { addFile } from './github';
import { generateEditUrl } from './pagescms';
import { generateAltText } from './ai';
import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';
import { serveStatic } from 'hono/bun';

let altTextCache: { [filename: string]: string } = {};

const app = new Hono();

app.use(logger());

app.get('/', auth, async (c) => {
	return c.json({
		'media-endpoint': `${Bun.env.MICROPUB_URL}/media`,
	});
});

app.post('/', auth, zValidator('json', micropubSchema), async (c) => {
	const { properties } = c.req.valid('json');
	const fileContent = await generateMarkdown(properties, altTextCache);
	const filename = generateFilename(properties);
	const response = await addFile(filename, fileContent);
	if (response.status === 201) {
		altTextCache = {};
		c.res.headers.set('Location', generateEditUrl(filename));
		return c.json({}, 202);
	}
	throw new HTTPException(500);
});

app.get('/media/*', serveStatic({ root: './' }));

app.post('/media', auth, zValidator('form', mediaSchema), async (c) => {
	const { file } = c.req.valid('form');
	await Bun.write(`./images/${file.name}`, file);
	const buffer = await file.arrayBuffer();
	const mimeType = (await fileTypeFromBuffer(buffer))?.mime;
	if (
		mimeType === 'image/jpeg' ||
		mimeType === 'image/png' ||
		mimeType === 'image/gif' ||
		mimeType === 'image/webp'
	) {
		const thumbnail = await sharp(buffer).resize(500, null).toBuffer();
		const altText = await generateAltText(thumbnail, mimeType);
		altTextCache[file.name] = altText;
	}
	c.res.headers.set('Location', `https://samwarnick.com/media/${file.name}`);
	return c.json({}, 202);
});

export default app;
