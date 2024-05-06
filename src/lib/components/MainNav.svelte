<script>
	import { isMenuOpen } from "../assets/js/store";
	import HamburgerMenuButton from "./HamburgerMenuButton.svelte";
	import NavItems from "./NavItems.svelte";

/** Dispatch event on click outside of node */
	export function clickOutside(node) {
	
	const handleClick = event => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
		node.dispatchEvent(
			new CustomEvent('click_outside', node)
		)
		}
	}

		document.addEventListener('click', handleClick, true);
	
	return {
		destroy() {
		document.removeEventListener('click', handleClick, true);
		}
		}
	}
  </script>
  
  <!-- Contents of this file will be used in the header and the responsive hamburger menu. -->
  <nav class="flex items-center" class:open={$isMenuOpen}>
	<div class="hidden md:flex">
	  <NavItems />
	</div>
	<div class:hidden={$isMenuOpen ? "hidden" : ""}>
		<HamburgerMenuButton
		closeOnly="true"
		id="dropdownHoverButton"
		data-dropdown-toggle="dropdownHover"
		data-dropdown-trigger="hover"
	  />
	</div>
  
	<div
	  id="dropdownHover"
	  class="border-4 border-black divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-[45px] right-0 mt-1"
	  class:hidden={$isMenuOpen ? "" : "hidden"}
	  use:clickOutside
	  on:click_outside={() => { isMenuOpen.set(false); }}
	>
	  <NavItems />
	</div>
  </nav>