<script>
	import { isMenuOpen } from "../assets/js/store";
	import HamburgerMenuButton from "./HamburgerMenuButton.svelte";
	import NavItems from "./NavItems.svelte";

	export function clickOutside(node) {
		const handleClick = event => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click_outside', node));
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
		class="bg-surface border border-divider rounded-lg shadow-lg w-48 absolute top-[55px] right-2 mt-1"
		class:hidden={$isMenuOpen ? "" : "hidden"}
		use:clickOutside
		on:click_outside={() => { isMenuOpen.set(false); }}
	>
		<NavItems />
	</div>
</nav>
