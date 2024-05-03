<script>
	import { siteTitle } from '$lib/config';
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</svelte:head>

<div class="bg-cover min-h-screen px-4">
	<div class="max-w-4xl mx-auto">
	  <div class="md:flex items-center">
		<div class="md:w-1/3 mb-8 md:mb-0 md:mr-12">
		  <img class="rounded-full w-full" src="/images/pixel_art_profile.webp" alt="Freddy Alfonso Boulton">
		</div>
		<div class="md:w-2/3">
		  <h2 class="text-4xl mb-4">About Me</h2>
		  <p class="leading-relaxed mb-4">I'm a software engineer specializing in the intersection of open source software and artificial intelligence. I'm currently at <a href="https://huggingface.co" class="font-bold">Hugging Face</a>, where I spend most of my time developing <a href="https://www.gradio.app" class="font-bold">Gradio</a>, an open-source python package for building AI-powered web applications with little code.</p>
		</div>
	  </div>      
	</div>
	<div class="md:w-1/3 mb-8 md:mb-0 md:mr-12">
				  <div class="flex justify-center space-x-4 py-1">
			<a href="https://www.linkedin.com/in/freddyboulton/" target="_blank" class="hover:text-warning">
			  <i class="fab fa-linkedin fa-2x"></i>
			</a>
			<a href="https://twitter.com/home" target="_blank" class="hover:text-warning">
			  <i class="fab fa-twitter fa-2x"></i>  
			</a>
			<a href="https://github.com/freddyaboulton" target="_blank" class="hover:text-warning">
			  <i class="fab fa-github fa-2x"></i>
			</a>
		  </div>
	</div>
  </div>