<script>
  import 'normalize.css';
  import Chart from './Chart.svelte';
  import Nav from './components/Nav.svelte';
  import Footer from './components/Footer.svelte';
  import { storeYear } from './store';
</script>

<Nav />
<Chart />

<div class="slidecontainer">
  <input
    bind:value={$storeYear}
    type="range"
    min={1961}
    max={2020}
    class="slider"
    id="myRange"
  />
</div>
<p id="current">{$storeYear}</p>

<Footer />

<style lang="scss">
  :global(a) {
    text-decoration: none;
  }
</style>