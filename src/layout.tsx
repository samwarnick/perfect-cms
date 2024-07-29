import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>The Perfect Stack</title>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
				/>
				<link rel="stylesheet" href="/assets/styles.css" />
				<script src="https://unpkg.com/htmx.org@1.9.11" />
				<script
					defer
					src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.8/dist/cdn.min.js"
				/>
			</head>
			<body>
				<main class="container">{props.children}</main>
			</body>
		</html>
	);
};
