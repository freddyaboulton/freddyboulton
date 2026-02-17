<script>
	import { onMount } from 'svelte';
	import { inview } from '$lib/actions/inview.js';

	export let target;
	export let suffix = '';
	export let label = '';

	let displayValue = 0;
	let started = false;

	function animateCount() {
		if (started) return;
		started = true;

		const duration = 2000;
		const startTime = performance.now();
		const isDecimal = String(target).includes('.');

		function update(currentTime) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);

			if (isDecimal) {
				displayValue = parseFloat((eased * target).toFixed(1));
			} else {
				displayValue = Math.floor(eased * target);
			}

			if (progress < 1) {
				requestAnimationFrame(update);
			} else {
				displayValue = target;
			}
		}

		requestAnimationFrame(update);
	}
</script>

<div
	class="text-center"
	use:inview={{ threshold: 0.5 }}
	on:inview={animateCount}
>
	<div class="text-4xl md:text-5xl font-bold gradient-text">
		{displayValue}{suffix}
	</div>
	<div class="text-lighter text-sm mt-2 uppercase tracking-wider">
		{label}
	</div>
</div>
