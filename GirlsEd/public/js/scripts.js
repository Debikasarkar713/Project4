var st = {};
st.data = [{"label":"less than a week","value":169,"pos":0},{"label":"1 week - 30 days","value":1,"pos":1},{"label":"30 - 90 days","value":22,"pos":2},{"label":"90 - 180 days","value":35,"pos":3},{"label":"180 days - 1 year","value":47,"pos":4},{"label":"more than 1 year","value":783,"pos":5}] ;
$(document).ready(init);
function init(e) {
    drawPieChartAccessAgesByCountD3();
}

window.onresize = function(event) {
    drawPieChartAccessAgesByCountD3();
}
function drawPieChartAccessAgesByCountD3() {
  drawD3PieChart("#ChartAccessAgesByCountD3", st.data, [0, 1, 2, 3, 4, 5]);
  }
function drawD3PieChart(sel, data, row_id_to_bucket_num) {
  // clear any previously rendered svg
  $(sel + " svg").remove();
  // compute total
  tot = 0;
  data.forEach(function(e){ tot += e.value; });
  var w = $(sel).width();
  var h = $(sel).height();
  var r = Math.min(w, h) /2;
  var color = d3.scale.category20c();
  var vis = d3.select(sel).append("svg:svg").attr("data-chart-context",sel).data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + (w / 2) + "," + r + ")");
  var svgParent = d3.select("svg[data-chart-context='" + sel + "']");
  var pie = d3.layout.pie().value(function(d){return d.value;});
  var arc = d3.svg.arc().outerRadius(r);
  var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class","slice");
  arcs.append("svg:path")
    .attr("fill", function(d, i) {
      return color(i);
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", "1")
    .attr("d", function(d) {
      //console.log(arc(d));
      return arc(d);
    })
    .attr("data-legend",function(d) { return d.data.label; })
    .attr("data-legend-pos",function(d) { return d.data.pos; })
    .classed("slice",true)
    .on("click",function(e){
      var chartDiv = $(sel); // retrieve id of chart container div
      var selectedValue = $(this).attr("data-legend-pos");
      var bucket = row_id_to_bucket_num[selectedValue];
      var dest = chartDiv.attr("data-drilldown-destination");
      var param = chartDiv.attr("data-drilldown-key");
      var baseURL = dest + "/?" + param + "=";
      //window.location = baseURL + bucket;
            alert("drill down to " + baseURL + bucket);
    })
    .on("mouseover",function(e){
      $(this)
      .attr("fill-opacity", ".8")
      .css({"stroke": "green", "stroke-width": "1px"});
    })
    .on("mouseout",function(e){
      $(this)
      .attr("fill-opacity", "1")
      .css({"stroke-width": "0px"});
    })
    .attr("style","cursor:pointer;")
    .append("svg:title")
       .text(function(d) { return d.data.label; });

  arcs.append("svg:text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return (data[i].value / tot ) * 100 > 10 ? ((data[i].value / tot ) * 100).toFixed(1) + "%" : "";
    }
  ).attr("fill","#fff")
    .classed("slice-label",true);

  legend = svgParent.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,50)")
    .style("font-size","12px")
    .call(d3.legend);
}
