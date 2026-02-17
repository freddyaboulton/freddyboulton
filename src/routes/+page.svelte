<script>
	import { siteTitle } from '$lib/config';
	import { inview } from '$lib/actions/inview.js';
	import StatCounter from '$lib/components/StatCounter.svelte';
	import TimelineEntry from '$lib/components/TimelineEntry.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import fetchPosts from '$lib/assets/js/fetchPosts.js';
	import { onMount } from 'svelte';

	let recentPosts = [];

	onMount(async () => {
		const { posts } = await fetchPosts({ limit: 3 });
		recentPosts = posts;
	});
</script>

<svelte:head>
	<title>{siteTitle}</title>
</svelte:head>

<!-- HERO SECTION -->
<section class="px-6 pt-2 pb-16 md:pt-4 md:pb-24">
	<div class="max-w-4xl mx-auto w-full">
		<div class="md:flex items-center gap-12">
			<!-- Profile Image -->
			<div class="mb-8 md:mb-0 shrink-0 animate-on-scroll" use:inview>
				<div class="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-surface shadow-lg mx-auto md:mx-0">
					<img
						src="/images/pixel_art_profile.webp"
						alt="Freddy Alfonso Boulton"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>

			<!-- Intro Text -->
			<div>
				<p class="font-hand text-2xl text-highlight mb-2 animate-on-scroll" use:inview>Hi, I'm</p>
				<h1 class="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4 mt-0 animate-on-scroll" use:inview>
					Freddy Boulton
				</h1>

				<p class="text-lg text-lighter leading-relaxed mb-6 max-w-lg animate-on-scroll" use:inview>
					I'm a software engineer who loves building tools at the intersection of open source and ML. Right now I'm at <a href="https://huggingface.co" class="font-semibold">Hugging Face</a>, where I am the Team Lead and a core maintainer of <a href="https://www.gradio.app" class="font-semibold">Gradio</a> and <a href="https://github.com/freddyaboulton/fastrtc" class="font-semibold">FastRTC</a> — open-source libraries that make it easier to build and share ML applications.
				</p>

				<!-- Social Icons -->
				<div class="flex gap-5 animate-on-scroll" use:inview>
					<a href="https://github.com/freddyaboulton" target="_blank" rel="noopener noreferrer" class="text-lighter hover:text-highlight transition-colors" aria-label="GitHub">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
					</a>
					<a href="https://www.linkedin.com/in/freddyboulton/" target="_blank" rel="noopener noreferrer" class="text-lighter hover:text-highlight transition-colors" aria-label="LinkedIn">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
					</a>
					<a href="https://twitter.com/FreddyBoulworx" target="_blank" rel="noopener noreferrer" class="text-lighter hover:text-highlight transition-colors" aria-label="Twitter">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
					</a>
					<a href="https://huggingface.co/freddyaboulton" target="_blank" rel="noopener noreferrer" class="text-lighter hover:text-highlight transition-colors text-xl leading-none" aria-label="Hugging Face">🤗</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- EXPERIENCE TIMELINE -->
<section class="py-20 px-6" id="experience">
	<div class="max-w-3xl mx-auto">
		<SectionHeading id="experience-heading" title="Experience" subtitle="Places I've worked and things I've built along the way." number="01" />

		<div class="mt-12">
			<TimelineEntry
				company="Hugging Face"
				role="Software Engineer"
				period="2022 – Present"
				bullets={[
					"Core maintainer of Gradio, an open-source Python library for building ML web apps (35k+ GitHub stars, 1.1M+ monthly users)",
					"Created FastRTC, a real-time communication framework for Python AI apps",
					"Built the Gradio custom components ecosystem, enabling third-party extensions",
					"Developed real-time streaming features for audio/video ML applications"
				]}
			/>

			<TimelineEntry
				company="Alteryx"
				role="Software Engineer"
				period="2020 – 2022"
				bullets={[
					"Core developer on EvalML, an open-source AutoML library",
					"Implemented automated ML pipeline search and optimization",
					"Built time series forecasting capabilities"
				]}
			/>

			<TimelineEntry
				company="Motional (nuTonomy)"
				role="Data Scientist"
				period="2018 – 2020"
				bullets={[
					"Developed prediction models for autonomous vehicle motion planning",
					"Built tools for large-scale driving data analysis"
				]}
			/>

			<TimelineEntry
				company="Nielsen"
				role="Data Scientist"
				period="2017 – 2018"
				bullets={[
					"Applied statistical modeling to media measurement data",
					"Built data pipelines for audience analytics"
				]}
				isLast={true}
			/>
		</div>
	</div>
