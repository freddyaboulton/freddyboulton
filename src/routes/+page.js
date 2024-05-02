import { error } from '@sveltejs/kit'

export const load = async ({url, fetch}) => {
	try {

		const page_markdown = await import(`./page.md`)

		const postRes = await fetch(`${url.origin}/api/posts.json`)
		const posts = await postRes.json()
		
		return {
			posts,
			page_markdown: page_markdown.default
		}
	}
	catch(err) {
		error(500, err);
	}
}
