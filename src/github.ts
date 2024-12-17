import { Octokit } from '@octokit/rest';
import { encode } from './utils/base64';

const octokit = new Octokit({ auth: Bun.env.GITHUB_ACCESS_TOKEN });

export function addFile(name: string, content: string) {
	return octokit.repos.createOrUpdateFileContents({
		owner: Bun.env.GITHUB_OWNER,
		repo: Bun.env.GITHUB_REPO,
		path: name,
		content: encode(content),
		message: `Add ${name}\n\n[skip ci]`,
	});
}

export function check() {
	return octokit.repos.get({
		owner: Bun.env.GITHUB_OWNER,
		repo: Bun.env.GITHUB_REPO
	})
}
