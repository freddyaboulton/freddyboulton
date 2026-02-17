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
	<div class="flex items-center gap-3 mb-4">
		<span class="font-mono text-sm text-lighter">~</span>
		<div class="h-px flex-1 bg-divider"></div>
	</div>
	<h1 class="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2 mt-0">Blog</h1>
	<p class="text-lighter">Things I've been learning, building, and thinking about.</p>
</div>

<PostsList posts={data.posts} />

<div class="mt-8">
	<Pagination currentPage={1} totalPosts={data.total} />
</div>
