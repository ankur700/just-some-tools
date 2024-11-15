<script>
	import Content from '$lib/components/content.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Nav from '$lib/components/nav.svelte';
	import '../app.pcss';
</script>

<Nav />
<Content>
	<slot />
</Content>
<Footer />
