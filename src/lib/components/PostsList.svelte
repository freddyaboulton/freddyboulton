<script>
	export let posts = []
</script>


<ul>
	{#each posts as post}
		<li class="mb-10 ">
			<article>
				<a href="/blog/{post.slug}">
					<img
					src={post.coverImage}
					alt=""
					width={post.coverWidth}
					height={post.coverHeight}
					style="ratio: {post.coverWidth} / {post.coverHeight}"
					class="rounded-lg w-[100%] mb-3"
					/>
					<h2 class="text-xl font-bold text-primary">
						{post.title}
					</h2>
				</a>
			</article>

			<p class="text-sm text-lighter font-medium" >{post.excerpt}</p>
		</li>
	{/each}
</ul>