<script>
	import { navItems } from "$lib/config";
	import NavItem from "./NavItem.svelte";
  </script>
  
  <ul class="flex justify-between w-[200px] text-secondary  flex-col md:flex-row">
	{#each navItems as page}
	  <NavItem href={page.route}>
		{page.title}
	  </NavItem>
	{/each}
  </ul>