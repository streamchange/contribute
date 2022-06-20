var linkOutput = document.getElementById('linkOutput')
linkOutput.style.display = "none"

var extraLine = document.getElementById('extraLine')
extraLine.style.display = "block"

const shortBtn = document.getElementById('shortBtn')
shortBtn.addEventListener("click", createShortURL)

var link = 'initial data'
var optionalCheckbox = document.getElementById("optionalCheckbox");

var logoCheckbox = document.getElementById("logoCheckbox");

let longParams

var nameInput = document.getElementById('nameInput').value
var nameClean = encodeURIComponent(nameInput)
var callPass = document.getElementById('callPassInput').value
var clickerCode = document.getElementById('clickerCodeInput').value
var backgroundColour = document.getElementById('backgroundColourInput').value
var borderColour = document.getElementById('borderColourInput').value

////////////////////////////////
var firebaseConfig = {
  apiKey: "AIzaSyAp-SRZT5PpRufiqKdHRgf-ayoyHZ7bKCM",
  authDomain: "contribute-965e3.firebaseapp.com",
  databaseURL: "https://contribute-965e3-default-rtdb.firebaseio.com",
  projectId: "contribute-965e3",
  storageBucket: "contribute-965e3.appspot.com",
  messagingSenderId: "398032504631",
  appId: "1:398032504631:web:69e2e84cb2f6ec666efcb2",
  measurementId: "G-ZNBE4YKJ7S"    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var key = "key"
var value = "value"

function updateParams(){
    nameInput = document.getElementById('nameInput').value
    nameClean = encodeURIComponent(nameInput)
    callPass = document.getElementById('callPassInput').value
    clickerCode = document.getElementById('clickerCodeInput').value
    backgroundColour = document.getElementById('backgroundColourInput').value
    borderColour = document.getElementById('borderColourInput').value
}

/* OLD Long Links
function updateLink(callback){
  updateParams()

  console.log("name: " + nameInput)
  console.log("callpass: " + callPass)
  console.log("clickercode: " + clickerCode)

  link = `https://contribute.streamchange.com/?name=${nameClean}&callpass=${callPass}&clickercode=${clickerCode}&backgroundcolour=${backgroundColour}&bordercolour=${borderColour}`
    if(logoCheckbox.checked == true){
      link+= `&logo=false`
    }
  callback()
}*/

function copyLink(){
  navigator.clipboard.writeText(""+link)
  linkOutput.innerText = 'Copied link to clipboard'
  linkOutput.style.display = "block"
  extraLine.style.display = "none"
  document.getElementById('shortBtn').blur()
}

function gotoLink(){
  window.location.assign(link);
}



//create random short 6 character string
let shortTemp = "init21"
let short = "init"

function createShortURL(){
  //Generate string to test
  shortTemp = Math.random().toString(36).substring(7, 15)

  //Does string alredy exist on database
  var ref = firebase.database().ref(shortTemp);
  ref.once("value")
  .then(function(snapshot) {
    var a = snapshot.exists()
    if (a==true){ //If string exists
      console.log('String "'+shortTemp+'"already exists')
      //createShortString()
    } else {
      short = shortTemp
      console.log("generated short code: " + short)
      pushToDatabase()
      createLink()
    }
  })
} 

function createLink(){
  //Copy to clipboard
  navigator.clipboard.writeText("https://contribute.streamchange.com/?a="+short)

  //Display Copied message
  linkOutput.innerText = 'Copied short link to clipboard! Code = '+short
  linkOutput.style.display = "block"
  extraLine.style.display = "none"

  document.getElementById('shortBtn').blur()
}

function pushToDatabase(){
  updateParams()
  //create timestamp
  var timestamp = new Date
  //console.log(timestamp)

  firebase.database().ref('/'+short).set({
    short:short, 
    date:timestamp.toISOString(),
    name:nameClean,
    callPass:callPass,
    clickerCode:clickerCode,
    backgroundColour:backgroundColour,
    borderColour:borderColour,
  })
  console.log("Pushed '"+short+"' to database")
}

