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
    .range(["#1d3557", "#f1faee", "#457b9d", "#a8dadc"]);
  
  const pie = d3.pie()
    .value(function(d) { return d.value.count; });

  const data_ready = pie(d3.entries(data));

  const arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  const tooltip = d3.select(".test").append("div").append("p").attr("class", "test").attr("class", "pie-percentage").html("21%");
  const tooltip2 = d3.select(".test").append("div").append("p").attr("class", "test").attr("class", "pie-key").html("Decreasing");
  const tooltip3 = d3.select(".test").append("div").append("p").attr("class", "test").attr("class", "pie-area").html(data["Decreasing"].area.join(", "));


  svg.selectAll()
    .data(data_ready)
    .enter()
    .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)); })
      .on("mouseenter", function(data) {
        d3.select(this)
          .attr("stroke", "#fafafa")
          .attr("stroke-width", 8);


        this.parentNode.appendChild(this);
        tooltip.transition().style("opacity", 1);
        tooltip.html(Math.round((data.value / 19) * 100) + "%")
          
          .style("left", (d3.event.pageX + "px"))
          .style("top", (d3.event.pageY + "px"))
          .style("opacity", 0.5);

        tooltip2.transition().style("opacity", 1);
        tooltip2.html(data.data.key)
          
          .style("left", (d3.event.pageX + "px"))
          .style("top", (d3.event.pageY + "px"))
          .style("opacity", 0.5);

        tooltip3.transition().style("opacity", 1);
        tooltip3.html(Object.values(data)[0].value.area.join(", "))
          
          .style("left", (d3.event.pageX + "px"))
          .style("top", (d3.event.pageY + "px"))
          .style("opacity", 0.5);
        
      })
      .on("mouseleave", function () {
          
        d3.select(this)
          .attr("stroke-width", 0);
      })
      .on('mousemove', function () {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
          .style('left', (d3.event.layerX + 10) + 'px');
      });

  svg.selectAll()
    .data(data_ready)
    .enter()
    .append('text')
      .style("text-anchor", "middle")
      .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 20);
});