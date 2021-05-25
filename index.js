const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAp-SRZT5PpRufiqKdHRgf-ayoyHZ7bKCM",
  authDomain: "contribute-965e3.firebaseapp.com",
  databaseURL: "https://contribute-965e3-default-rtdb.firebaseio.com",
  projectId: "contribute-965e3",
  storageBucket: "contribute-965e3.appspot.com",
  messagingSenderId: "398032504631",
  appId: "1:398032504631:web:69e2e84cb2f6ec666efcb2",
  measurementId: "G-ZNBE4YKJ7S"    
};

firebase.initializeApp(firebaseConfig);


//TODO.. redirect or say there has been an issue or something when no parameters are entered
if (queryString){
  console.log('queryString exists')
} else {
  console.log("no params")
}

let callerName, callPass, clickerCode, backgroundColour, borderColour, logo, short

if (urlParams.get('a')){
  console.log("a")
  short = urlParams.get('a')
  useShort()
} else {
  callerName = urlParams.get('name')
  callPass = urlParams.get('callpass')
  clickerCode = urlParams.get('clickercode')
  backgroundColour = urlParams.get('backgroundcolour')
  borderColour = urlParams.get('bordercolour')
  logo = urlParams.get('logo')
  refreshDetails()
}
/*
console.log("name: " + callerName)
console.log("callPass: " + callPass)
console.log("clickerCode: " + clickerCode)
console.log("borderColour: " + borderColour)
console.log("backgroundColour: " + backgroundColour)
console.log("logo: " + logo)
console.log("short: " + short)
*/

////////////////////////////////

function useShort(){

var ref = firebase.database().ref(short);

ref.once("value")
  .then(function(snapshot) {
    var a = snapshot.exists()
    if (a==true){
        console.log("Short Code: "+short+" exists")

        callerName = snapshot.child("name").val()
        callPass = snapshot.child("callPass").val()
        clickerCode = snapshot.child("clickerCode").val()
        backgroundColour = snapshot.child("backgroundColour").val()
        borderColour = snapshot.child("borderColour").val()
        logo = true


        console.log("name: " + callerName)
        console.log("callPass: " + callPass)
        console.log("clickerCode: " + clickerCode)
        console.log("borderColour: " + borderColour)
        console.log("backgroundColour: " + backgroundColour)
        console.log("logo: " + logo)
        console.log("short: " + short)

        refreshDetails()
    }
  });
}





/////////////////////////

function refreshDetails(){
    document.getElementById('indexBody').style.backgroundColor = "#"+backgroundColour
    document.getElementById('frameContainer').style.borderColor = "#"+borderColour
    document.getElementById('clickerFrame').style.borderColor = "#"+borderColour

  if (logo == "false"){
    document.getElementById('logo').style.display = "none"
  }

  var clickerUrl = `https://internetclicker.com?code=${clickerCode}&branding=false&name=${callerName}&hs=1`
  var clickerFrame = document.getElementById("clickerFrame")
  clickerFrame.src = clickerUrl

  var callerUrl = `https://advanced.vmixcall.com/call.htm?Key=${callPass}&Name=${callerName}`
  var callerFrame = document.getElementById("callerFrame")
  callerFrame.src = callerUrl
}
