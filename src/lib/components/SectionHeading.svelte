<script>
	import { inview } from '$lib/actions/inview.js';

	export let id;
	export let title;
	export let subtitle = '';
	export let number = '';
</script>

<div class="mb-10 animate-on-scroll" {id} use:inview>
	{#if number}
		<div class="flex items-center gap-3 mb-4">
			<span class="font-hand text-xl text-highlight">{number}</span>
			<svg class="flex-1 h-[6px]" preserveAspectRatio="none" viewBox="0 0 400 6" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 3 Q 40 1, 80 3 Q 120 5, 160 2.5 Q 200 0.5, 240 3 Q 280 5, 320 2 Q 360 0.5, 400 3" stroke="var(--divider)" stroke-width="1.2" fill="none" />
			</svg>
		</div>
	{/if}
	<h2 class="text-3xl md:text-4xl font-serif font-bold text-secondary m-0 mb-2">{title}</h2>
	{#if subtitle}
		<p class="text-lighter mt-1 mb-0 max-w-xl">{subtitle}</p>
	{/if}
</div>
