var logoCheckbox = document.getElementById("logoCheckbox");

let longParams

var nameClean
var callPass
var clickerCode = document.getElementById('clickerCodeInput').value
var backgroundColour = document.getElementById('backgroundColourInput').value
var borderColour = document.getElementById('borderColourInput').value

let extractedDetails = [];

let outputArray = [];
//document.getElementById('createLinksBtn').disabled = true



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
let shortArray = [];
function createShortURL(arg){
  //Generate string to test
  let shortTemp = Math.random().toString(36).substring(7, 15)
  console.log(shortTemp)

  //Does string already exist on database
  var ref = firebase.database().ref(shortTemp);
  ref.get("value")
  .then(function(snapshot) {
    if (snapshot.exists()){ //If string exists
      console.log('String "'+shortTemp+'"already exists')
      createShortURL(arg)
    } else {
      console.log("generated short code: " + shortTemp)
      shortArray.push(shortTemp)
      console.log(shortArray)
      pushReady()
    }
  })
} 

function pushReady(){
  if (shortArray.length == extractedDetails.length){
    pushToDatabase()
  }
}


function copyToClipboard(){
  //Copy to clipboard
  //navigator.clipboard.writeText("https://contribute.streamchange.com/?a="+short)

  document.getElementById('submitBtn').blur()
}

function pushToDatabase(){
  for (i=0; i<extractedDetails.length; i++) {
    //create timestamp
    var timestamp = new Date
    //console.log(timestamp)
    let short = shortArray[i]

    firebase.database().ref('/'+short).set({
      short:short, 
      date:timestamp.toISOString(),
      name:extractedDetails[i][1],
      callPass:extractedDetails[i][2],
      clickerCode:clickerCode,
      backgroundColour:backgroundColour,
      borderColour:borderColour,
    })
    //console.log(`Pushed ${short} to database: ${extractedDetails[i][1]}, ${extractedDetails[i][2]}, ${clickerCode}`)

    let link = `https://contribute.streamchange.com/?a=${short}`
    console.log(link)

    outputArray.push([extractedDetails[i][1], [extractedDetails[i][2]], link])
    if (outputArray.length == extractedDetails.length){
      outputToPage()

    }
  }
}

function outputToPage(){
  let outputTable = document.getElementById('outputTable')
  for(i=0; i<outputArray.length; i++){
    let name = decodeURI(extractedDetails[i][1])
    outputTable.innerHTML += `<tr><td>${name}</td><td>${outputArray[i][2]}</td></tr>`
    console.log()
  }

}

function debugMe(){
  console.dir(outputArray)
}


/////////////////////////
////////////////////////
let dropped = false
function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

  if (dropped==true){
    alert(`Don't be greedy, one file at a time please`)
    location.reload()
    return
  } else {
    console.log('File(s) dropped');
    dropped = true
  }



  if (ev.dataTransfer.items.length == 1) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        file = ev.dataTransfer.items[i].getAsFile()
        console.log('... file[' + i + '].name = ' + file.name)
        document.getElementById('dropText').innerText = `Loaded file: ${file.name}`
        document.getElementById('dropText').style.color = "white"
        document.getElementById('drop_zone').style = "background: #169c4e;"
        //submitBtn.style.display = "block"

        //Read file
        let fileReader = new FileReader()
        fileReader.readAsText(file)

        fileReader.onload = (event) => {
          let fileAsText = event.target.result
          result = xmlToJSON.parseString(fileAsText)
          extractPreset(result)
        }

      }
    }
    
  } else {
    // Use DataTransfer interface to access the file(s)
    alert(`Don't be greedy, one file at a time please`)
    location.reload();

    return
  }
}

function dragOverHandler(ev) {
  //console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}



function extractPreset(data){
  for (i=0; i < data['XML']['0'].Input.length; i++) {
    //If input is a call (type 6000)
    if (data['XML']['0']['Input'][i]['_attr']['Type']['_value'] == 6000){
      callPass = data['XML']['0']['Input'][i]['_attr']['VideoCallKey']['_value']
      if(data['XML']['0']['Input'][i]['_attr']['Title']){
        nameInput = data['XML']['0']['Input'][i]['_attr']['Title']['_value']
        nameClean = encodeURIComponent(data['XML']['0']['Input'][i]['_attr']['Title']['_value'])
      } else {
        nameClean = encodeURIComponent(data['XML']['0']['Input'][i]['_attr']['OriginalTitle']['_value'])
        nameInput = data['XML']['0']['Input'][i]['_attr']['OriginalTitle']['_value']
      }
      extractedDetails.push([nameInput, nameClean, callPass])
    }
  }
  let newDropText = '\n'
  for (i=0; i<extractedDetails.length; i++){
    newDropText += extractedDetails[i][0] + '\n'
  }

  document.getElementById('dropText').innerText += newDropText
  document.getElementById('createLinksBtn').disabled = false

}

function createLinks(){
  document.getElementById('createLinksBtn').blur()
  numShorts = extractedDetails.length
  console.log(`Number of links to create: ${numShorts}`)
  extractedDetails.forEach(element => createShortURL())
}

function clearPresetData(){
  location.reload();
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