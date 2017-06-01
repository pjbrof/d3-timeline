var d3 = require('d3');

// JSON structure TODO - accept xlxs/csv
var jobhistory = {
	"timeline": "one",
	"children": [
		{
			"job": "Brophy Analytics",
			"description": "I started Brophy Analytics LLC during my senior year of college when I was frequently being asked to help friends and family with websites. I currently still own and opporate the company in my spare time.",
			"logo": "http://brophyanalytics.com/images/logo.png",
			"startDate": "2012-08",
			"endDate": "present"
		},
		{
			"job": "University of Dayton",
			"startDate": "2010-08",
			"endDate": "2015-06"
		},
		{
			"job": "i4a",
			"logo": "http://patrickbrophy.info/img/portfolio/i4a.png",
			"startDate": "2012-05",
			"endDate": "2015-06"
		},
		{
			"job": "Mountain Gap Solutions",
			"logo": "http://patrickbrophy.info/img/portfolio/jjilllogo.png",
			"startDate": "2015-01",
			"endDate": "2015-06"
		},
		{
			"job": "J.Jill",
			"logo": "http://patrickbrophy.info/img/portfolio/jjilllogo.png",
			"startDate": "2015-06",
			"endDate": "2015-09"
		},
		{
			"job": "John Hancock",
			"description": "From working on the Boston Marathon to the full site redesign I've been busy as John Hancock's lead developer",
			"logo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/358807/jh-logo-lg.jpg",
			"startDate": "2015-08",
			"endDate": "present"
		},
		{
			"job": "Biogen",
			"startDate": "2016-08",
			"endDate": "present"
		}
	]
};

// random colors
var colors = ['#00E5FF', '#34DEE9', '#EED86D', '#F28F3E', '#EF354D'];

var margin = {top: 300, right: 100, bottom: 100, left: 10},
    width = 960 - margin.left - margin.right,
    height = 2000 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
		//.attr("viewBox","0 0 960 500")
  	//.attr("preserveAspectRatio", "xMidYMid")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var defs = svg.append("defs");

var filter = defs.append("filter")
    .attr("id", "glow")
		.attr("height", height)
		.attr("width", width)
		.attr("filterUnits", "userSpaceOnUse");

var blur = filter.append("feGaussianBlur")
							.attr("stdDeviation", 1.5)
							.attr("result", "blur");

var feMerge = filter.append("feMerge");
	feMerge.append("feMergeNode")
		.attr("in", "blur")
	feMerge.append("feMergeNode")
		.attr("in", "SourceGraphic");

var tip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute');

var parseDate = d3.timeParse("%Y-%m");
var parseYear = d3.timeParse("%Y");
var mindate = parseYear(d3.min(jobhistory.children, function(d) {
	return d.startDate.slice(0,4); // d.startDate
}));

var today = new Date();
var maxdate = today.getYear() - 100 + 2001;
var oncemore = parseYear(maxdate.toString());

var xScale = d3.scaleTime()
    .domain([mindate, oncemore]) //today
    .range([margin.left, width - margin.right * 2]);

svg.append("g")
    .attr("class", "axis")
		.attr("color", "grey")
    .call(d3.axisBottom(xScale)
					.ticks(d3.timeYear.every(1))
          .tickFormat(d3.timeFormat("%Y")));

// Insert Important Singular Dates/Milestones
/*svg.selectAll("startDate")
   .data(jobhistory.children)
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

// Date Ranges
var line = svg.selectAll("connectors")
		.data(jobhistory.children)
		.enter()
		.append("line")
		.attr("class", "segment")
		.attr("x1", function(d) {
			return xScale(parseDate(d.startDate));
		 })
		.attr("x2", function(d) {
			if(d.endDate === 'present') {
				return xScale(today);
			} else {
				return xScale(parseDate(d.endDate));
			}
		 })
		.attr("y1", function(d,i) {
			return (i + 1) * -21;
	 	})
		.attr("y2", function(d,i) {
			return (i + 1) * -21;
	 	})
    .attr("transform", "translate(0,0)")
    .style("stroke-width", 8)
    .style("stroke", function(d, i) {
			return colors[i];
		})
    .style("fill", "none")
		.style("stroke-linecap", "round")
		.style("filter", "url(#glow)")
		.on("mouseover", function(d){
			d3.select(this).style("filter", "none");
			/*tip.style("display", "block")
				 .html(function() {
					var job;
				job = '<div class="job">' +
						'<div class="job-logo"><img src="' + d.logo + '" alt="' + d.job + '" /></div>' +
						'<div class="job-info">' +
						'<span class="job-title">' + d.job + '</span>' +
						'<p class="job-desc">' + d.description + '</p>' +
						'</div>' +
					'</div>';

				return job;
				 });*/
		})
		.on("mouseout", function(d) {
			d3.select(this).style("filter", "url(#glow)");
			//tip.style("display", "none");
		});
