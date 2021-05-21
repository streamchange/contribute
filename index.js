const queryString = window.location.search;
  console.log(queryString);

  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get('name')
  const callPass = urlParams.get('callpass')
  const clickerCode = urlParams.get('clickercode')
  const backgroundColour = "#"+urlParams.get('backgroundcolour')
  const borderColour = "#"+urlParams.get('bordercolour')
  const logo = urlParams.get('logo')

  console.log("name: " + name)
  console.log("callPass: " + callPass)
  console.log("clickerCode: " + clickerCode)
  console.log("borderColour: " + borderColour)
  console.log("backgroundColour: " + backgroundColour)
  console.log("logo: " + logo)
if (backgroundColour == "#null"){
  document.getElementById('indexBody').style.backgroundColor = "#df7020"
} else {
  document.getElementById('indexBody').style.backgroundColor = backgroundColour
}

if (borderColour == "#null"){
  document.getElementById('frameContainer').style.borderColor = "#FFFFFF"
  document.getElementById('clickerFrame').style.borderColor = "#FFFFFF"
} else{
  document.getElementById('frameContainer').style.borderColor = borderColour
  document.getElementById('clickerFrame').style.borderColor = borderColour
}

if (logo == "false"){
  document.getElementById('logo').style.display = "none"
}

  var clickerUrl = `https://internetclicker.com?code=${clickerCode}&branding=false&name=${name}&hs=1`
  var clickerFrame = document.getElementById("clickerFrame")
  clickerFrame.src = clickerUrl

  var callerUrl = `https://advanced.vmixcall.com/call.htm?Key=${callPass}&Name=${name}`
  var callerFrame = document.getElementById("callerFrame")
  callerFrame.src = callerUrl
