var linkOutput = document.getElementById('linkOutput')
linkOutput.style.display = "none"

var extraLine = document.getElementById('extraLine')
extraLine.style.display = "block"

const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener("click" ,copyBtnPressed);

const goBtn = document.getElementById('goBtn');
goBtn.addEventListener("click" ,gotoBtnPressed);

const shortBtn = document.getElementById('shortBtn')
shortBtn.addEventListener("click", createShortURL)

var link = 'initial data'
var optionalCheckbox = document.getElementById("optionalCheckbox");

var logoCheckbox = document.getElementById("logoCheckbox");

let longParams

function copyBtnPressed(){
  updateLink(copyLink)
}

function gotoBtnPressed(){
  updateLink(gotoLink)
}

var nameInput = document.getElementById('nameInput').value
var nameClean = encodeURIComponent(nameInput)
var callPass = document.getElementById('callPassInput').value
var clickerCode = document.getElementById('clickerCodeInput').value
var backgroundColour = document.getElementById('backgroundColourInput').value
var borderColour = document.getElementById('borderColourInput').value

function updateParams(){
    nameInput = document.getElementById('nameInput').value
    nameClean = encodeURIComponent(nameInput)
    callPass = document.getElementById('callPassInput').value
    clickerCode = document.getElementById('clickerCodeInput').value
    backgroundColour = document.getElementById('backgroundColourInput').value
    borderColour = document.getElementById('borderColourInput').value
}

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
}


function copyLink(){
  navigator.clipboard.writeText(""+link)
  linkOutput.innerText = 'Copied link to clipboard'
  linkOutput.style.display = "block"
  extraLine.style.display = "none"
  document.activeElement.blur()
}

function gotoLink(){
  window.location.assign(link);
}




////////////////////////////////

// TODO: Replace the following with your app's Firebase project configuration
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
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
  
  
  
//var database = firebase.database().DataSnapshot
var test="hash";
var key = "key"
var value = "value3"
  
  

  
//create random short 6 character string
let short = "init"
function createShortString(){
    short = Math.random().toString(36).substring(7, 15)
} 

function createShortURL(){
    createShortString()
    console.log("generated short: " + short)

    // Test for the existence of certain keys within a DataSnapshot
    var ref = firebase.database().ref(short);
    ref.once("value")
    .then(function(snapshot) {
        var a = snapshot.exists()
        if (a==true){
            createShortURL()
            console.log("New Short Code: "+short)
        } else {
            pushToDatabase()
            console.log("Pushed to database")
            navigator.clipboard.writeText("https://contribute.streamchange.com/?a="+short)
            linkOutput.innerText = 'Copied short link to clipboard'
            linkOutput.style.display = "block"
            extraLine.style.display = "none"
            document.activeElement.blur()
        }
    });


    

}
  
function pushToDatabase(){
    updateParams()
    //create timestamp
    var timestamp = new Date
    console.log(timestamp)

    firebase.database().ref('/'+short).set({
        short:short, 
        date:timestamp.toISOString(),
        name:nameClean,
        callPass:callPass,
        clickerCode:clickerCode,
        backgroundColour:backgroundColour,
        borderColour:borderColour,

    })
}

  
/////////////////////////