</section>

<!-- PROJECTS -->
<section class="py-20 px-6 bg-warm-grid" id="projects">
	<div class="max-w-4xl mx-auto">
		<SectionHeading id="projects-heading" title="What I Build" subtitle="Open-source tools I've created or help maintain." number="02" />

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
			<div class="relative">
				<!-- <span class="hidden lg:block absolute -right-4 top-3 translate-x-full font-hand text-base text-highlight -rotate-2">&#8592; proudest work</span> -->
				<ProjectCard
					title="Gradio"
					description="Open-source Python library for building ML-powered web applications. Used by Hugging Face Spaces, Stable Diffusion WebUI, and thousands of ML projects worldwide."
					stat="35,000+ Stars"
					link="https://github.com/gradio-app/gradio"
					color="highlight"
				/>
			</div>
			<div class="relative">
				<!-- <span class="hidden lg:block absolute -left-4 bottom-3 -translate-x-full font-hand text-base text-green rotate-1">built this from scratch &#8594;</span> -->
				<ProjectCard
					title="FastRTC"
					description="Real-time communication framework for Python. Build voice AI agents, real-time video processing, and streaming ML apps with WebRTC."
					stat="4,500+ Stars"
					link="https://github.com/freddyaboulton/fastrtc"
					color="green"
				/>
			</div>
			<ProjectCard
				title="Gradio Custom Components"
				description="Designed and built the plugin ecosystem for Gradio, enabling developers to create and share custom UI components for ML apps."
				stat="Ecosystem"
				link="https://www.gradio.app/guides/five-minute-guide"
				color="amber"
			/>
			<ProjectCard
				title="EvalML"
				description="Open-source AutoML library for building, optimizing, and evaluating machine learning pipelines with domain-specific objective functions."
				stat="Open Source"
				link="https://github.com/alteryx/evalml"
				color="highlight"
			/>
		</div>
	</div>
</section>

<!-- TALKS & WRITING -->
<section class="py-20 px-6" id="talks">
	<div class="max-w-4xl mx-auto">
		<SectionHeading id="talks-heading" title="Talks & Writing" subtitle="I like sharing what I learn — at conferences, in blog posts, and in tutorials." number="03" />

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
			<!-- Conference Talks -->
			<div>
				<h3 class="text-lg font-serif font-bold text-secondary m-0 mb-5">Conference Talks</h3>

				<div class="space-y-4">
					<a href="https://odsc.com/speakers/unlock-the-future-of-ai-real-time-voice-video/" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-highlight">ODSC East 2025</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">Unlock the Future of AI: Real-Time Voice & Video</h4>
						<p class="text-lighter text-sm m-0">Building real-time AI applications with FastRTC and WebRTC</p>
					</a>

					<a href="https://confs.space/conf/mlops-world-genai-summit-2025/gradio-the-web-framework-for-humans-and-machines/" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-green">MLOps World 2025</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">Gradio: The Web Framework for Humans and Machines</h4>
						<p class="text-lighter text-sm m-0">How Gradio bridges the gap between ML models and end users</p>
					</a>

					<a href="https://odsc.com/speakers/a-practical-tutorial-on-building-machine-learning-demos-with-gradio-2/" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-amber">ODSC East 2024</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">Building Machine Learning Demos with Gradio</h4>
						<p class="text-lighter text-sm m-0">A practical tutorial on creating and sharing ML applications</p>
					</a>

					<a href="https://maven.com/parlance-labs/fine-tuning" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-highlight">Mastering LLMs 2024</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">Mastering LLMs Conference</h4>
						<p class="text-lighter text-sm m-0">Guest speaker on building interactive ML demos</p>
					</a>
				</div>
			</div>

			<!-- Writing & Publications -->
			<div>
				<h3 class="text-lg font-serif font-bold text-secondary m-0 mb-5">Writing & Publications</h3>

				<div class="space-y-4">
					<a href="https://huggingface.co/blog/gradio-mcp-servers" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-highlight">HF Blog</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">Gradio MCP Servers</h4>
						<p class="text-lighter text-sm m-0">Turning Gradio apps into Model Context Protocol servers</p>
					</a>

					<a href="https://huggingface.co/blog/fastrtc-cloudflare" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-green">HF Blog</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">FastRTC + Cloudflare</h4>
						<p class="text-lighter text-sm m-0">Global real-time AI infrastructure with Cloudflare's TURN network</p>
					</a>

					<a href="https://huggingface.co/blog/gradio-reload" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-amber">HF Blog</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">Gradio Reload Mode</h4>
						<p class="text-lighter text-sm m-0">Instant UI iteration during Gradio development</p>
					</a>

					<a href="https://realpython.com/python-memory-management/" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-highlight">Real Python</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">Memory Management in Python</h4>
						<p class="text-lighter text-sm m-0">A case study on debugging memory problems with open source tools</p>
					</a>

					<a href="https://arxiv.org/abs/1911.10298" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-green">Paper</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">CoverNet: Multimodal Behavior Prediction using Trajectory Sets</h4>
						<p class="text-lighter text-sm m-0">arXiv &middot; 2019</p>
					</a>

					<a href="https://arxiv.org/abs/2007.13732" target="_blank" rel="noopener noreferrer" class="block bg-surface rounded-xl p-5 border border-divider shadow-sm animate-on-scroll hover:shadow-md transition-all no-underline" use:inview>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-surfaceLight text-amber">Paper</span>
						<h4 class="text-base font-serif font-bold text-secondary m-0 mt-3 mb-1">Motion Prediction using Trajectory Sets and Self-Driving Domain Knowledge</h4>
						<p class="text-lighter text-sm m-0">arXiv &middot; 2020</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- EDUCATION -->
