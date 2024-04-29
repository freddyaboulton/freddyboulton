<script>
	import PostsList from '$lib/components/PostsList.svelte'
	import Pagination from '$lib/components/Pagination.svelte'
	import { siteDescription } from '$lib/config'

	export let data
</script>


<svelte:head>
	<title>Blog</title>
	<meta data-key="description" name="description" content={siteDescription}>
</svelte:head>

<h1 class="text-secondary flex justify-center mx-auto w-[100%] text-4xl font-bold mb-5 mt-10">Blogs</h1>

<PostsList posts={data.posts} />

<Pagination currentPage={1} totalPosts={data.total} />