<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { storeYear } from './store';

  const dimensions = {
    width: window.innerWidth * 0.8,
    height: 600,
    graphWidth: 0,
    graphHeight: 0,
    margin: {
      left: 100,
      right: 30,
      top: 30,
      bottom: 100,
    },
  };

  dimensions.graphWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.graphHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  onMount(() => {
    // canvas
    let svg = d3
      .select("#wrapper")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style('display', 'block')
      .style('margin', '0 auto')

    const rootGroup = svg
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
      );

    // scales
    const xScale = d3.scaleTime().range([0, dimensions.graphWidth]);

    const timeParser = d3.timeParse("%Y.%m");
    const xAccessor = (d) => timeParser(d.time);

    const yScale = d3.scaleLinear().range([dimensions.graphHeight, 0]);

    // axis
    const xAxisGenerator = d3.axisBottom().scale(xScale);

    const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(5);

    const xAxis = rootGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${dimensions.graphHeight})`);

    const yAxis = rootGroup.append("g").attr("class", "y-axis");

    // labels
    const xLabel = rootGroup
      .append("text")
      .attr("y", dimensions.graphHeight + 50)
      .attr("x", dimensions.graphWidth / 2)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("연도");

    const yLabel = rootGroup
      .append("text")
      .attr("y", -50)
      .attr("x", -200)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("강수량 (mm)");

    const timeLabel = rootGroup
      .append("text")
      .attr("y", dimensions.graphHeight - 50)
      .attr("x", dimensions.graphWidth - 40)
      .attr("font-size", "40px")
      .attr("opacity", "0.4")
      .attr("text-anchor", "middle")
      .text($storeYear);

    async function draw() {
      let category = "rain";
      const data = await d3.json("/weather_year.json");

      // data formatting
      Object.keys(data).forEach((key) => {
        data[key].forEach((d) => {
          d.avgTa = Number(d.avgTa);
          d.taMax = Number(d.taMax);
          d.taMin = Number(d.taMin);
          d.avgTaMax = Number(d.avgTaMax);
          d.avgTaMin = Number(d.avgTaMin);
          d.rain = Number(d.rain);
        });
      });

      // first render
      update(data[1961], category);

      // update every 1s
      d3.interval(() => {
        $storeYear = $storeYear < 2020 ? $storeYear + 1 : 1961;
        update(data[$storeYear], category);
      }, 1000);

      $: {
        update(data[$storeYear], category);
      }
    }

    function update(yearData, category) {
      // yAccessor
      const yAccessor = (d) => (Number.isNaN(d[category]) ? 0 : d[category]);

      // set domain
      xScale.domain(d3.extent(yearData, xAccessor));
      yScale.domain([0, 1000]);
      // axis transition
      xAxis.call(xAxisGenerator);

      yAxis.transition().duration(200).call(yAxisGenerator);

      // line
      const lineGenerator = d3
        .line()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)))
        .curve(d3.curveMonotoneX);

      // line transition

      // Join new data
      const line = rootGroup.selectAll(".lineTest").data([yearData], yAccessor);

      // exit old elements
      line.exit().remove();

      // enter new elements
      line
        .enter()
        .append("path")
        .attr("class", "lineTest")
        .merge(line)
        .transition()
        .duration(200)
        .attr("d", lineGenerator(yearData))
        .attr("fill", "none")
        .attr("stroke", "#137CBD")
        .attr("stroke-width", "5px");

      timeLabel.text(String($storeYear));
    }
    
    draw();
  });
</script>

<div id="wrapper"></div>

<style lang="scss">
  .svg {
    display: block;
  }
</style>
