var gpanel = true;
var npanel = true;

$(document).ready(function(){

  //STarting values
  $("#inputNodeSize").val(node_size);
  $("#inputLinkSize").val(link_size);
  $("#inputStrength").val(forceProperties.charge.strength);


  //Close gpanel
  $("#nodepanel").click(function(){

    //Change npanel
    npanel = !npanel;

    //Toogle node panel
    $("#rightpanel").slideToggle();

    //Check if gpanel is open
    if (gpanel & !npanel){
      $("#panelgraph").animate({'right':'0%'});
      $("#graphpanel").animate({'right':'80px'})
    } else if (gpanel & npanel) {
      $("#panelgraph").animate({'right':'20%'});
      $("#graphpanel").animate({'right':'20%'})
    }

  });

  //Close gpanel
  $("#graphpanel").click(function(){
    $("#panelgraph").slideToggle();
  });

  //Data panel
  $("#datapanel").click(function(){
    $("#leftpanel").slideToggle();
  })

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

});
