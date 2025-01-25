export function generateEditUrl(filename: string) {
	return `https://app.pagescms.org/${Bun.env.GITHUB_OWNER}/${Bun.env.GITHUB_REPO}/main/collection/posts/edit/${encodeURIComponent(filename)}`;
}
