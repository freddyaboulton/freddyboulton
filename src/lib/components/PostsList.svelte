<script>
	export let posts = []
	console.log(posts,"sdasds")
</script>


<ul>
	{#each posts as post}
	<li class="gap-4 justify-between py-6 flex-col md:flex-row" >
				<h1 class="text-2xl font-bold text-secondary">
					<a href="/blog/{post.slug}">
						{post.title}
					</a>
				</h1>
				<p class="text-sm text-lighter font-medium py-2" >{post.date}</p>
				<p class="text-lg text-lighter py-2" >{post.excerpt}</p>


			<!--
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
			</article> -->

			
		</li>
	{/each}
</ul>