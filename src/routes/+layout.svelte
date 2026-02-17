<script>
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { currentPage, isMenuOpen } from "../lib/assets/js/store.js";
	import { navItems } from "$lib/config";
	import { preloadCode } from "$app/navigation";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { siteTitle, siteURL } from "$lib/config.js";
	import "../app.css";

	export let data;

	const transitionIn = { delay: 150, duration: 150 };
	const transitionOut = { duration: 100 };

	$: currentPage.set(data.path);
	$: isHomePage = data.path === '/';

	onMount(() => {
	  const navRoutes = navItems
		.map((item) => item.route)
		.filter((route) => !route.includes('#'));
	  preloadCode(...navRoutes);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="/css/vars.css" />
	<link rel="stylesheet" href="/css/root.css" />
	<link rel="stylesheet" href="/css/fonts.css" />
	<link rel="stylesheet" href="/css/typography.css" />
	<link rel="stylesheet" href="/css/layout.css" />
	<link rel="stylesheet" href="/css/components.css" />
	<link rel="stylesheet" href="/css/forms.css" />
	<link rel="stylesheet" href="/css/animation.css" />
	<link rel="stylesheet" href="/css/utilities.css" />
	<link rel="stylesheet" href="/css/code.css" />
	<link rel="stylesheet" href="/css/prism.css" />
	<link
	  rel="alternate"
	  type="application/rss+xml"
	  title={siteTitle}
	  href="http://{siteURL}/api/rss.xml"
	/>
</svelte:head>

<div class:open={$isMenuOpen}>
	<Header />
	{#key data.path}
	  <main
		id="main"
		tabindex="-1"
		in:fade|global={transitionIn}
		out:fade|global={transitionOut}
		class={isHomePage ? "min-h-[73vh]" : "max-w-screen-md mx-auto mt-10 mb-10 min-h-[73vh] px-4"}
	  >
		<slot />
	  </main>
	{/key}
	<Footer />
</div>
