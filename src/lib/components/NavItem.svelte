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

<li class="text-sm sm:text-base md:text-base p-2">
	<a
		{href}
		on:click={maybeCloseMenu}
		class:active={isCurrentPage}
		aria-current={isCurrentPage ? "page" : false}
		class="text-lighter hover:text-secondary transition-colors no-underline {isCurrentPage && !href.startsWith('/#') ? 'font-semibold text-secondary' : ''}"
	>
		<slot />
	</a>
</li>
