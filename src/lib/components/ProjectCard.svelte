<script>
	import { inview } from '$lib/actions/inview.js';

	export let title;
	export let description;
	export let stat = '';
	export let link = '';
	export let color = 'highlight';
</script>

<a
	href={link}
	target="_blank"
	rel="noopener noreferrer"
	class="block bg-surface rounded-xl p-6 border border-divider hover:shadow-lg transition-all duration-300 hover:-translate-y-1 no-underline group animate-on-scroll"
	use:inview
>
	<div class="h-1 w-10 rounded mb-4 {color === 'highlight' ? 'bg-highlight' : color === 'green' ? 'bg-green' : color === 'amber' ? 'bg-amber' : 'bg-highlight'}"></div>
	<h3 class="text-lg font-serif font-bold text-secondary m-0 mb-2 group-hover:text-highlight transition-colors">{title}</h3>
	<p class="text-lighter text-sm mb-3 mt-0 leading-relaxed">{description}</p>
	{#if stat}
		<span class="text-xs font-medium px-3 py-1 rounded-full bg-surfaceLight text-lighter">{stat}</span>
	{/if}
</a>
