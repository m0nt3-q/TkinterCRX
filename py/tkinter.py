class JSWindow:
  def __init__(self, window):
    self.windowReference = "TKinter-crx"
    self.window = window
  
  def errorMsg(self, message):
    # call extension and throw alert
    return
  
def Tk():
  global jsWindow
  jsWindow = JSWindow(1)
  print(jsWindow)

def Canvas(root, width, height, bg):
  if(root != 1):
    jsWindow.errorMsg("No window set!")
    return
  
  jsWindow.showGUI()
