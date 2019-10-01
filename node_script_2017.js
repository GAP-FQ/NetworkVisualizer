//SEE
//https://gist.github.com/steveharoz/8c3e2524079a8c440df60c1ab72b5d03#file-code-js
//http://pablobarbera.com/big-data-upf/html/02b-networks-descriptive-analysis.html
//https://bl.ocks.org/steveharoz/raw/8c3e2524079a8c440df60c1ab72b5d03/

//Variables
var node_size = 75;
var link_size = 1;
var outercolor = "#2B3E50";
var linkcolor = "white";
var selected_nodes = [];
var selected_links = [];
var selected_color = "orange";
var selected_size = 7;
var node_border_size = 0.5
var database = "profesores_2017.json";
var typename  = "sex";
var colorname = "department";
var sizename = "pubs";
var uniquetype = ["M", "F"];
var uniquecolor = ['Ingeniería Química', 'Ingeniería Metalúrgica', 'Bioquímica',
'Química Orgánica', 'Alimentos y Biotecnología', 'Física y Química Teórica',
'Biología', 'Química Analítica', 'Química Inorgánica y Nuclear', 'Fisicoquímica',
'Farmacia', 'SISAL', 'USAII', 'Matemáticas'].map(function(x){ return x.replace(/\s/g, '');});
var scaletype = "linear" //"log"
var loading_hidden = false;

//Additional functions
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

//Get d3js symbols
var d3symbols = [d3.symbolCircle, d3.symbolSquare, d3.symbolTriangle,
  d3.symbolStar, d3.symbolDiamond, d3.symbolWye, d3.symbolCross];

var mycolors = palette('mpn65', uniquecolor.length);

// set the dimensions and margins of the graph
var margin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
};
var padding = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var innerWidth  = outerWidth  - margin.left - margin.right,
    innerHeight = outerHeight - margin.top  - margin.bottom,
    width  = innerWidth  - padding.left - padding.right,
    height = innerHeight - padding.top  - padding.bottom;

const forcePropertiesOriginal = {
  characteristics: {
    node_size: node_size,
    link_size: link_size
  },
  center: {
    x: 0.5,
    y: 0.5
  },
  charge: {
    strength: 1000,
    distanceMin: 1,
    distanceMax: 2000
  },
  collide: {
    strength: .7,
    radius: 5
  },
  forceX: {
    strength: 0.1,
    x: 0.5
  },
  forceY: {
    strength: 0.1,
    y: 0.5
  },
  link: {
    distance: 100,
  }
}

var forceProperties = $.extend(true, {}, forcePropertiesOriginal);

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

svg.call(d3.zoom().on("zoom", function() {
  inner.attr("transform", d3.event.transform)
}))

