declare module 'bun' {
	interface Env {
		TOKEN: string;
		ANTHROPIC_API_KEY: string;
		GITHUB_OWNER: string;
		GITHUB_REPO: string;
		GITHUB_ACCESS_TOKEN: string;
		CONTENT_PATH: string;
	}
}
