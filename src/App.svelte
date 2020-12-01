<script>
  import 'normalize.css';
  import Chart from './Chart.svelte';
  import Nav from './components/Nav.svelte';
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

<p>출처: <a href="https://data.seoul.go.kr/" rel="noopener noreferrer" target="_blank">서울 열린데이터 광장</a></p>
