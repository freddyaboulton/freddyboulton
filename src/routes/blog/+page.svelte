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

<div class="mb-10 mt-4">
	<h1 class="text-4xl md:text-5xl font-bold text-secondary mb-3 mt-0">Blog</h1>
	<div class="h-1 w-16 rounded bg-gradient-to-r from-highlight via-warning to-electric"></div>
</div>

<PostsList posts={data.posts} />

<div class="mt-8">
	<Pagination currentPage={1} totalPosts={data.total} />
</div>
