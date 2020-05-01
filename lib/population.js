document.addEventListener("DOMContentLoaded", () => {
    const data = [
        {
            area: "Chukchi Sea",
            size: "2500-3000",
            height: 300
        },
        {
            area: "Beaufort Sea",
            size: "500-1000",
            height: 100,
            country: "Canada"
        },
        {
            area: "McClintock Channel",
            size: "200-500",
            height: 50,
            country: "Canada"
        },
        {
            area: "Gulf of Boothia",
            size: "1500-2000",
            height: 200,
            country: "Canada"
        },
        {
            area: "Hudson Bay",
            size: "500-1000",
            height: 50,
            country: "Canada"
        },
        {
            area: "Foxe Basin",
            size: "2500-3000",
            height: 300,
            country: "Canada"
        },
        {
            area: "Davis Strait",
            size: "2000-2500",
            height: 250,
            country: "Canada"
        },
        {
            area: "Laptev Sea",
            size: "unknown",
            height: 0
        },
        {
            area: "Arctic Basin",
            size: "unknown",
            height: 0
        },
        {
            area: "Norwegian Bay",
            size: "200-500",
            height: 50,
            country: "Canada"
        },
        {
            area: "Lancaster Sound",
            size: "2500-3000",
            height: 300,
            country: "Canada"
        },
        {
            area: "Baffin Bay",
            size: "2500-3000",
            height: 300
        },
        {
            area: "Kara Sea",
            size: "unknown",
            height: 0
        },
        {
            area: "Barents Sea",
            size: "2500-3000",
            height: 300
        },
        {
            area: "East Greenland",
            size: "unknown",
            height: 0
        },
        {
            area: "Kane Basin",
            size: "200-500",
            height: 50
        },
        {
            area: "Viscount M. Sound",
            size: "< 200",
            height: 20,
            country: "Canada"
        }
    ];

    const parentDiv = document.querySelector("#population");
    const margin = 40;
    const padding = 5;
    const width = parentDiv.clientWidth;
    const height = parentDiv.clientHeight;
    const sortedData = data.sort(function (x, y) {
        return d3.descending(x.height, y.height);
    });

    const population = sortedData.filter(d => d.height > 0 && d.country === "Canada");

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(population, d => d.height)])
        .range([height, margin]);

    const xScale = d3.scaleBand()
        .domain(population.map(d => d.area))
        .range([margin, width])
        .padding(0.35);

    const chart = d3.select("#population").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .attr("class", "population-chart");

    chart.append("g")
        .attr("transform", `translate(${margin}, 0)`)
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
        .on("mouseover", function() {
            d3.select(this).style("opacity", 1);
        })
        .on("mouseout", function() {
            d3.select(this).style("opacity", 0.8);
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

    window.addEventListener("scroll", handleScroll);
});