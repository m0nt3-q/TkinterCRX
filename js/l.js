/*
 *
 *
 *
 */


// Change this when published
var extID = "adbibgpgaldecdalmnlphldocdmgepjm";
//console.log(window.location.origin);

if(window.location.origin == "https://www.hackingtons.com") {
  const port = chrome.runtime.connect(extID, { name: "TkConf" });

  port.onMessage.addListener(function(Msg) {
    console.log(Msg);
    if(Msg) {
    }
  });

  port.onDisconnect.addListener(function(Msg) {
    if(chrome.runtime.lastError) {
      console.log("Runtime Error", chrome.runtime.lastError);
    }
    else {
      console.log("Port Disconnected", Msg);
    }
  });
}


document.body.addEventListener("mousedown", function(Ev) {
  console.log(Ev.target);
  var documentTree = Ev.target.ownerDocument.body.innerHTML;
});
