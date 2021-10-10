

var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = 'en-IN';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

recognition.start();

var optionsPageTabId;
chrome.tabs.getCurrent(function(tab) {
  optionsPageTabId = tab.id;
})


var port = chrome.runtime.connect({name:"spokenTextToBgScript"});
port.postMessage({IamOpen: true});


recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  if(event.results[current].isFinal){
    port.postMessage({finalText: transcript});
  }else{
    port.postMessage({interimText: transcript});
  }
}

window.addEventListener('beforeunload', function () {
  port.postMessage({IamOpen: false});
});

recognition.onend = function() { 
  recognition.start();   
}

var level = 0;

navigator.mediaDevices.getUserMedia({ audio: true })
.then(function(stream) {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  microphone = audioContext.createMediaStreamSource(stream);
  javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

  analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 1024;

  microphone.connect(analyser);
  analyser.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
  javascriptNode.onaudioprocess = function() {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var values = 0;

      var length = array.length;
      for (var i = 0; i < length; i++) {
        values += (array[i]);
      }

      var average = values / length;
      
      if( level !== Math.round(average) ){
        port.postMessage({ volumeLevel : level });
      }

      level = Math.round(average);
  }  
  })
  .catch(function(err) {
    /* handle the error */
});






