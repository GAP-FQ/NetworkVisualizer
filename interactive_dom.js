var npanel = true;
var dpanel = true;
var fpanel = true;
var opanel = true;

$(document).ready(function() {


  $('#selectdept option').prop('selected', true);
  $('#selectsex option').prop('selected', true);
  $("#selectdept option:eq(0)").prop('selected',false) //TODOS
  $("#selectdept option:eq(1)").prop('selected',false) //NINGUNO

  //https://stackoverflow.com/questions/8641729/how-to-avoid-the-need-for-ctrl-click-in-a-multi-select-box-using-javascript
  $('option').mousedown(function(e) {
      e.preventDefault();
      $(this).prop('selected', !$(this).prop('selected'));
      var misdeptos = $("#selectdept").val();
      var misexo    = $("#selectsex").val();
      var todos     = misdeptos.includes("[TODOS]")
      var ninguno   = misdeptos.includes("[NINGUNO]")
      if (todos){
        misdeptos.splice(misdeptos.indexOf("[TODOS]"), 1);
      }

      if (ninguno){
        misdeptos.splice(misdeptos.indexOf("[NINGUNO]"), 1);
      }

      //Loop through se and dept
      if (misexo == null){
        d3.selectAll(".node,.link").attr("visibility","hidden");
      } else if (misdeptos == null){
        d3.selectAll(".node,.link").attr("visibility","hidden");
      } else if (todos){
        d3.selectAll(".node,.link").attr("visibility","visible");
        $('#selectdept option').prop('selected', true);
        $("#selectdept option:eq(0)").prop('selected',false)
        $("#selectdept option:eq(1)").prop('selected',false) //NINGUNO
      } else if (ninguno){
        d3.selectAll(".node,.link").attr("visibility","hidden");
        $('#selectdept option').prop('selected', false);
      } else {
        var deptoclass = "." + misdeptos.join(",.")
        var sexoclass  = "." + misexo.join(",.")

        let hiddendept = "." + misdeptos
                 .filter(x => !uniquecolor.includes(x))
                 .concat(uniquecolor.filter(x => !misdeptos.includes(x)))
                 .join(",.");
        let hiddensex = "." + misexo
                 .filter(x => !uniquetype.includes(x))
                 .concat(uniquetype.filter(x => !misexo.includes(x)))
                 .join(",.");

        d3.selectAll(deptoclass + sexoclass).attr("visibility","visible")
        if (hiddendept != "."){
          d3.selectAll(hiddendept).attr("visibility","hidden")
        }
        if (hiddensex != "."){
          d3.selectAll(hiddensex).attr("visibility","hidden")
        }
      }
      return false;
  });


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

  function FixPanels() {

    //All panels open
    if (fpanel & dpanel & opanel) {

      $("#leftpanel").animate({
        'left': '0%'
      });
      $("#infopanel").animate({
        'left': '0px'
      });

      $("#fpanel").animate({
        'left': '20%'
      });
      $("#filterpanel").animate({
        'left': '20%'
      });

      $("#optpanel").animate({
        'left': '40%'
      });
      $("#optionpanel").animate({
        'left': '40%'
      });

    } else if (!fpanel & dpanel & opanel) {

      $("#leftpanel").animate({
        'left': '0%'
      });
      $("#infopanel").animate({
        'left': '0px'
      });

      $("#fpanel").animate({
        'left': '20%'
      });
      $("#filterpanel").animate({
        'left': '13.7%'
      });

      $("#optpanel").animate({
        'left': '20%'
      });
      $("#optionpanel").animate({
        'left': '20%'
      });

    } else if (fpanel & !dpanel & opanel) {

      $("#leftpanel").animate({
        'left': '0%'
      });
      $("#infopanel").animate({
        'left': '0px'
      });

      $("#fpanel").animate({
        'left': '0%'
      });
      $("#filterpanel").animate({
        'left': '6.3%'
      });

      $("#optpanel").animate({
        'left': '20%'
      });
      $("#optionpanel").animate({
        'left': '20%'
      });

    } else if (fpanel & dpanel & !opanel) {

      $("#leftpanel").animate({
        'left': '0%'
      });
      $("#infopanel").animate({
        'left': '0px'
      });

      $("#fpanel").animate({
        'left': '20%'
      });
      $("#filterpanel").animate({
        'left': '20%'
      });

      $("#optpanel").animate({
        'left': '40%'
      });
      $("#optionpanel").animate({
        'left': '40%'
      });

    } else if (!fpanel & !dpanel & opanel) {

      $("#leftpanel").animate({
        'left': '0%'
      });
      $("#infopanel").animate({
        'left': '0px'
      });

      $("#fpanel").animate({
        'left': '0%'
      });
      $("#filterpanel").animate({
        'left': '6.3%'
      });

      $("#optpanel").animate({
        'left': '0%'
      });
      $("#optionpanel").animate({
        'left': '12.6%'
      });

    } else if (!fpanel & dpanel & !opanel) {

      $("#leftpanel").animate({
        'left': '0%'
      });
      $("#infopanel").animate({
        'left': '0px'
      });

      $("#fpanel").animate({
        'left': '20%'
      });
      $("#filterpanel").animate({
        'left': '20%'
      });

      $("#optpanel").animate({
        'left': '20%'
      });
      $("#optionpanel").animate({
        'left': '26.3%'
      });

    } else if (fpanel & !dpanel & !opanel) {

      $("#leftpanel").animate({
        'left': '0%'
      });
      $("#infopanel").animate({
        'left': '0px'
      });

      $("#fpanel").animate({
        'left': '0%'
      });
      $("#filterpanel").animate({
        'left': '6.3%'
      });

      $("#optpanel").animate({
        'left': '20%'
      });
      $("#optionpanel").animate({
        'left': '20%'
      });

    } else if (!fpanel & !dpanel & !opanel) {

      $("#leftpanel").animate({
        'left': '0%'
      });
      $("#infopanel").animate({
        'left': '0px'
      });

      $("#fpanel").animate({
        'left': '0%'
      });
      $("#filterpanel").animate({
        'left': '6.3%'
      });

      $("#optpanel").animate({
        'left': '0%'
      });
      $("#optionpanel").animate({
        'left': '12.6%'
      });

    }

  }

  //Close gpanel
  $("#infopanel").click(function() {

    //Change npanel
    dpanel = !dpanel;

    //Toogle node panel
    $("#leftpanel").slideToggle();

    //If infopanel is closed but options and filter open
    FixPanels();

  });
  //Click o
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 73) {
      $("#infopanel").trigger("click");
    }
  });

  //Close gpanel
  $("#filterpanel").click(function() {

    //Change npanel
    fpanel = !fpanel;

    //Toogle node panel
    $("#fpanel").slideToggle();

    FixPanels();

  });
  //Click o
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 70) {
      $("#filterpanel").trigger("click");
    }
  });

  //Close gpanel
  $("#nodepanel").click(function() {

    //Change npanel
    npanel = !npanel;

    //Toogle node panel
    $("#rightpanel").slideToggle();

    //Check if gpanel is open
    if (!npanel) {
      $("#panelgraph").animate({
        'right': '0%'
      });
      $("#graphpanel").animate({
        'right': '6.3%'
      })
    } else if (npanel) {
      $("#panelgraph").animate({
        'right': '20%'
      });
      $("#graphpanel").animate({
        'right': '20%'
      })
    }

  });
  //Click o
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 78) {
      $("#nodepanel").trigger("click");
    }
  });

  //Close gpanel
  $("#optionpanel").click(function() {
    opanel = !opanel;
    $("#optpanel").slideToggle();
    FixPanels();
  });
  //Click o
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 79) {
      $("#optionpanel").trigger("click");
    }
  });


  //Close gpanel
  $("#graphpanel").click(function() {
    $("#panelgraph").slideToggle();
  });
  //Click o
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 71) {
      $("#graphpanel").trigger("click");
    }
  });

  //OPTIONS PANEL
  //---------------------------------------------------------------
  $("#inputStrength").change(function() {
    forceProperties.charge.strength = this.value;
    updateAll();
  });

  $("#inputNodeSize").change(function() {
    node_size = this.value;
    updateAll();
  });

  $("#inputLinkSize").change(function() {
    link_size = this.value;
    updateAll();
  });

  $("#inputCenterX").on('input', function() {
    forceProperties.center.x = this.value;
    updateAll();
  });

  $("#inputCenterY").on('input', function() {
    forceProperties.center.y = this.value;
    updateAll();
  });

  $("#inputDistanceMin").change(function() {
    forceProperties.charge.distanceMin = this.value;
    updateAll();
  });

  $("#inputDistanceMax").change(function() {
    forceProperties.charge.distanceMax = this.value;
    updateAll();
  });

  $("#inputCollision").change(function() {
    forceProperties.collide.strength = this.value;
    updateAll();
  });

  $("#inputYGravity").on('input', function() {
    forceProperties.forceY.strength = this.value;
    updateAll();
  });

  $("#inputXGravity").on('input', function() {
    forceProperties.forceX.strength = this.value;
    updateAll();
  })

  $("#inputXGravityCoordinate").change(function() {
    forceProperties.forceX.x = this.value;
    updateAll();
  });

  $("#inputYGravityCoordinate").change(function() {
    forceProperties.forceY.y = this.value;
    updateAll();
  });

  $("#inputLinkDistance").change(function() {
    forceProperties.link.distance = this.value;
    updateAll();
  });

  $("#resetbutton").click(function() {

    forceProperties = $.extend(true, {}, forcePropertiesOriginal);
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

  //---------------------------------------------------------------


  //Hide on start
  $("#infopanel").trigger("click");
  $("#graphpanel").trigger("click");
  $("#nodepanel").trigger("click");
  $("#optionpanel").trigger("click");

  //Add loading message on start
  //LoadingMessage()



});
