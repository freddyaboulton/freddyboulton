<script>
	import { navItems } from "$lib/config";
	import NavItem from "./NavItem.svelte";
  </script>
  
  <ul class="no-bullets flex w-[200px] text-secondary flex-col md:flex-row">
	{#each navItems as page}
	  <NavItem href={page.route}>
		{page.title}
	  </NavItem>
	{/each}
  </ul>