svg.on("click",
  function() {
    while (selected_nodes.length > 0) {
      d3.select(selected_nodes.pop())
      .style("stroke-width", node_border_size)
      .style("stroke", linkcolor);
    }
    while (selected_links.length > 0) {
      d3.select(selected_links.pop())
      .style("stroke", linkcolor);
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
    .force("collide", d3.forceCollide())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("forceX", d3.forceX())
    .force("forceY", d3.forceY());
  // apply properties to each of the forces
  updateForces();
}

// apply new force properties
function updateForces() {

  // get each force by name and update the properties
  simulation.force("center")
    .x(width * forceProperties.center.x)
    .y(height * forceProperties.center.y);
  simulation.force("charge")
    .strength(-1 * forceProperties.charge.strength)
    .distanceMin(forceProperties.charge.distanceMin)
    .distanceMax(forceProperties.charge.distanceMax);
  simulation.force("collide")
    .strength(forceProperties.collide.strength)
    .radius(forceProperties.collide.radius)
  simulation.force("forceX")
    .strength(forceProperties.forceX.strength)
    .x(width * forceProperties.forceX.x);
  simulation.force("forceY")
    .strength(forceProperties.forceY.strength)
    .y(height * forceProperties.forceY.y);
  simulation.force("link")
    .id(function(d) {
      return d.id;
    })
    .distance(forceProperties.link.distance);

  // updates ignored until this is run
  // restarts the simulation (important if simulation has already slowed down)
  simulation.alpha(1).restart();

}

function SelectDeselect(poparray, pusharray, myvar, nodepop) {

  //Stop d3js propagation
  d3.event.stopPropagation();

  //Push node to change color
  if (poparray.length > 0) {
    var popable = poparray.pop();
    d3.select(popable).style("stroke", linkcolor);
  }

  //Pop links
  var pushable = pusharray.pop();
  d3.select(pushable).style("stroke", linkcolor);

  //Add var to array
  pusharray.push(myvar);
  d3.select(myvar).style("stroke", selected_color);

  //Check if first variable is node
  if (nodepop) {
    d3.select(popable).style("stroke-width", node_border_size);
  } else {
    d3.select(pushable).style("stroke-width", node_border_size);
    d3.select(myvar).style("stroke-width", selected_size);
  }

}

// generate the svg objects and force simulation
function initializeDisplay() {

  link = inner.append("g")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("class", function(d) {
      return d[typename] + " link " + " " +
      d["source_dept"].replace(/\s+/g, '') + " " +
      d["target_dept"].replace(/\s+/g, '');
    })
    .attr("stroke-width", function(d) {
      return link_size*d.articlesbycouple;
    })
    .style("stroke", linkcolor)
    .on("click", function(d) {
      SelectDeselect(selected_nodes, selected_links, this, true);
      return show_tooltip_link(d, div2, true);
    })
    .on("mouseover", function(d) {
      d3.select(this).style("stroke", selected_color);
      return show_tooltip_link(d, div2, false);
    })
    .on("mouseout", function(d) {
      if (!selected_links.includes(this)) {
        d3.select(this).style("stroke", linkcolor);
      }
      return hide_tooltip(div2);
    });


  node = inner.append("g")
    .attr("class", "nodes")
    .selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .style("stroke", "white").style("stroke-width", node_border_size)
    .attr("class", function(d) {
      return d[typename].replace(/\s+/g, '') + " node " + d[colorname].replace(/\s+/g, '');
    })
    .on("mouseover", function(d) {
      d3.select(this).style("stroke-width", selected_size).style("stroke", selected_color);
      return show_tooltip_node(d, div, false);
    })
    .on("click", function(d) {
      SelectDeselect(selected_links, selected_nodes, this, false)
      return show_tooltip_node(d, div, true);
    })
    .on("mouseout", function(d) {
      if (!selected_nodes.includes(this)) {
        d3.select(this).style("stroke-width", node_border_size).style("stroke", linkcolor);
      }
      hide_tooltip(div);
    })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  for (var i = 0; i < Math.min(uniquetype.length, d3symbols.length); i++) {
    d3.selectAll("." + uniquetype[i]).append("path")
      .attr("d", d3.symbol().type(d3symbols[i]).size(function(d) {
        if (scaletype == "linear") {
          return node_size * d.Number_of_articles;
        } else if (scaletype == "log") {
          return node_size * Math.log(d.Number_of_articles + 2);
        }
      }))
      .attr("class", "vertices" + i);
  }

  for (var i = 0; i < uniquecolor.length; i++) {
    d3.selectAll("." + uniquecolor[i]).style("fill", "#" + mycolors[i]);
  }

}

d3.json(database, function(error, _graph) {
  if (error) throw error;
  graph = _graph;
  initializeDisplay();
  initializeSimulation();

  simulation.force("link")
    .links(graph.links);
});

// update the display positions after each simulation tick
function ticked() {

  link.attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  node.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

  alpha_value.innerHTML = "Cargando " + (100 - Math.round(simulation.alpha() * 100)) + '%';

  if (simulation.alpha() < 0.05 & !loading_hidden) {
    $("#loading").fadeOut();
    loading_hidden = !loading_hidden;
  } else if (simulation.alpha() > 0.8 & loading_hidden) {
    $("#loading").fadeIn();
    loading_hidden = !loading_hidden;
  }


}

// update the display based on the forces (but not positions)
function updateDisplay() {
  for (var i = 0; i < Math.min(uniquetype.length, d3symbols.length); i++) {
    d3.selectAll(".vertices" + i)
      .attr("d", d3.symbol().type(d3symbols[i]).size(function(d) {
        if (scaletype == "linear") {
          return node_size * d.Number_of_articles;
        } else if (scaletype == "log") {
          return node_size * Math.log(d.Number_of_articles + 2);
        }
      }));
  }
  d3.selectAll("line")
    .attr("stroke-width", function(d) {
      return link_size * d.articlesbycouple;
    });

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

  var content = d.articlesbycouple + " publicaciones conjuntas <br/>" +
  "Departamentos: <br/>" +
  " - " + d.source_dept + "<br/>" +
  " - " + d.target_dept + ".";
  var thename = d.source_name + "-" + d.target_name;

  //Add card header
  mydiv.html("<div class='card-header'><h5>" + thename + "</h5></div>" +
      "<div class = 'card-body'><p class='card-text'>" + content)
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px");

  //Add link header
  //$("#linkornode").text("LINK")
  //Add node Header
  if (false) { //if (bool)
    $("#nodename").text(thename.toUpperCase());
    $("#nodep").html(content);
  };
}

function show_tooltip_node(d, mydiv, clicked) {

  //Make div appear
  mydiv.transition()
    .duration(200)
    .style("opacity", .95);

  var content = "<p class='card-text'>" +
    "<i>" + d.department + "</i>" + "<br/>" +
    d.Position + "<br/>" +
    d.Email + "<br/>" +
    "Artículos: " + d.Number_of_articles + "<br/>" +
    "Colaboradores: " + d.Collaborations + "</p>";
  var thename = d.Name + " " + d.LastName1 + " " + d.LastName2;

  //Add card header
  mydiv.html("<div class='card-header'><h5>" + thename + "</h5></div>" +
      "<div class = 'card-body'>" + content + "</div>")
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px");

  //Add node Header
  if (clicked) {
    $("#nodename").text(thename.toUpperCase());
    $("#nodep").html(content);
  };

}

function hide_tooltip(mydiv) {
  mydiv.transition()
    .duration(500)
    .style("opacity", 0);
}
