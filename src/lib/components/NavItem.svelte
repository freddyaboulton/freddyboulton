<script>
	import { currentPage, isMenuOpen } from "../assets/js/store";

	export let href;

	$: isCurrentPage = href.startsWith('/#')
		? $currentPage === '/'
		: $currentPage.startsWith(href);

	const maybeCloseMenu = () => {
		isMenuOpen.set(false);
	};
</script>

<li class="text-sm sm:text-base md:text-lg p-2">
	<a
		{href}
		on:click={maybeCloseMenu}
		class:active={isCurrentPage}
		aria-current={isCurrentPage ? "page" : false}
		class="text-secondary hover:text-highlight transition-colors {isCurrentPage && !href.startsWith('/#') ? 'font-semibold text-highlight' : ''}"
	>
		<slot />
	</a>
</li>
