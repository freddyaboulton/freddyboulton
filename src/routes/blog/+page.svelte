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
		<span class="font-hand text-xl text-highlight">~</span>
		<svg class="flex-1 h-[6px]" preserveAspectRatio="none" viewBox="0 0 400 6" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 3 Q 40 1, 80 3 Q 120 5, 160 2.5 Q 200 0.5, 240 3 Q 280 5, 320 2 Q 360 0.5, 400 3" stroke="var(--divider)" stroke-width="1.2" fill="none" />
		</svg>
	</div>
	<h1 class="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2 mt-0">Blog</h1>
	<p class="text-lighter">Things I've been learning, building, and thinking about.</p>
</div>

<PostsList posts={data.posts} />

<div class="mt-8">
	<Pagination currentPage={1} totalPosts={data.total} />
</div>
