//SEE
//https://gist.github.com/steveharoz/8c3e2524079a8c440df60c1ab72b5d03#file-code-js
//Variables
var circlefact = 10;
var strength   = 1000;
var outercolor = "#2B3E50";
var linkcolor = "white";
var selected_nodes = [];
var selected_links = [];

/*
Shiny.addCustomMessageHandler('force', function(myforce) {
    strength = myforce;
    updateAll();
});

Shiny.addCustomMessageHandler('scale', function(myscale) {
    circlefact = myscale;
    updateAll();
});
*/

// set the dimensions and margins of the graph
var margin  = {top: 10, right: 10, bottom: 10, left: 10};
var padding = {top: 30, right: 30, bottom: 30, left: 30};

var innerWidth   = outerWidth  - margin.left  - margin.right,
    innerHeight  = outerHeight - margin.top   - margin.bottom,
    width        = innerWidth  - padding.left - padding.right,
    height       = innerHeight - padding.top  - padding.bottom;

//Creation of canvas
var svg = d3.select('#my_dataviz').append('svg')
                .attr('width', "100%")
                .attr('height', "100%")
                .attr("fill", outercolor);

//Tooltip for nodes
var div = d3.select("body").append("div")
    .attr("class", "tooltip card border-warning mb-3")
    .style("opacity", 0);

//Tooltip for lines
var div2 = d3.select("body").append("div")
    .attr("class", "tooltip card border-warning mb-3")
    .style("opacity", 0);

//Function for zooming
var inner = svg.append('g')
            .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');

svg.call(d3.zoom().on("zoom", function () {
  inner.attr("transform", d3.event.transform)
}))

svg.on("click",
  function(){
    while (selected_nodes.length > 0) {
      d3.select(selected_nodes.pop()).style("stroke-width",0);
    }
    while (selected_links.length > 0){
      d3.select(selected_links.pop()).style("stroke", linkcolor);
    }
  }
)


// force simulator
var simulation = d3.forceSimulation();

// set up the simulation and event to update locations after each tick
function initializeSimulation() {
  simulation.nodes(graph.nodes);
  initializeForces();
  simulation.on("tick", ticked);
}

// add forces to the simulation
function initializeForces() {
    // add forces and associate each with a name
    simulation
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    // apply properties to each of the forces
    updateForces();
}

// apply new force properties
function updateForces() {

    simulation.force("charge")
        .strength(-1*strength);
    simulation.force("link")
        .id(function(d) {return d.id;});

    simulation.alpha(1).restart();
}

// generate the svg objects and force simulation
function initializeDisplay() {

  link = inner.append("g")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke-width", function(d) { return (d.colabs); })
      .style("stroke", linkcolor)
      .on("click", function(d) {
        d3.event.stopPropagation();
        /*if (!selected_links.includes(this)){
            selected_links.push(this);
          }*/
        if (selected_nodes.length > 0){
            selected_nodes.pop();
        }
        d3.select(selected_links.pop()).style("stroke", linkcolor);
        selected_links.push(this);
        d3.select(this).style("stroke","red");
        return show_tooltip_link(d, div2, true);
      })
      .on("mouseover", function(d) {
        d3.select(this).style("stroke","red");
        return show_tooltip_link(d, div2, false);})
      .on("mouseout", function(d) {
        if (!selected_links.includes(this)){
          d3.select(this).style("stroke",linkcolor);
        }
        return hide_tooltip(div2);});


node = inner.append("g")
    .attr("class", "nodes")
    .selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .style("stroke", "red").style("stroke-width",0)
    .style("fill", function(d) {return d.color})
    .attr("class", function(d) {
      return d.type + " node";
    })
    .on("mouseover", function(d) {
          d3.select(this).style("stroke-width",3);
          return show_tooltip_node(d, div, false);
        })
    .on("click", function(d) {
      d3.event.stopPropagation();
      /*if (!selected_nodes.includes(this)){
          selected_nodes.push(this);
      }*/
      if (selected_links.length > 0){
        selected_links.pop();
      }
      d3.select(selected_nodes.pop()).style("stroke-width", 0);
      selected_nodes.push(this);
      d3.select(this).style("stroke-width",3);
      return show_tooltip_node(d, div, true);
    })
    .on("mouseout", function(d) {
      if (!selected_nodes.includes(this)){
        d3.select(this).style("stroke-width",0);
      }
      hide_tooltip(div);
    })
    .call(d3.drag()
       .on("start", dragstarted)
       .on("drag", dragged)
       .on("end", dragended));

d3.selectAll(".triangle-down").append("rect")
  .attr("width", function(d) {return circlefact*Math.log(d.pubs + 2)})
  .attr("height",function(d) {return circlefact*Math.log(d.pubs + 2)})
  .attr("x", "-16px")
  .attr("y", "-16px")
  .attr("class", function(d) {
     return "color_" + d.color
  }).size(1000);

d3.selectAll(".triangle-up").append("ellipse")
  .attr("rx", function(d) {return 0.5*circlefact*Math.log(d.pubs + 2)})
  .attr("ry",function(d) {return 0.5*circlefact*Math.log(d.pubs + 2)})
  .attr("width", function(d) {return circlefact*Math.log(d.pubs + 2)})
  .attr("height",function(d) {return circlefact*Math.log(d.pubs + 2)})
  .attr("x", "-16px")
  .attr("y", "-16px")
  .attr("class", function(d) {
     return "color_" + d.color
  });
}

d3.json("data.json", function(error, _graph) {
  if (error) throw error;
  graph = _graph;
  initializeDisplay();
  initializeSimulation();

  simulation.force("link")
      .links(graph.links);
});

// update the display positions after each simulation tick
function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
      });

}

// update the display based on the forces (but not positions)
function updateDisplay() {
    node.attr("r", function(d) {return  circlefact*Math.log(d.pubs + 2)})
}


// convenience function to update everything (run after UI input)
function updateAll() {
    updateForces();
    updateDisplay();
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function show_tooltip_link(d, mydiv, mybool) {

  //Make div appear
  mydiv.transition()
      .duration(200)
      .style("opacity", .95);

  var content = d.colabs + " publicaciones";
  var thename =  d.sourcename  + "-" + d.targetname;

  //Add card header
  mydiv.html("<div class='card-header'><h5>" +  thename + "</h5></div>" +
  "<div class = 'card-body'><p class='card-text'>" + content)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");

  //Add link header
  //$("#linkornode").text("LINK")
  //Add node Header
  if (mybool) {
    $("#nodename").text(thename);
    $("#nodep").html(content);
  };
}

function show_tooltip_node(d, mydiv, clicked) {

  //Make div appear
  mydiv.transition()
      .duration(200)
      .style("opacity", .95);

  var content = "<p class='card-text'>" +
    "<i>" + d.depto + "</i>" + "<br/>" +
    "Publicaciones " + d.pubs + "</p>";
  var thename = d.name;

  //Add card header
  mydiv.html("<div class='card-header'><h5>" + d.name + "</h5></div>" +
  "<div class = 'card-body'>" + content + "</div>")
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px")
      .style("border-color", "red");

  //Add node Header
  if (clicked) {
    $("#nodename").text(thename);
    $("#nodep").html(content);
  };

}

function hide_tooltip(mydiv) {
  mydiv.transition()
      .duration(500)
      .style("opacity", 0);
}