<section class="py-20 px-6" id="education">
	<div class="max-w-3xl mx-auto">
		<SectionHeading id="education-heading" title="Education" number="04" />


		<div class="relative bg-surface rounded-xl p-8 border border-divider shadow-sm mt-12 animate-on-scroll" use:inview>
			<span class="hidden lg:block absolute -right-4 top-6 translate-x-full font-hand text-base text-amber -rotate-1">Go Maroons!</span>
			<div class="flex items-start gap-6">
				<div class="hidden sm:flex w-14 h-14 rounded-xl bg-surfaceLight items-center justify-center shrink-0">
					<svg class="w-7 h-7 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
					</svg>
				</div>
				<div>
					<h3 class="text-2xl font-serif font-bold text-secondary m-0">University of Chicago</h3>
					<p class="text-highlight font-medium mt-2 mb-1">M.S. in Statistics &middot; 2017</p>
					<p class="text-lighter mt-1 mb-1">B.A. in Statistics &middot; 2016</p>
					<p class="text-lighter text-sm mt-3 mb-0">Thesis: Statistical methods for large-scale data analysis</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- BY THE NUMBERS -->
<section class="py-16 px-6 bg-warm-grid border-y border-divider">
	<div class="max-w-4xl mx-auto">
		<SectionHeading id="numbers-heading" title="By the Numbers" number="05" />
		<div class="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
			<StatCounter target={885} suffix="+" label="Pull Requests" />
			<StatCounter target={1.1} suffix="M Users" label="Gradio Downloads" />
			<StatCounter target={4500} suffix="+" label="GitHub Stars" />
			<StatCounter target={9} suffix="+" label="Years Experience" />
		</div>
	</div>
</section>

<!-- BLOG TEASER -->
<section class="py-20 px-6">
	<div class="max-w-4xl mx-auto">
		<SectionHeading id="blog-heading" title="From the Blog" subtitle="Things I've been thinking about and learning lately." number="06" />

		{#if recentPosts.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
				{#each recentPosts as post}
					<a
						href="/blog/{post.slug}"
						class="block bg-surface rounded-xl overflow-hidden border border-divider shadow-sm hover:shadow-md hover:-translate-y-1 transition-all no-underline animate-on-scroll group"
						use:inview
					>
						{#if post.coverImage}
							<img
								src={post.coverImage}
								alt={post.title}
								class="w-full h-40 object-cover"
							/>
						{:else}
							<div class="w-full h-40 bg-surfaceLight"></div>
						{/if}
						<div class="p-5">
							{#if post.categories && post.categories.length > 0}
								<div class="flex flex-wrap gap-2 mb-3">
									{#each post.categories.slice(0, 2) as category}
										<span class="text-xs px-2 py-1 rounded-full bg-surfaceLight text-lighter">{category}</span>
									{/each}
								</div>
							{/if}
							<h4 class="text-base font-serif font-bold text-secondary m-0 mb-2 line-clamp-2 group-hover:text-highlight transition-colors">{post.title}</h4>
							<p class="text-lighter text-sm m-0">{post.date}</p>
						</div>
					</a>
				{/each}
			</div>

			<div class="text-center mt-10">
				<a
					href="/blog"
					class="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-white font-medium rounded-lg hover:bg-secondary transition-colors no-underline"
				>
					View all posts
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
					</svg>
				</a>
			</div>
		{/if}
	</div>
</section>
