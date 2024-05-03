<script>
	import Callout from '$lib/components/Callout.svelte'
</script>


<svelte:head>
	<title>Contact</title>
</svelte:head>


<h1 class="font-bold text-2xl text-primary">Contact</h1>
<p class="font-medium text-lg text-lighter">
This starter was made by Josh Collinsworth. You can <a rel="external" href="https://joshcollinsworth.com/contact">get in touch with Josh here</a>.

If you're using this starter for your own site, feel free to delete this page, or replace it with a contact page of your own. (I'm a big fan of <a href="https://docs.netlify.com/forms/setup/">Netlify forms</a>, personally.)
</p>
<Callout>This form does nothing! It's just here to show default styling.</Callout>

<form on:submit|preventDefault>
	<div class="mb-3">
		<label for="name" class="font-bold">Name</label>
		<input type="text" id="name" placeholder="First name" class="rounded-lg p-1 pl-2 border-lighter"/>
	</div>
	
	<div class="mb-3">
		<label for="email">Email</label>
		<input type="email" id="email" placeholder="Email address" class="rounded-lg p-1 pl-2 border-lighter"/>
	</div>

	<fieldset>
		<legend>
			Which option?
		</legend>

		<div>
			<input type="radio" name="s" id="s1" value="s1">
			<label for="s1">Option 1</label>
		</div>
		<div>
			<input type="radio" name="s" id="s2" value="s2">
			<label for="s2">Option 2</label>
		</div>
		<div>
			<input type="radio" name="s" id="s3" value="s3">
			<label for="s3">Option 3</label>
		</div>
	</fieldset>

	<div class="form-section">
		<input type="checkbox" id="c1" >
		<label for="c1">Sign me up for something!</label>
	</div>

	<input type="submit" value="Do nothing!">
</form>