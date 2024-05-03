import { error } from '@sveltejs/kit'

export const load = async ({url, fetch}) => {
	try {

		const postRes = await fetch(`${url.origin}/api/posts.json`)
		const posts = await postRes.json()
		
		return {
			posts,
 		}
	}
	catch(err) {
		error(500, err);
	}
}
