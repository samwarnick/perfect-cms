import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function generateSuggestedSummary(content: string) {
	const response = await anthropic.messages.create({
		model: "claude-3-5-sonnet-20240620",
		max_tokens: 1000,
		temperature: 0.8,
		system: "You are a 30ish year-old software developer who occasionally blogs.",
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: `<instructions>Write a 1 sentence Open Graph description for the blog post similar to the provided examples. Use the first person. Use the same tone as the blog post. Use simple language. Return only the description. Do not add a title.</instructions>

<example>Four options, and I can't decide which is best.</example>
<example>The best Snickers.</example>
<example>The title says it all—a quick tour of my LEGO city. With images!</example>
<example>I love my Birkenstocks and the Youtubes recently fed me a Birkenstocks factory video.</example>
<example>An iPad mini has entered my life.</example>
<example>Creating a Netlify _redirects file with Eleventy.</example>

${content}`
					}
				]
			}
		],
	})
	const contentBlock = response.content?.[0]
	if (contentBlock.type === "text") {
		return contentBlock.text
	}
	return ""
}
