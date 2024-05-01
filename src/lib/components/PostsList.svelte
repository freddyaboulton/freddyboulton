<script>
	export let posts = []
	console.log(posts,"sdasds")
</script>


<ul>
	{#each posts as post}
		<li class="flex items-start gap-4 justify-between border-t border-divider py-6 flex-col md:flex-row" >
			<p class="w-[100%] md:w-[20%]">
				{post.date}
			</p>

			
			<div class="w-[100%] md:w-[50%]">
				<a href="/blog/{post.slug}">
				<h2 class="text-xl font-bold text-secondary">
					{post.title}
				</h2>
				<p class="text-sm text-lighter font-medium" >{post.excerpt}</p></a>
			</div>
			
			<article class="w-[100%] md:w-[30%]">
				<a href="/blog/{post.slug}">
					<img
					src={post.coverImage}
					alt=""
					width={post.coverWidth}
					height={post.coverHeight}
					style="ratio: {post.coverWidth} / {post.coverHeight}"
					class="rounded-lg w-[100%] mb-3"
					/>
				
				</a>
			</article>

			
		</li>
	{/each}
</ul>