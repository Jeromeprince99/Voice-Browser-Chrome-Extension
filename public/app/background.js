

var contentScriptPort,
activeTabId = 0,
optionsPageOpen = false;

chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
  activeTabId = activeTab[0].id;
  contentScriptPort = chrome.tabs.connect(activeTabId , {name: "voice-browser-speech-connection"});
})

chrome.tabs.onActivated.addListener(function(activeTabInfo){
  contentScriptPort.disconnect();
  activeTabId = activeTabInfo.tabId;
  contentScriptPort = chrome.tabs.connect(activeTabId , {name: "voice-browser-speech-connection"});
  if(!optionsPageOpen){
    contentScriptPort.postMessage({disableApp : true});
  }else{
    contentScriptPort.postMessage({enableApp : true});
  }
})

chrome.tabs.onCreated.addListener(function(activeTabInfo){
  contentScriptPort.disconnect();
  activeTabId = activeTabInfo.id;
  contentScriptPort = chrome.tabs.connect(activeTabId , {name: "voice-browser-speech-connection"});
  if(!optionsPageOpen){
    contentScriptPort.postMessage({disableApp : true});
  }else{
    contentScriptPort.postMessage({enableApp : true});
  }
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.active === true && changeInfo.status === 'complete') {
    contentScriptPort.disconnect();
    activeTabId = tabId;
    contentScriptPort = chrome.tabs.connect(activeTabId , {name: "voice-browser-speech-connection"});
    if(!optionsPageOpen){
      contentScriptPort.postMessage({disableApp : true});
    }else{
      contentScriptPort.postMessage({enableApp : true});
    }
  }
});

chrome.runtime.onConnect.addListener(function(port){
  if(port.name === "spokenTextToBgScript"){
    port.onMessage.addListener(function(msg){
      if(msg.IamOpen === true){
        optionsPageOpen = true;
        contentScriptPort.postMessage({enableApp : true});
      }
      if(msg.IamOpen === false){
        optionsPageOpen = false;
        contentScriptPort.postMessage({disableApp : true});
      }
      if(msg.finalText){
        contentScriptPort.postMessage({finalText: msg.finalText});
      }
      if(msg.interimText){
        contentScriptPort.postMessage({interimText: msg.interimText});
      }
      if(msg.volumeLevel){
        contentScriptPort.postMessage({volumeLevel: msg.volumeLevel});
      }
    });
  }
})

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
   var newURL = "/options.html";
   optionsPageOpen = true;
   chrome.tabs.query({}, function(tabs) {
      for (let i = 0, tab; tab = tabs[i]; i++) {
          if (tab.url===("chrome-extension://"+ chrome.runtime.id + newURL)) {
              chrome.tabs.reload(tab.id, {}, function(){});
              chrome.tabs.update(tab.id, {active: true});
              return;
          }
      }
      chrome.tabs.create({ url: newURL });
   });
  
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.module == "openURL" || request.module == "Search")
    { 
      chrome.tabs.create({ url: request.url });
    }else if(request.module == "zoom.in"){
      chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
        chrome.tabs.getZoom(activeTab[0].id, function (zoomValue) {
          chrome.tabs.setZoom(activeTab[0].id, zoomValue + 0.1, function(response){
          });
        });
      });
    }else if(request.module == "zoom.out"){
      chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
        chrome.tabs.getZoom(activeTab[0].id, function (zoomValue) {
          chrome.tabs.setZoom(activeTab[0].id, zoomValue - 0.1, function(response){
          });
        })
       });
    }else if(request.module == "navigation.reload"){
      chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
        chrome.tabs.reload(activeTab[0].id);
      });
    }else if(request.module == "navigation.goforward"){
      chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
        chrome.tabs.goForward(activeTab[0].id);
      });
    }else if(request.module == "navigation.goback"){
      chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
        chrome.tabs.goBack(activeTab[0].id);
      });
    }else if(request.module == "tabs.goToPrevious"){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length) {
          var activeTab = tabs[0],
          currentIndex = activeTab.index;
          // next, get number of tabs in the window, in order to allow cyclic next
          chrome.tabs.query({currentWindow: true}, function (tabs) {
            var numTabs = tabs.length;
            // finally, get the id of the tab to activate and activate it
            chrome.tabs.query({index: (currentIndex-1) % numTabs}, function(tabs){
              if (tabs.length) {
                var tabToActivate = tabs[0],
                tabToActivate_Id = tabToActivate.id;
                chrome.tabs.update(tabToActivate_Id, {active: true});
              }
            });
          });
        }
      });
    }else if(request.module == "tabs.goToNext"){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length) {
          var activeTab = tabs[0],
          currentIndex = activeTab.index;
          // next, get number of tabs in the window, in order to allow cyclic next
          chrome.tabs.query({currentWindow: true}, function (tabs) {
            var numTabs = tabs.length;
            // finally, get the id of the tab to activate and activate it
            chrome.tabs.query({index: (currentIndex+1) % numTabs}, function(tabs){
              if (tabs.length) {
                var tabToActivate = tabs[0],
                tabToActivate_Id = tabToActivate.id;
                chrome.tabs.update(tabToActivate_Id, {active: true});
              }
            });
          });
        }
      });
    }else if(request.module == "tabs.createNew"){
      chrome.tabs.create({url:'https://google.com'})
    }else if(request.module == "tabs.closeCurrent"){
      chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
        chrome.tabs.remove(activeTab[0].id);
      });
    }else if(request.context == "clipboardAccess"){
      if(request.readOrWrite == "read"){
        // Read text from the clipboard, or "paste"
        const el = document.createElement('textarea');
        el.value = '';
        document.body.append(el);
  
        // Paste from clipboard into input
        el.select();
        const success = document.execCommand('paste');
  
        // The contents of the clipboard
        const text = el.value;
        el.remove();
        sendResponse({pasteData: text});
      }else{
        // Create hidden input with text
        const el = document.createElement('textarea');
        el.value = request.copyData;
        document.body.append(el);

        // Select the text and copy to clipboard
        el.select();
        const success = document.execCommand('copy');
        el.remove();
      }   
    }
  }
);