<script>
	export let posts = []
</script>


<ul class="no-bullets">
	{#each posts as post}
	<li class="justify-between py-4 flex-col md:flex-row" >
		<h2 class="text-2xl font-bold text-secondary">
			<a href="/blog/{post.slug}">
				{post.title}
			</a>
		</h2>
		<p class="text-sm text-lighter py-2 font-medium" >{post.date}</p>
		<p class="text-lg text-lighter" >{post.excerpt}</p>
	</li>
	{/each}
</ul>