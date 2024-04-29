<script>
	import { isMenuOpen } from "../assets/js/store";
	import HamburgerMenuButton from "./HamburgerMenuButton.svelte";
	import NavItems from "./NavItems.svelte";
  </script>
  
  <!-- Contents of this file will be used in the header and the responsive hamburger menu. -->
  <nav class="flex items-center" class:open={$isMenuOpen}>
	<div class="hidden md:flex">
	  <NavItems />
	</div>
	<HamburgerMenuButton
	  class="hidden"
	  closeOnly="true"
	  id="dropdownHoverButton"
	  data-dropdown-toggle="dropdownHover"
	  data-dropdown-trigger="hover"
	/>
  
	<!-- Dropdown men -->
	<div
	  id="dropdownHover"
	  class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-[45px] right-0 mt-1"
	  class:hidden={$isMenuOpen ? "" : "hidden"}
	>
	  <NavItems />
	</div>
  </nav>