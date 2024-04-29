<script>
  import { siteAuthor } from "$lib/config";
  import { navItems } from "$lib/config";
</script>

<footer class="bg-secondary">
  <div
    class="w-full mx-auto max-w-screen-2xl p-4 md:flex md:items-center md:justify-between"
  >
    <span class="text-base text-accent sm:text-center"
      >&copy;{new Date().getFullYear()} {siteAuthor}
    </span>
    <ul
      class="flex flex-wrap items-center mt-3 text-base font-medium text-accent sm:mt-0"
    >
      <li>
        <a
          href="/api/rss.xml"
          data-sveltekit-reload
          class="hover:underline me-4 md:me-6">RSS</a
        >
      </li>
      <li>
        <a href="/" class="hover:underline me-4 md:me-6">Home</a>
      </li>
      {#each navItems as page}
        <li>
          <a href={page.route} class="hover:underline me-4 md:me-6"
            >{page.title}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</footer>