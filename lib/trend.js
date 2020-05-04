document.addEventListener("DOMContentLoaded", () => {

  const data = {
    Stable: {
      count: 5,
      area: [
        "Chukchi Sea",
        "Barents Sea",
        "Gulf of Boothia",
        "Foxe Basin",
        "Davis Strait"
      ]
    }, 
    Increasing: {
      count: 2,
      area: [
        "McClintock Channel",
        "Kane Basin"
      ]
    }, 
    Decreasing: {
      count: 4,
      area: [
        "Southern Beaufort Sea",
        "Northern Beaufort Sea",
        "Western Hudson Bay",
        "Southern Hudson Bay"
      ]
    }, 
    Unknown: {
      count: 8,
      area: [
        "Laptev Sea",
        "Kara Sea",
        "Arctic Basin",
        "Viscount M. Sound",
        "Norwegian Bay",
        "Lancaster Sound",
        "Baffin Bay",
        "East Greenland"
      ]
    }
  };

  const parentDiv = document.querySelector("#trend");
  const width = parentDiv.clientWidth;
  const height = parentDiv.clientHeight;
  const margin = 40;
  const radius = Math.min(width, height) / 2 - margin;

  const svg = d3.select("#trend")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const color = d3.scaleOrdinal()
    .domain(data)
    .range(["#70c1b3", "#fcbf49", "#d62828", "#eae2b7"]);

  const pie = d3.pie()
    .value(function(d) { return d.value.count; });

  const data_ready = pie(d3.entries(data));

  const arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  const tooltip = d3.select("#trend").append("div").append("p").attr("class", "pie-chart-tooltip");

  svg.selectAll()
    .data(data_ready)
    .enter()
    .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)); })
      .style("opacity", 0.7)
      .on("mouseenter", function(data) {
        d3.select(this).style("opacity", 1);

        tooltip.transition().style("opacity", 1);
        tooltip.html(Object.values(data)[0].value.area.join(", "))
          .style("left", (d3.event.pageX + "px"))
          .style("top", (d3.event.pageY + "px"))
          .style("opacity", 0.5);
      })
      .on("mouseleave", function () {
        tooltip.transition()
          .style("opacity", 0);

        d3.select(this).style("opacity", 0.7);
      })
      .on('mousemove', function () {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
          .style('left', (d3.event.layerX + 10) + 'px');
      });

  svg.selectAll()
    .data(data_ready)
    .enter()
    .append('text')
      .text(function (d) { return d.data.key; })
      .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
      .style("text-anchor", "middle")
      .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 20)
        .text(function (d) { return Math.round((d.value / 19) * 100) + "%"; });

});