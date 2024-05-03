<script>
	import MainNav from "./MainNav.svelte";
	import { siteTitle } from "$lib/config";
  

  </script>
  
  <header class="sticky top-0 bg-primary z-10 ">
	<div
	  class="w-full mx-auto max-w-screen-2xl p-4 flex items-center justify-between"
	>
  
	  <a href="/" class="text-secondary font-bold text-sm sm:text-base md:text-xl">
		{siteTitle}
	  </a>
	  <MainNav />
	</div>
  </header>