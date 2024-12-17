export function generateEditUrl(filename: string) {
	// return `https://app.pagescms.org/${Bun.env.GITHUB_OWNER}/${Bun.env.GITHUB_REPO}/main/content/posts/edit/${encodeURIComponent(filename)}`;
	console.log(`jetbrains://web-storm/navigate/reference?project=${Bun.env.GITHUB_REPO}&path/${encodeURIComponent(filename)}`);
	return `jetbrains://web-storm/navigate/reference?project=${Bun.env.GITHUB_REPO}&path/${encodeURIComponent(filename)}`;
}
