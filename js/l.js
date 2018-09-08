/*
 *
 *
 *
 */


var extID = "adbibgpgaldecdalmnlphldocdmgepjm";
const Tkinter = {
  GUI: 0x1337,
  RUN: "run-it"
};


/*
 *
 */


function targetIs(Target) {
  var op = {};

  //if(Target.target.nodeName === "A")
  //console.log(Target.target.querySelector(".fa-play"));
  TargetClickDown:
    for(var i = 0; i < Target.path.length; i++) {
      if(Target.path[i].classList && Target.path[i].classList.contains(Tkinter.RUN) == true) {
        //op.ele = Tkinter.RUN;
        console.log(Target.target, Target.path[i], Target.path[i].querySelector(".fa-play"));

        if(Target.target.classList.contains("fa-play") &&
          Target.path[i].querySelector(".fa-play") != null
        ) {
          op.ele = Target.target;
        }

        //if(Target.path[i].querySelector(".fa-play") != null) {
          //op.ele = Tkinter.RUN = Target.path[i].querySelector(".fa-play");
        //}

        break;
      }
    }

  if(JSON.stringify(op) === "{}") {
    op = null;
  }

  return op;
};

/*
 *  parse document for python source, group into separate files,
 *  then return an array of objects.
 *  { fileName, source }
 */
function readSource(DocTree) {
  console.log();

  var files = [];
  var fileTabs = DocTree.querySelector(".tab-nav > .scrollable-content").children;

  for(var fileTab = 0; fileTab < fileTabs.length; fileTab++) {
    if(!fileTabs[fileTab].children) {
      continue;
    }
    else {
      fileTabs[fileTab].click();
    }

    var srcBeforeParse, srcAfterParse;
    //console.log(fileTabs[fileTab]);

    srcBeforeParse = DocTree.querySelector(".ace_text-layer").children;
    srcAfterParse = "";

    for(var line = 0; line < srcBeforeParse.length; line++) {
      var srcLineTag = srcBeforeParse[line].children;

      for(var phrase = 0; phrase < srcLineTag.length; phrase++) {
        srcAfterParse += srcLineTag[phrase].innerText;
      }

      srcAfterParse += "\n";
    }

    var obj = {
      fileName: fileTabs[fileTab].children[0].querySelector(".file-name").innerText,
      source: srcAfterParse,
    };

    files.push(obj)
  }

  return files;
};

/*
 *  check each file, and if it is the same as CRX tkinter.py.
 */
function hasUpdatedTK(PyFileArr) {
  var isUpdated = {
    hasFile: false,
    isSame: false,
  };

  for(var i = 0; i < PyFileArr.length; i++) {
    if(PyFileArr[i].fileName == "tkinter.py") {
      isUpdated.hasFile = true;

      if(PyFileArr[i].source === Tkinter.source) {
        isUpdated.isSame = true;
      }
    }
  }

  return isUpdated;
};


/*
 *
 */


if(window.location.origin == "https://trinket.io") {
  Tkinter.port = chrome.runtime.connect(extID, { name: "TkConf" });

  Tkinter.port.onMessage.addListener(function(Msg) {
    console.log(Msg);

    if(Msg) {
    }
  });

  Tkinter.port.onDisconnect.addListener(function(Msg) {
    if(chrome.runtime.lastError) {
      console.log("Runtime Error", chrome.runtime.lastError);
    }
    else {
      console.log("Port Disconnected", Msg);
    }
  });
}


document.body.addEventListener("mousedown", function(Ev) {
  var op = targetIs(Ev);
  var documentTree = null;
  //console.log(op, Ev);

  if(op !== null) {
    if(op.ele.classList.contains("fa-play")) {
      Tkinter.pySource = readSource(Ev.target.ownerDocument.body);
      console.log(Tkinter.pySource);

      Tkinter.port.postMessage({
        code: Tkinter.pySource,
        gui: Tkinter.GUI,
      });

      // Trinket tkinter.py file equals CRX python file
      var tkStatus = hasUpdatedTK(Tkinter.pySource);
      if(tkStatus.hasFile === false) {
        // Load in new Tkinter py file
        //op.ele.click();
      }
      else if(tkStatus.hasFile === true) {
      }
      else if(tkStatus.hasFile === true && tkStatus.isSame === true) {
      }

      //console.log(Ev.target);
    }
  }
});
