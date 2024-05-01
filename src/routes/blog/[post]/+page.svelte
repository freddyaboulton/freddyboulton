<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
	export let data;

	const { title, excerpt, date, updated, coverImage, coverWidth, coverHeight, categories } =
		data.meta;
	const { PostContent } = data;
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title}</title>
	<meta data-key="description" name="description" content={excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta name="twitter:description" content={excerpt} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} />
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>


<article class="prose">
	<!-- You might want to add an alt frontmatter attribute. If not, leaving alt blank here works, too. -->
	<h1 class="text-3xl font-bold text-secondary mb-1">{title}</h1>

	<img
		src={coverImage}
		alt=""
		style="aspect-ratio: {coverWidth} / {coverHeight};"
		width={coverWidth}
		height={coverHeight}
		class="rounded-lg w-[100%] mb-1 mt-1"
		/>
		<div class="w-[100%] flex items-center gap-2">
			<h3 class="font-bold text-sm m-0">Published:</h3>
			<p class="font-semi text-sm text-lighter m-0">{" "}{date}</p>
		</div>
		<div class="w-[100%] flex items-center mb-3 gap-2">
			<h3 class="font-bold text-sm m-0">Updated:</h3>
			<p class="font-semi text-sm text-lighter m-0">{" "}{updated}</p>
		</div>

	

	<svelte:component this={PostContent} />

	{#if categories}
		<aside class="mb-5 ">
			<h2 class="font-bold text-sm underline">Posted in:</h2>
			<ul class="list-disc pl-4">
				{#each categories as category}
					<li class="font-semibold text-sm text-lighter">
						<a href="/blog/category/{category}/">
							{category}
						</a>
					</li>
				{/each}
			</ul>
		</aside>
	{/if}
</article>
