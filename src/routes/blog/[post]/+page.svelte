<script>
	export let data;

	const { title, excerpt, date, updated, coverImage, coverWidth, coverHeight, categories, showCoverImage } =
		data.meta;
	const { PostContent } = data;
</script>

<svelte:head>
	<title>{title}</title>
	<meta data-key="description" name="description" content={excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta name="twitter:description" content={excerpt} />
	<meta property="og:image" content={coverImage ? `https://www.freddyboulton.com${coverImage}` : "https://www.freddyboulton.com/favicon.png" } />
	<meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} />
	<meta name="twitter:image" content={coverImage ? `https://www.freddyboulton.com${coverImage}` : "https://www.freddyboulton.com/favicon.png" } />
</svelte:head>

<!-- Back to blog -->
<a href="/blog" class="inline-flex items-center gap-2 text-lighter hover:text-highlight transition-colors no-underline mb-6 text-sm">
	<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
	</svg>
	Back to blog
</a>

<article class="prose prose-invert max-w-none">
	<h1 class="text-3xl md:text-4xl font-bold text-secondary mb-2 mt-0">{title}</h1>

	<div class="flex items-center gap-4 text-sm text-lighter mb-6">
		<span>Published: {date}</span>
		{#if updated}
			<span>&middot;</span>
			<span>Updated: {updated}</span>
		{/if}
	</div>

	{#if !(showCoverImage === false) && coverImage}
		<img
			src={coverImage}
			alt=""
			style="aspect-ratio: {coverWidth} / {coverHeight};"
			width={coverWidth}
			height={coverHeight}
			class="rounded-xl w-full mb-6"
		/>
	{/if}

	<svelte:component this={PostContent} />

	{#if categories}
		<aside class="mt-10 pt-6 border-t border-divider">
			<h2 class="font-bold text-sm text-secondary m-0 mb-3">Posted in:</h2>
			<div class="flex flex-wrap gap-2">
				{#each categories as category}
					<a
						href="/blog/category/{category}/"
						class="text-xs px-3 py-1 rounded-full bg-surfaceLight text-highlight hover:bg-highlight hover:text-white transition-colors no-underline"
					>
						{category}
					</a>
				{/each}
			</div>
		</aside>
	{/if}
</article>
