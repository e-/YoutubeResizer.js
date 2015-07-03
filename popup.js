function updateOn(on){
  chrome.runtime.sendMessage({
    type: "updateOn",
    on: on
  });
}

function updateScale(scale){
  $("#scale").val(scale);
  chrome.runtime.sendMessage({
    type: "updateScale",
    scale: scale
  });
}

function updateX(x){
  $("#x").val(x);
  chrome.runtime.sendMessage({
    type: "updateX",
    x: x
  });
}

function updateY(y){
  $("#y").val(y);
  chrome.runtime.sendMessage({
    type: "updateY",
    y: y
  });
}

$(function(){
  chrome.runtime.sendMessage({
    type: "initialize"
  }, function(res){
    // do not use updateScale because it can cause infinite message passing
    $("#on").bootstrapSwitch({
      state: res.on,
      size: "small",
      onSwitchChange: function(event, state){
        $("#x, #y, #scale").attr("disabled", !state);
        updateOn(state);
      }
    }).val(res.on);
    $("#x, #y, #scale").attr("disabled", !res.on);
    $("#scale").val(res.scale);
    $("#x").val(res.x);
    $("#y").val(res.y);
  });

  $("#scale").on("mousewheel", function(event) {
    var event = window.event;
    event.preventDefault();
    $this = $(this);
    $inc = parseFloat($this.attr('step'));
    $max = parseFloat($this.attr('max'));
    $min = parseFloat($this.attr('min'));
    $currVal = parseFloat($this.val());

    // If blank, assume value of 0
    if (isNaN($currVal)) {
      $currVal = 0.0;
    }
    // Increment or decrement numeric based on scroll distance
    if (event.deltaY < 0) {
      if ($currVal + $inc <= $max) {
        updateScale(Math.round(($currVal + $inc) * 100) / 100);
      }
    } else {
      if ($currVal - $inc >= $min) {
        updateScale(Math.round(($currVal - $inc) * 100) / 100);
      }
    }
  }).on("change", function(event){
    updateScale(parseFloat($(this).val()));
  });

  $("#x").on("mousewheel", function(event) {
    var event = window.event;
    event.preventDefault();
    $this = $(this);
    $inc = parseFloat($this.attr('step'));
    $max = parseFloat($this.attr('max'));
    $min = parseFloat($this.attr('min'));
    $currVal = parseFloat($this.val());

    // If blank, assume value of 0
    if (isNaN($currVal)) {
      $currVal = 0.0;
    }
    // Increment or decrement numeric based on scroll distance
    if (event.deltaY < 0) {
      if ($currVal + $inc <= $max) {
        updateX(Math.round(($currVal + $inc) * 100) / 100);
      }
    } else {
      if ($currVal - $inc >= $min) {
        updateX(Math.round(($currVal - $inc) * 100) / 100);
      }
    }
  }).on("change", function(event){
    updateX(parseFloat($(this).val()));
  });

  $("#y").on("mousewheel", function(event) {
    var event = window.event;
    event.preventDefault();
    $this = $(this);
    $inc = parseFloat($this.attr('step'));
    $max = parseFloat($this.attr('max'));
    $min = parseFloat($this.attr('min'));
    $currVal = parseFloat($this.val());

    // If blank, assume value of 0
    if (isNaN($currVal)) {
      $currVal = 0.0;
    }
    // Increment or decrement numeric based on scroll distance
    if (event.deltaY < 0) {
      if ($currVal + $inc <= $max) {
        updateY(Math.round(($currVal + $inc) * 100) / 100);
      }
    } else {
      if ($currVal - $inc >= $min) {
        updateY(Math.round(($currVal - $inc) * 100) / 100);
      }
    }
  }).on("change", function(event){
    updateY(parseFloat($(this).val()));
  });
})
