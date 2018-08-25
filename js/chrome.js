/*
 *
 *
 *
 */


var TkConf = {};


chrome.browserAction.onClicked.addListener(function(Tab) {
  //
  // Setup and Search for TK Config values
  //

  chrome.windows.create({
    url: "index.html", type: "popup", width: TkConf.w, height: TkConf.h
  }, function(ChromeWindow) {
  });
});


chrome.runtime.onConnectExternal.addListener(function(TkPort) {
  if(TkPort.name !== "TkConf") {
    TkPort.disconnect();
  }

  TkPort.onMessage.addListener(function(Msg) {
    console.log("Message", Msg);

    if(Msg) {
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
