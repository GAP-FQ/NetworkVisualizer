var npanel = true;
var dpanel = true;

$(document).ready(function(){


  //STarting values
  $("#inputNodeSize").val(node_size);
  $("#inputLinkSize").val(link_size);
  $("#inputStrength").val(forceProperties.charge.strength);
  $("#inputCenterX").val(forceProperties.center.x);
  $("#inputCenterY").val(forceProperties.center.y);
  $("#inputDistanceMin").val(forceProperties.charge.distanceMin);
  $("#inputDistanceMax").val(forceProperties.charge.distanceMax);
  $("#inputCollision").val(forceProperties.collide.strength);
  $("#inputXGravity").val(forceProperties.forceX.strength);
  $("#inputYGravity").val(forceProperties.forceY.strength);
  $("#inputXGravityCoordinate").val(forceProperties.forceX.x);
  $("#inputYGravityCoordinate").val(forceProperties.forceY.y);
  $("#inputLinkDistance").val(forceProperties.link.distance);

  //Close gpanel
  $("#datapanel").click(function(){

    //Change npanel
    dpanel = !dpanel;

    //Toogle node panel
    $("#leftpanel").slideToggle();

    //Check if gpanel is open
    if (!dpanel){
      $("#optpanel").animate({'left':'0%'});
      $("#optionpanel").animate({'left':'80px'})
    } else if (dpanel) {
      $("#optpanel").animate({'left':'20%'});
      $("#optionpanel").animate({'left':'20%'})
    }

  });
  $("#datapanel").trigger( "click" );

  //Close gpanel
  $("#nodepanel").click(function(){

    //Change npanel
    npanel = !npanel;

    //Toogle node panel
    $("#rightpanel").slideToggle();

    //Check if gpanel is open
    if (!npanel){
      $("#panelgraph").animate({'right':'0%'});
      $("#graphpanel").animate({'right':'80px'})
    } else if (npanel) {
      $("#panelgraph").animate({'right':'20%'});
      $("#graphpanel").animate({'right':'20%'})
    }

  });

  //Close gpanel
  $("#optionpanel").click(function(){
    $("#optpanel").slideToggle();
  });

  //Close gpanel
  $("#graphpanel").click(function(){
    $("#panelgraph").slideToggle();
  });
  $("#graphpanel").trigger( "click" );

  //Read data
  $("#inputStrength").change(function(){
    forceProperties.charge.strength = this.value;
    updateAll();
  });

  //Read data
  $("#inputNodeSize").change(function(){
    node_size = this.value;
    updateAll();
  });

  //Read data
  $("#inputLinkSize").change(function(){
    link_size = this.value;
    updateAll();
  });

  $("#inputCenterX").on('input',function(){
    forceProperties.center.x = this.value;
    updateAll();
  });

  $("#inputCenterY").on('input',function(){
    forceProperties.center.y = this.value;
    updateAll();
  });


  $("#inputDistanceMin").change(function(){
    forceProperties.charge.distanceMin = this.value;
    updateAll();
  });

  $("#inputDistanceMax").change(function(){
    forceProperties.charge.distanceMax = this.value;
    updateAll();
  });

  $("#inputCollision").change(function(){
    forceProperties.collide.strength = this.value;
    updateAll();
  });

  $("#inputYGravity").on('input',function(){
    forceProperties.forceY.strength = this.value;
    updateAll();
  });

  $("#inputXGravity").on('input',function(){
    forceProperties.forceX.strength = this.value;
    updateAll();
  })

  $("#inputXGravityCoordinate").change(function(){
    forceProperties.forceX.x = this.value;
    updateAll();
  });

  $("#inputYGravityCoordinate").change(function(){
    forceProperties.forceY.y = this.value;
    updateAll();
  });

  $("#inputLinkDistance").change(function(){
    forceProperties.link.distance = this.value;
    updateAll();
  });

  $("#resetbutton").click(function(){

    forceProperties =  $.extend(true,{},forcePropertiesOriginal);
    $("#inputStrength").val(forcePropertiesOriginal.charge.strength)
    $("#inputNodeSize").val(node_size);
    $("#inputLinkSize").val(link_size);
    $("#inputCenterX").val(forcePropertiesOriginal.center.x);
    $("#inputCenterY").val(forcePropertiesOriginal.center.y);
    $("#inputDistanceMin").val(forcePropertiesOriginal.charge.distanceMin);
    $("#inputDistanceMax").val(forcePropertiesOriginal.charge.distanceMax);
    $("#inputCollision").val(forcePropertiesOriginal.collide.strength);
    $("#inputXGravity").val(forcePropertiesOriginal.forceX.strength);
    $("#inputYGravity").val(forcePropertiesOriginal.forceY.strength);
    $("#inputXGravityCoordinate").val(forcePropertiesOriginal.forceX.x);
    $("#inputYGravityCoordinate").val(forcePropertiesOriginal.forceY.y);
    $("#inputLinkDistance").val(forcePropertiesOriginal.link.distance);

    updateAll();

  })

});
