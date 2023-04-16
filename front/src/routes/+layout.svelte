<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<Navbar/>

<div id="main">
    <slot></slot>
</div>

<style>
    #main {
        padding: 6px;
    }
</style>
