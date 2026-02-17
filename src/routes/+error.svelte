<script>
	import { page } from '$app/stores'
</script>

<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
	<h2 class="text-6xl font-bold text-highlight mb-4">{$page.status}</h2>
	<p class="text-xl text-lighter mb-8">{$page.error.message}</p>
	<p class="text-secondary mb-6"><strong>Sorry!</strong> Maybe try one of these links?</p>
	<div class="flex gap-4">
		<a href="/" class="px-6 py-3 bg-highlight text-white font-semibold rounded-lg hover:bg-highlight/90 transition-colors no-underline">Home</a>
		<a href="/blog" class="px-6 py-3 bg-surface text-secondary font-semibold rounded-lg border border-divider hover:border-highlight/30 transition-colors no-underline">Blog</a>
	</div>
</div>
