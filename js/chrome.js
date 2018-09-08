/*
 *
 *
 *
 */


var TkConf = {};


chrome.browserAction.onClicked.addListener(function(Tab) {
  /*
   *
   */
});


chrome.runtime.onConnectExternal.addListener(function(TkPort) {
  console.log("Connected webpage", TkPort);

  if(TkPort.name !== "TkConf") {
    TkPort.disconnect();
  }

  TkPort.onMessage.addListener(function(Msg) {
    console.log("Message", Msg);

    if(Msg) {
      if(Msg.code) {
        // Parse code for Tkinter methods.
        // Setup TkConf
      }

      if(Msg.gui) {
        switch(Msg.gui) {
          // Open GUI and build visuals
          case 0x1337:
            chrome.windows.create({
              url: "index.html", type: "popup", width: TkConf.w, height: TkConf.h
            }, function(ChromeWindow) {
            });
          break;
        }
      }
      //TkPort.postMessage({});
    }
  });

  TkPort.onDisconnect.addListener(function(Msg) {
    if(chrome.runtime.lastError) {
      console.log("Runtime Error (Disconnect)", chrome.runtime.lastError);
    }
    else {
      console.log("Port Disconnected", Msg);
    }
  });
});
