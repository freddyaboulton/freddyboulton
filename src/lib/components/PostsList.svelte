<script>
	export let posts = []
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
	{#each posts as post}
		<a
			href="/blog/{post.slug}"
			class="block bg-surface rounded-xl overflow-hidden border border-divider hover:border-highlight/30 hover:-translate-y-1 transition-all no-underline group"
		>
			{#if post.coverImage}
				<img
					src={post.coverImage}
					alt={post.title}
					class="w-full h-48 object-cover"
				/>
			{:else}
				<div class="w-full h-48 bg-gradient-to-br from-highlight/20 to-warning/20"></div>
			{/if}
			<div class="p-5">
				{#if post.categories && post.categories.length > 0}
					<div class="flex flex-wrap gap-2 mb-3">
						{#each post.categories as category}
							<span class="text-xs px-2 py-1 rounded-full bg-surfaceLight text-highlight">{category}</span>
						{/each}
					</div>
				{/if}
				<h2 class="text-xl font-bold text-secondary m-0 mb-2 group-hover:text-highlight transition-colors">
					{post.title}
				</h2>
				<p class="text-sm text-lighter m-0 mb-2">{post.date}</p>
				{#if post.excerpt}
					<p class="text-sm text-lighter m-0 line-clamp-2">{post.excerpt}</p>
				{/if}
			</div>
		</a>
	{/each}
</div>
