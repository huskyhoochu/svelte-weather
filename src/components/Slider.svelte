<script>
    import { storeYear } from "../store";
</script>

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

<style lang="scss">
    .slidecontainer {
      margin: 0 auto;
      width: 90vw;

      .slider {
        appearance: none;
        -webkit-appearance: none;
        width: calc(100% - 32px);
        padding: 0 16px;
        height: 25px;
        background-color: #CED9E0;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        border-radius: 10px;

        &:hover {
          opacity: 1;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background-color: #FF6E4A;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
      }
    }
</style>