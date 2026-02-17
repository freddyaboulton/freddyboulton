<script>
	import { navItems } from "$lib/config";
	import NavItem from "./NavItem.svelte";
</script>

<ul class="no-bullets flex w-auto text-secondary flex-col md:flex-row md:gap-1">
	{#each navItems as page}
		<NavItem href={page.route}>
			{page.title}
		</NavItem>
	{/each}
</ul>
