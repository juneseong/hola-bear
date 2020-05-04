document.addEventListener("DOMContentLoaded", () => {
    
    const data = [
        {
            area: "Chukchi Sea",
            size: "2500-3000",
            height: 3000,
        },
        {
            area: "Beaufort Sea",
            size: "500-1000",
            height: 1000,
            country: "Canada"
        },
        {
            area: "McClintock Channel",
            size: "200-500",
            height: 500,
            country: "Canada"
        },
        {
            area: "Gulf of Boothia",
            size: "1500-2000",
            height: 2000,
            country: "Canada"
        },
        {
            area: "Hudson Bay",
            size: "500-1000",
            height: 1000,
            country: "Canada"
        },
        {
            area: "Foxe Basin",
            size: "2500-3000",
            height: 3000,
            country: "Canada"
        },
        {
            area: "Davis Strait",
            size: "2000-2500",
            height: 2500,
            country: "Canada"
        },
        {
            area: "Laptev Sea",
            size: "unknown",
            height: 0,
        },
        {
            area: "Arctic Basin",
            size: "unknown",
            height: 0,
        },
        {
            area: "Norwegian Bay",
            size: "200-500",
            height: 500,
            country: "Canada"
        },
        {
            area: "Lancaster Sound",
            size: "2500-3000",
            height: 3000,
            country: "Canada"
        },
        {
            area: "Baffin Bay",
            size: "2500-3000",
            height: 3000
        },
        {
            area: "Kara Sea",
            size: "unknown",
            height: 0
        },
        {
            area: "Barents Sea",
            size: "2500-3000",
            height: 3000,
        },
        {
            area: "East Greenland",
            size: "unknown",
            height: 0,
        },
        {
            area: "Kane Basin",
            size: "200-500",
            height: 500,
        },
        {
            area: "Viscount M. Sound",
            size: "0-200",
            height: 200,
            country: "Canada"
        }
    ];

    const parentDiv = document.querySelector("#population");
    const margin = { left: 70, right: 70, top: 0, bottom: 45 };
    const padding = 5;
    const width = parentDiv.clientWidth - margin.left - margin.right;
    const height = parentDiv.clientHeight - margin.top - margin.bottom;

    const sortedData = data.sort(function (x, y) {
        return d3.descending(x.height, y.height);
    });

    const population = sortedData.filter(d => d.height > 0 && d.country === "Canada");

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(population, d => d.height)])
        .range([height, margin.bottom]);

    const xScale = d3.scaleBand()
        .domain(population.map(d => d.area))
        .range([margin.left, width])
        .padding(0.3);

    const chart = d3.select("#population").append("svg")
        .attr("width", width)
        .attr("height", height + margin.bottom)
        .attr("class", "population-chart");

    const makeYLines = () => d3.axisLeft()
        .scale(yScale);

    const tooltip = d3.select("#population").append("div").append("p").attr("class", "bar-chart-tooltip");

    chart.append('g')
        .attr('class', 'grid')
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(makeYLines()
            .tickSize(-width + margin.left, 0, 0)
            .tickFormat(''));

    chart.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale).tickSize(padding));

    chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(padding));

    chart.selectAll()
        .data(population)
        .enter().append("rect")
        .style("fill", "#70c1b3")
        .style("opacity", 0.8)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("x", d => xScale(d.area))
        .attr("y", d => yScale(0))
        .on("mouseover", function(data) {
            d3.select(this).style("opacity", 1);
            tooltip.transition().style("opacity", 1);
            tooltip.text(`Estimate: ${data.size}`)
                .style("left", (d3.event.pageX + "px"))
                .style("top", (d3.event.pageY + "px"))
                .style("opacity", 0.5);
        })
        .on("mouseout", function() {
            d3.select(this).style("opacity", 0.8);
            tooltip.transition().style("opacity", 1);
            tooltip.transition()
                .style("opacity", 0);
        })
        .on('mousemove', function () {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
                .style('left', (d3.event.layerX + 10) + 'px');
        });

    const rects = chart.selectAll("rect");

    let scrolled = false;

    const handleScroll = e => {
        if (window.scrollY > 300 && !scrolled) {
            rects.transition().delay(function (d, i) {
                return i;
            }).duration(2500)
                .attr("height", d => yScale(0) - yScale(d.height))
                .attr("y", d => yScale(d.height));
            scrolled = true;
        }
    };

    chart.append('text')
        .attr('x', width - margin.left / 2 - margin.right)
        .attr('y', height + margin.bottom)
        .attr('text-anchor', 'start')
        .text('Source: WWF');

    chart.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2))
        .attr('y', margin.bottom / 3)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Population');

    chart.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin.left / 2)
        .attr('y', height + margin.bottom)
        .attr('text-anchor', 'middle')
        .text('Area');

    window.addEventListener("scroll", handleScroll);
});