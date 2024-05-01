<!-- This is the global layout file; it "wraps" every page on the site. (Or more accurately: is the parent component to every page component on the site.) -->
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
  
	/**
	 * Updates the global store with the current path. (Used for highlighting
	 * the current page in the nav, but could be useful for other purposes.)
	 **/
	$: currentPage.set(data.path);
  
	/**
	 * This pre-fetches all top-level routes on the site in the background for faster loading.
	 * https://kit.svelte.dev/docs/modules#$app-navigation-preloaddata
	 *
	 * Any route added in src/lib/config.js will be preloaded automatically. You can add your
	 * own preloadData() calls here, too.
	 **/
	onMount(() => {
	  const navRoutes = navItems.map((item) => item.route);
	  preloadCode(...navRoutes);
	});
  </script>
  
  <svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
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
  
  <!--
	  The below markup is used on every page in the site. The <slot> is where the page's
	  actual contents will show up.
  -->
  <div class:open={$isMenuOpen} style="background-color: #F0EFEA">
	<Header />
	{#key data.path}
	  <main
		id="main"
		tabindex="-1"
		in:fade|global={transitionIn}
		out:fade|global={transitionOut}
		class="max-w-screen-md mx-auto mt-10 mb-10"
	  >
		<slot />
	  </main>
	{/key}
	<Footer />
  </div>