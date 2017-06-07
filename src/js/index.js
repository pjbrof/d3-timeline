// JSON structure TODO - accept xlxs/csv
var timeline = {
	"timeline": "one",
	"children": [
		{
			"job": "Brophy Analytics",
			"description": "I started Brophy Analytics LLC during my senior year of college when I was frequently being asked to help friends and family with websites. I currently own and operate the company in my spare time.",
			"logo": "http://brophyanalytics.com/images/logo.png",
      "color": "#000000",
			"startDate": "2012-08",
			"endDate": "present"
		},
		{
			"job": "University of Dayton",
			"logo": "",
			"description": "",
      "color": "#D52728",
			"startDate": "2010-08",
			"endDate": "2015-06"
		},
		{
			"job": "i4a",
			"logo": "http://patrickbrophy.info/img/portfolio/i4a.png",
			"description": "",
      "color": "#6699CC",
			"startDate": "2012-05",
			"endDate": "2015-06"
		},
		{
			"job": "Mountain Gap Solutions",
			"logo": "http://patrickbrophy.info/img/portfolio/mgs.png",
			"description": "",
      "color": "#325664",
			"startDate": "2015-01",
			"endDate": "2015-06"
		},
		{
			"job": "J.Jill",
			"description": "",
			"logo": "http://patrickbrophy.info/img/portfolio/jjilllogo.png",
      "color": "#8E8E8E",
			"startDate": "2015-06",
			"endDate": "2015-09"
		},
		{
			"job": "John Hancock",
			"description": "From working on the Boston Marathon to the full site redesign I've been busy as John Hancock's lead developer",
			"logo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/358807/jh-logo-lg.jpg",
      "color": "#063E68",
			"startDate": "2015-08",
			"endDate": "present"
		},
		{
			"job": "Biogen",
			"logo": "",
			"description": "",
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
			tip.style("display", "block")
				 .html(function() {
					 return '<div class="job">' +
						'<div class="job-logo"><img class="logo" src="' + d.logo + '" alt="' + d.job + '" /></div>' +
						'<div class="job-info">' +
						'<span class="job-title">' + d.job + '</span>' +
						'<p class="job-desc">' + d.description + '</p>' +
						'</div>' +
					'</div>';
		  });
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
