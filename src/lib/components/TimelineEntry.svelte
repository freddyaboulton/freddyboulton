<script>
	import { inview } from '$lib/actions/inview.js';

	export let company;
	export let role;
	export let period;
	export let bullets = [];
	export let isLast = false;
</script>

<div
	class="relative pl-8 pb-10 animate-on-scroll"
	class:pb-0={isLast}
	use:inview
>
	<!-- Timeline dot — hand-drawn circle -->
	<svg class="absolute left-0 top-1 w-4 h-4 z-10" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<path d="M8 1.5 Q 13 1, 14.5 6 Q 16 11, 10 14 Q 5 16, 2 11 Q -0.5 6, 4 2.5 Q 6 1, 8 1.5 Z" fill="var(--highlight)" />
	</svg>

	<!-- Connecting line — hand-drawn wobbly vertical -->
	{#if !isLast}
		<svg class="absolute left-[5px] top-5 bottom-0 w-[6px] h-full" preserveAspectRatio="none" viewBox="0 0 6 100" xmlns="http://www.w3.org/2000/svg">
			<path d="M3 0 Q 1 20, 3.5 40 Q 5.5 60, 2.5 80 Q 1 90, 3 100" stroke="var(--divider)" stroke-width="1.2" fill="none" />
		</svg>
	{/if}

	<!-- Content -->
	<div class="bg-surface rounded-xl p-6 border border-divider shadow-sm hover:shadow-md transition-all duration-300">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
			<h3 class="text-xl font-serif font-bold text-secondary m-0">{company}</h3>
			<span class="font-hand text-lg text-lighter">{period}</span>
		</div>
		<p class="text-highlight font-medium mb-3 mt-1">{role}</p>
		{#if bullets.length > 0}
			<ul class="space-y-1.5 text-lighter list-none p-0 m-0 text-sm leading-relaxed">
				{#each bullets as bullet}
					<li class="flex items-start gap-2">
						<span class="text-highlight mt-0.5 shrink-0">&#8250;</span>
						<span>{bullet}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
