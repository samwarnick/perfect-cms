import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { Hello } from "./components/hello";
import { db } from "./db/db";
import { insertMessageSchema, messages } from "./db/schema";
import { Layout } from "./layout";

const app = new Hono();

app.use(logger());

app.use(
	"/assets/*",
	serveStatic({
		root: "./",
		rewriteRequestPath: (path) => path.replace(/^\/assets/, "/src/assets"),
	}),
);

app.get("/", async (c) => {
	const allMessages = await db.select().from(messages);
	return c.html(
		<Layout>
			<Hello />
			<ul id="messages">
				{allMessages.map((m) => (
					<li>{m.message}</li>
				))}
			</ul>
			<form hx-post="/" hx-swap="beforeend" hx-target="#messages">
				<fieldset role="group">
					<input
						name="message"
						type="message"
						placeholder="Enter your message"
					/>
					<input type="submit" value="Submit" />
				</fieldset>
			</form>
		</Layout>,
	);
});

app.post("/", zValidator("form", insertMessageSchema), async (c) => {
	const newMessage = c.req.valid("form");
	await db.insert(messages).values({ message: newMessage.message });
	return c.html(<li>{newMessage.message}</li>);
});

export default app;
