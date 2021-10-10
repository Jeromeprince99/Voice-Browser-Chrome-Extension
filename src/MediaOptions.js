/*Media Options Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { BsPlay, BsPause, BsFillVolumeMuteFill,  } from "react-icons/bs";
import { TiMediaStop, TiMediaRewindOutline, TiMediaFastForwardOutline } from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiVolume } from "react-icons/fi";
import $ from 'jquery';
import Molir from 'molir/molir';

class MediaOptions extends Component {
  constructor(props){
    super(props);
    this.state = {muted : this.props.element.muted};
  }

  componentDidMount(){
    let intents = [
        {
          "intentName":"media.play",
          "utterences":[
            "play",
            "play video",
            "play audio",
            "play the video",
            "I want to play the video",
            "Can you play the video",
            "play it",
            "how to play the audio",
            "play the audio",
            "I want to play the audio",
            "Can you play the audio",
            "how to play the audio"
          ],
          "keywords": [
            "play",
            "play video",
            "play audio"
          ]
        },
        {
          "intentName":'media.pause',
          "utterences":[
            "Pause",
            "Pause video",
            "Pause audio",
            "Pause the video",
            "I want to pause the video",
            "Can you pause the video",
            "Pause it",
            "how to pause the audio",
            "Pause the audio",
            "I want to pause the audio",
            "Can you pause the audio",
            "how to pause the audio"
          ],
          "keywords": [
            "Pause",
            "Pause video",
            "Pause audio"
          ]
        },
        {
          "intentName":"media.stop",
          "utterences":[
            "stop",
            "stop video",
            "stop audio",
            "stop the video",
            "I want to stop the video",
            "Can you stop the video",
            "stop it",
            "how to stop the audio",
            "stop the audio",
            "I want to stop the audio",
            "Can you stop the audio",
            "how to stop the audio"
          ],
          "keywords": [
            "stop",
            "stop video",
            "stop audio"
          ]
        },
        {
          "intentName":"media.muteToggle",
            "utterences":[
                "mute",
                "mute volume",      
                "enable mute",      
                "mute the volume",
                "I want to mute the volume",
                "Can you mute the volume",
                "mute it",
                "how to mute the volume",
                "unmute",
                "un mute",
                "disable mute",
                "exit mute",
                "unmute volume",            
                "unmute the volume",
                "I want to unmute the volume",
                "Can you unmute the volume",
                "unmute it",
                "how to unmute the volume"
            ],
            "keywords": [
                "mute",
                "mute volume",
                "enable mute",
                "mute it",
                "unmute",
                "unmute volume",
                "un mute",
                "mute un",
                "unmute it",
                "un",
                "disable mute",
                "exit mute"
            ]
        },
        {
            "intentName":"media.volumeup",
            "utterences":[
                "volume Up",
                "Increase Volume",
                "Increase",           
                "increase the volume",
                "I want to increase the volume",
                "Can you increase the volume",
                "increase it",
                "how to increase the volume"
            ],
            "keywords": [
                "volume Up",
                "Increase Volume",
                "Increase"
            ]
        },
        {
            "intentName":"media.volumedown",
            "utterences":[
                "volume down",
                "Decrease Volume",
                "Decrease",           
                "Decrease the volume",
                "I want to decrease the volume",
                "Can you decrease the volume",
                "Decrease it",
                "how to decrease the volume"
            ],
            "keywords": [
                "volume Down",
                "Decrease Volume",
                "Decrease",
                "Volume low",
                "Low volume"
            ]
          },
          {
            "intentName":"media.rewind",
            "utterences":[
                "rewind",
                "rewind video",
                "rewind audio",    
                "rewind media",     
                "rewind the video",
                "I want to rewind",
                "Can you rewind",
                "rewind it",
                "how to rewind"
            ],
            "keywords": [
                "rewind",
                "rewind video",
                "rewind audio",
                "rewind media"
            ]
          },
          {
            "intentName":"media.forward",
            "utterences":[
                "forward",
                "forward video",
                "forward audio",    
                "forward media",     
                "forward the video",
                "I want to forward",
                "Can you forward",
                "forward it",
                "how to forward"
            ],
            "keywords": [
                "forward",
                "forward video",
                "forward audio",
                "forward media"
            ]
          },
          {
            "intentName":"media.exit",
            "utterences":[
                'exit media',
                "I want to exit from this",
                "media exit",
                "exit it",
                "exit",
                "exit from this",
                "I want to come out of this",
                "close this",
                "go to root",
                "disable this"
                ],
            "keywords": [
                "exit",
                "close",
                "come out",
                "exit from this",
                "disable",
                "root"
            ]
          }
      ];
      this.classifier = new Molir(intents, 0.5);
    }
  
  componentDidUpdate(prevProps) {
    try{
    if (prevProps.random !== this.props.random) {
        this.classifier.classify(this.props.spokenText)
        .then((result)=>{
            this.response = result.intentName
        })
        .then(() => {
            if(this.response === "media.play"){
               this.props.element.play();
            }else if(this.response === "media.pause"){
               this.props.element.pause();
            }else if(this.response === "media.stop"){
               this.props.element.pause();
               this.props.element.currentTime = 0;
            }else if(this.response === "media.muteToggle"){
               if(this.state.muted){
                this.props.element.muted = false;
                this.setState({muted : false});   
               }else{
                this.props.element.muted= true;
                this.setState({muted : true});
               }
            }else if(this.response === "media.volumeup"){
               this.props.element.volume += 0.1;
            }else if(this.response === "media.volumedown"){
                this.props.element.volume -= 0.1;
            }else if(this.response === "media.rewind"){
               this.props.element.currentTime -= 10;
            }else if(this.response === "media.forward"){
               this.props.element.currentTime += 10;
            }else if(this.response === "media.exit"){
                this.props.exit();
                this.componentWillUnmount();
                return;
            }
        })     
    }
    }catch(e){console.log(e)}
  }

  componentWillUnmount(){
    $(this.props.element).removeClass("shadow-for-box-voice-browser-green");
  }

  render() {
    return (
      <div className="voice-browser-options-bar">      
        <div className="options-container">
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <BsPlay /> 
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Play
                </div>
            </div>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <BsPause /> 
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Pause
                </div>
            </div>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className:  "option-icon-size"  }}>
                        <div>
                        <TiMediaStop />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Stop
                </div>
            </div>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        {this.state.muted ? <BsFillVolumeMuteFill  /> : <FiVolume />}
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    {this.state.muted ? 'Unmute' : 'Mute' }
                </div>
            </div>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <FiVolume />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Volume Up/Down
                </div>
            </div>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <TiMediaRewindOutline />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Rewind
                </div>
            </div>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <TiMediaFastForwardOutline />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Forward
                </div>
            </div>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <AiOutlineCloseCircle />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Exit
                </div>
            </div>
        </div>        
      </div>
    );
  }
}

export default MediaOptions;