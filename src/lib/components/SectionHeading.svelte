<script>
	import { inview } from '$lib/actions/inview.js';

	export let id;
	export let title;
</script>

<div class="mb-10 animate-on-scroll" {id} use:inview>
	<h2 class="text-3xl md:text-4xl font-bold text-secondary m-0 mb-3">{title}</h2>
	<div class="h-1 w-16 rounded bg-gradient-to-r from-highlight via-warning to-electric"></div>
</div>
