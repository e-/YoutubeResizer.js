var timer;
var resize;

if(!window.initialized) {
  window.initialized = true;
  function update(){
    if(resize.on){
      jQuery('.html5-main-video')
        .css('transform', 'scale(' + resize.scale + ')')
        .css('transform-origin', (resize.x * 100) + '% ' + (resize.y * 100) + '%')
    } else {
      clearInterval(timer);
      jQuery('.html5-main-video')
        .css('transform', '')
        .css('transform-origin', '')
        ;
    }
  }

  jQuery(function(){
    chrome.runtime.sendMessage({
      type: "initialize"
    }, function(res){
      resize = {
        on: res.on,
        scale: res.scale,
        x: res.x,
        y: res.y
      };

      if(timer) clearInterval(timer);
      update();
      timer = setInterval(update, 1000);
    });
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == "update") {
      resize = {
        on: request.on,
        scale: request.scale,
        x: request.x,
        y: request.y
      };
      update();
      if(resize.on) {
        if(timer) clearInterval(timer);
        timer = setInterval(update, 1000);
      }
    }
  });
}
