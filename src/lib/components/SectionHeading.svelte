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
			<span class="font-mono text-sm text-lighter">{number}</span>
			<div class="h-px flex-1 bg-divider"></div>
		</div>
	{/if}
	<h2 class="text-3xl md:text-4xl font-serif font-bold text-secondary m-0 mb-2">{title}</h2>
	{#if subtitle}
		<p class="text-lighter mt-1 mb-0 max-w-xl">{subtitle}</p>
	{/if}
</div>
