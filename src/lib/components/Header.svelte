<script>
	import MainNav from "./MainNav.svelte";
	import { siteTitle } from "$lib/config";
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	let scrolled = false;
	let isHome = false;

	$: isHome = $page.url.pathname === '/';

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	class="fixed top-0 w-full z-50 transition-all duration-300"
	class:bg-transparent={isHome && !scrolled}
	class:header-solid={!isHome || scrolled}
>
	<div
		class="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between"
	>
		<a href="/" class="text-secondary font-serif font-bold text-sm sm:text-base md:text-xl hover:text-highlight transition-colors no-underline">
			{siteTitle}
		</a>
		<MainNav />
	</div>
</header>

<div class="h-[60px]"></div>

<style>
	.header-solid {
		background-color: rgba(250, 248, 244, 0.95);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(232, 228, 222, 0.8);
	}
</style>
