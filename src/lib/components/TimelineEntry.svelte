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
	<!-- Timeline dot -->
	<div class="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-highlight border-2 border-primary z-10"></div>

	<!-- Connecting line -->
	{#if !isLast}
		<div class="absolute left-[6px] top-5 bottom-0 w-[1px] bg-divider"></div>
	{/if}

	<!-- Content -->
	<div class="bg-surface rounded-xl p-6 border border-divider shadow-sm hover:shadow-md transition-all duration-300">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
			<h3 class="text-xl font-serif font-bold text-secondary m-0">{company}</h3>
			<span class="text-lighter text-sm">{period}</span>
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
