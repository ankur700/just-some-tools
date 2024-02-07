<script>
	import '../app.pcss';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Nav from '$lib/components/nav.svelte';
	import Content from '$lib/components/content.svelte';
</script>

<Header></Header>
<Content>
	<slot />
</Content>
<Nav></Nav>
<Footer></Footer>
