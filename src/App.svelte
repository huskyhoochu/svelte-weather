<script>
  import Chart from './Chart.svelte';
  import { storeYear } from './store';
</script>


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
