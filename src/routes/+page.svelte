<script>
	import { siteTitle } from '$lib/config';
	export let data;
</script>

<svelte:head>
	<title>{siteTitle}</title>
</svelte:head>

<article class="prose">
	<svelte:component this={data.page_markdown} posts={data.posts}/>
</article>
