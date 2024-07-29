import { db } from './db';
import { messages } from './schema';

await db.insert(messages).values([
	{
		message: 'First!',
	},
	{
		message: 'Hello there!',
	},
]);
