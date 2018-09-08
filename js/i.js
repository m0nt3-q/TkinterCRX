var body = document.querySelector("body");
var script = document.createElement("script");

script.setAttribute("type", "text/javascript");
script.setAttribute("src", chrome.extension.getURL("js/l.js"));

body.appendChild(script);
