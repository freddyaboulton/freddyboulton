<script>
	import { inview } from '$lib/actions/inview.js';

	export let title;
	export let description;
	export let stat = '';
	export let link = '';
	export let color = 'highlight';

	const colorMap = {
		highlight: 'var(--highlight)',
		green: 'var(--green)',
		amber: 'var(--amber)',
	};

	$: strokeColor = colorMap[color] || colorMap.highlight;
</script>

<a
	href={link}
	target="_blank"
	rel="noopener noreferrer"
	class="block bg-surface rounded-xl p-6 border border-divider hover:shadow-lg transition-all duration-300 hover:-translate-y-1 no-underline group animate-on-scroll"
	use:inview
>
	<!-- Hand-drawn accent bar -->
	<svg class="w-12 h-[6px] mb-4" viewBox="0 0 48 6" xmlns="http://www.w3.org/2000/svg">
		<path d="M0 3 Q 8 1, 16 3.5 Q 24 5, 32 2 Q 40 0.5, 48 3" stroke={strokeColor} stroke-width="2.5" fill="none" stroke-linecap="round" />
	</svg>
	<h3 class="text-lg font-serif font-bold text-secondary m-0 mb-2 group-hover:text-highlight transition-colors">{title}</h3>
	<p class="text-lighter text-sm mb-3 mt-0 leading-relaxed">{description}</p>
	{#if stat}
		<span class="font-hand text-base text-lighter">{stat}</span>
	{/if}
</a>
