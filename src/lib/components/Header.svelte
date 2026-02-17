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
		class="w-full mx-auto max-w-screen-2xl p-4 flex items-center justify-between"
	>
		<a href="/" class="text-secondary font-bold text-sm sm:text-base md:text-xl hover:text-highlight transition-colors">
			{siteTitle}
		</a>
		<MainNav />
	</div>
</header>

<!-- Spacer to prevent content from hiding behind fixed header -->
<div class="h-[60px]"></div>

<style>
	.header-solid {
		background-color: rgba(15, 15, 15, 0.95);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}
</style>
