var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


var colors = ["baby", "basket", "black", "face", "final", "game", "go","hello","long","loud","now","salt","sugar","today","yellow"];
// var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false; 
recognition.maxAlternatives = 1;

// var diagnostic = document.querySelector('.out');

// var colorHTML= '';
// colors.forEach(function(v, i, a){
//   console.log(v, i);
//   colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
// });
// hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

var kata = ["baby", "basket", "black", "face", "final", "game", "go","hello","long","loud","now","salt","sugar","today","yellow"];
// var kata = ['fruit', 'hello', 'black'];

recognition.onresult = function(event) {
    var output = event.results[0][0].transcript;
    if(kata.includes(output)) 
    {
      //kalau mau ngecek kondisi bener salah.
      // diagnostic.textContent = 'WOI DAPET WOI: ' + output + '.';
      console.log(output);
      speechCorrect(output);
    }
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

  recognition.onnomatch = function(event) {
    // diagnostic.textContent = 'I didnt recognise that color.';
  }

  recognition.onerror = function(event) {
    // diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  }