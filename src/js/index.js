// JSON structure TODO - accept xlxs/csv
var timeline = {
	"timeline": "one",
	"children": [
		{
			"event": "Event 1",
      "color": "#000000",
			"startDate": "2012-08",
			"endDate": "present"
		},
		{
			"event": "Event 2",
      "color": "#D52728",
			"startDate": "2010-08",
			"endDate": "2015-06"
		},
		{
			"event": "Event 3",
      "color": "#6699CC",
			"startDate": "2012-05",
			"endDate": "2015-06"
		},
		{
			"event": "Event 4",
      "color": "#325664",
			"startDate": "2015-01",
			"endDate": "2015-06"
		},
		{
			"event": "Event 5",
      "color": "#8E8E8E",
			"startDate": "2015-06",
			"endDate": "2015-09"
		},
		{
			"event": "Event 6",
      "color": "#063E68",
			"startDate": "2015-08",
			"endDate": "present"
		},
		{
			"event": "Event 7",
      "color": "#6A9F54",
			"startDate": "2016-08",
			"endDate": "present"
		}
	]
};

var initialWidth = 960;
var initialHeight = 250;

var margin = {top: 30, right: 10, bottom: 30, left: 10},
    width = initialWidth - margin.left - margin.right,
    height = initialHeight - margin.top - margin.bottom;

var svg = d3.select(".d3timeline").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
		.attr("viewBox","0 0 960 250")
  	.attr("preserveAspectRatio", "xMidYMid")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var defs = svg.append("defs");

var filter = defs.append("filter")
    .attr("id", "glow")
		.attr("height", initialHeight)
		.attr("width", initialWidth)
		.attr("filterUnits", "userSpaceOnUse");

var blur = filter.append("feGaussianBlur")
							.attr("stdDeviation", 1.5)
							.attr("result", "blur");

var feMerge = filter.append("feMerge");
	feMerge.append("feMergeNode")
		.attr("in", "blur")
	feMerge.append("feMergeNode")
		.attr("in", "SourceGraphic");

var tip = d3.select('.tooltip');

var parseDate = d3.timeParse("%Y-%m");
var parseYear = d3.timeParse("%Y");
var mindate = parseYear(d3.min(timeline.children, function(d) {
	return d.startDate.slice(0,4); // d.startDate
}));

var today = new Date();
var maxdate = parseYear(today.getYear() - 100 + 2001);

var xScale = d3.scaleTime()
    .domain([mindate, maxdate]) //today
    .range([margin.left, width - margin.right * 2]);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + 0 + "," + height + ")")
    .call(d3.axisBottom(xScale)
					.ticks(d3.timeYear.every(1))
          .tickFormat(d3.timeFormat("%Y")));

var magicNumber = 21;

// Date Ranges
var line = svg.selectAll("connectors")
		.data(timeline.children)
		.enter()
		.append("line")
		.attr("class", "segment")
		.attr("x1", function(d) {
			return xScale(parseDate(d.startDate));
		 })
		.attr("x2", function(d) {
			return xScale(parseDate(d.startDate));
		 })
		.attr("y1", function(d,i) {
			return height + (i + 1) * -magicNumber;
	 	})
		.attr("y2", function(d,i) {
			return height + (i + 1) * -magicNumber;
	 	})
    .style("stroke-width", 8)
    .style("stroke", function(d, i) { return d.color })

    .style("fill", "none")
		.style("stroke-linecap", "round")
		.style("filter", "url(#glow)")
		.on("click", function(d){
      d3.selectAll("line").style("filter", "url(#glow)");
			d3.select(this).style("filter", "none");
		})
    .transition()
      .duration(2000)
      .attr("x2", function(d) {
        if(d.endDate === 'present') {
          return xScale(today);
        } else {
          return xScale(parseDate(d.endDate));
        }
      });

    // Insert Important Singular Dates/Milestones
    /*svg.selectAll("startDate")
       .data(timeline.children)
       .enter()
       .append("rect")
    	 .attr("x", function(d) {
    			return xScale(parseDate(d.startDate));
    		})
       .attr("y", function(d,i) {
    		return (i + 1) * -21;
    	 	})
    	 .attr("width", 5)
       .attr("height", 5);*/



        /*line.attr("stroke-dasharray", totalLength + " " + totalLength)
             .attr("stroke-dashoffset", totalLength)
        */
