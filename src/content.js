/*global chrome*/
/* src/content.js */
/*Entry Component*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import ReactShadowRoot from 'react-shadow-root';
import $ from 'jquery';
import randomize from 'randomatic';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.singleDigitConvert = this.singleDigitConvert.bind(this);
    this.state = {spokenText: 'Say Something...',
                  volumeLevel : 0,
                  toggleAppStyle : 'none'};
  }

  singleDigitConvert(digitString){
    if(digitString === 'zero'  || digitString === 'zeroth' ) return 0;
    if(digitString === 'one' || digitString === 'first' ) return 1;
    if(digitString === 'two' || digitString === 'tu' || digitString === 'too' || digitString === 'to' || digitString === 'second' ) return 2;
    if(digitString === 'three' || digitString === 'third' ) return 3;
    if(digitString === 'four' || digitString === 'fourth' ) return 4;
    if(digitString === 'five' || digitString === 'fifth' ) return 5;
    if(digitString === 'six' || digitString === 'sixth' ) return 6;
    if(digitString === 'seven'  || digitString === 'seventh' ) return 7;
    if(digitString === 'eight'  || digitString === 'eighth' ) return 8;
    if(digitString === 'nine' || digitString === 'ninth' ) return 9;
    if(digitString === 'xx' || digitString === 't20' ) return 20;
    if(digitString === 'xxxviii' ) return 38;
    return false;
  }

  componentDidMount(){
    chrome.runtime.onConnect.addListener((port)=>{
      if(port.name === "voice-browser-speech-connection"){
        port.onMessage.addListener((msg)=>{
          if(msg.finalText){
            var noOrNot = this.singleDigitConvert(msg.finalText.trim().toLowerCase());
            if(noOrNot !== false){
              this.app.handleExecution(noOrNot.toString(),randomize('*', 30));
            }else{
              this.app.handleExecution(msg.finalText,randomize('*', 30));
            }
          }
          if(msg.interimText){
            this.app.handleTextUpdate(msg.interimText);
          }
          if(msg.volumeLevel){
            this.app.volumeLevel(msg.volumeLevel);
          }
          if(msg.enableApp){
            this.setState({toggleAppStyle : 'block'});
          }
          if(msg.disableApp){
            this.setState({toggleAppStyle : 'none'});
          }
        })
      }
    })

  
    $("<style type='text/css'> .shadow-for-box-voice-browser-blue{ box-shadow:0px 0px 5px 3px rgba(0,150,255,0.8)!important;} "+
    ".shadow-for-box-voice-browser-green{ box-shadow:0px 0px 5px 3px rgba(0,255,0,0.9)!important;} "+
    ".sliderStyle{ margin : 30px 90px 0px 90px!important;}"+
    "    </style>").appendTo("head");
  }

  render() {
    return(
      <div style={{ 'display' : this.state.toggleAppStyle }}>
        <ReactShadowRoot>
          <link type="text/css" 
              href={chrome.runtime.getURL("/static/css/content.css")} rel="stylesheet" />
          <App ref={(child) => this.app = child} />           
        </ReactShadowRoot>
      </div>       
    );
  }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

