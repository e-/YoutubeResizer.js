var on = false,
    scale = 1.0,
    x = 0,
    y = 0
    ;

function injectScripts(){
  chrome.tabs.query({
    url: [
      "http://www.youtube.com/*",
      "https://www.youtube.com/*"
    ]
  }, function(tabs){
    for(var tabId in tabs){
      var tab = tabs[tabId];
      chrome.tabs.executeScript(tab.id, {
        file: "jquery-2.1.4.min.js"
      }, function(){
        chrome.tabs.executeScript(tab.id, {
          file: "content_script.js"
        });
      });
    }
  });
}

chrome.webNavigation.onCompleted.addListener(function(details) {
  //console.log(details);
  if(on) {
    injectScripts();
  }
}, {
  url: [
    {
      hostContains: "youtube.com"
    }
  ]
});

function updateTabs(){
  chrome.tabs.query({
    url: [
      "http://www.youtube.com/*",
      "https://www.youtube.com/*"
    ]
  }, function(tabs){
    for(var tabId in tabs){
      var tab = tabs[tabId];
      chrome.tabs.sendMessage(tab.id, {
        type: "update",
        on: on,
        scale: scale,
        x: x,
        y: y
      });
    }
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.type == "initialize") {
    sendResponse({
      on: on,
      scale: scale,
      x: x,
      y: y
    });
  }
  else if(request.type == "updateScale") {
    scale = request.scale;
    updateTabs();
  }
  else if(request.type == "updateOn") {
    on = request.on;
    if(on) {
      injectScripts();
      chrome.browserAction.setIcon({
        path: 'icon-active.png'
      });
    } else {
      chrome.browserAction.setIcon({
        path: 'icon-normal.png'
      });
    }
    updateTabs();
  }
  else if(request.type == "updateX") {
    x = request.x;
    updateTabs();
  }
  else if(request.type == "updateY") {
    y = request.y;
    updateTabs();
  }
});
