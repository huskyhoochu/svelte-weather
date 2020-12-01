<script>
  import 'normalize.css';
  import Chart from './Chart.svelte';
  import Nav from './components/Nav.svelte';
  import Footer from './components/Footer.svelte';
  import Slider from "./components/Slider.svelte";
</script>

<Nav />
<Chart />
<Slider />
<Footer />

<style lang="scss">
  :global(a) {
    text-decoration: none;
  }
</style>