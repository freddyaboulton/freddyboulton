<script>
	import MainNav from "./MainNav.svelte";
	import HamburgerMenuButton from "./HamburgerMenuButton.svelte";
	import { siteTitle } from "$lib/config";
  
	const focusMain = () => {
	  const main = document.querySelector("main");
	  main.focus();
	};
  </script>
  
  <header class="bg-secondary">
	<div
	  class="w-full mx-auto max-w-screen-2xl p-4 flex items-center justify-between"
	>
	  <a
		on:click|preventDefault={focusMain}
		class="text-accent text-sm sm:text-base md:text-lg"
		href="#main"
	  >
		Skip to main content
	  </a>
  
	  <a href="/" class="text-accent font-bold text-sm sm:text-base md:text-xl">
		{siteTitle}
	  </a>
	  <MainNav />
	</div>
  </header>