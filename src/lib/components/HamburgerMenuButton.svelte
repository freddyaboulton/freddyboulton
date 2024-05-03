<script>
	import { isMenuOpen } from "../assets/js/store";
	import HamburgerSVG from "./svg/HamburgerSVG.svelte";
	import XSVG from "./svg/XSVG.svelte";
  
	export let closeOnly = false;
  
	const toggleIsMenuOpen = () => {
	  isMenuOpen.set(!$isMenuOpen);
	};
  </script>
  
  <button
	on:click={toggleIsMenuOpen}
	aria-pressed={$isMenuOpen}
	class="flex md:hidden text-accent bg-transparent border-0"
	tabindex={$isMenuOpen || !closeOnly ? "0" : "-1"}
  >
	<span class="sr-only">Toggle hamburger menu</span>
	<svg
	  class="w-4 h-4 text-secondary"
	  aria-hidden="true"
	  xmlns="http://www.w3.org/2000/svg"
	  fill="none"
	  viewBox="0 0 17 14"
	>
	  <path
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M1 1h15M1 7h15M1 13h15"
	  />
	</svg>
  </button>