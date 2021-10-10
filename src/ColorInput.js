/*Color Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";
import { AiOutlineCloseCircle, AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import $ from 'jquery';
import iro from '@jaames/iro';
import { TiMediaStop } from "react-icons/ti";
import { RiSettings3Line } from "react-icons/ri";
import Molir from 'molir/molir';

class Color extends Component {
  constructor(props){
    super(props);
    this.handleExit = this.handleExit.bind(this);
    this.initialize = this.initialize.bind(this);
    this.autoMoveSlider = this.autoMoveSlider.bind(this);
    this.mouseDownUpEvent = this.mouseDownUpEvent.bind(this);
    this.transferControl = this.transferControl.bind(this);
    this.handleCommands = this.handleCommands.bind(this);
    this.initialize();
    this.state = {backgroundColor : [],
                  currentColor : ''}
  }

  initialize(){
    this.colorPicker = new iro.ColorPicker('#my-extension-root',  {
      width: 320,
      color: "rgb(255, 0, 0)",
      borderWidth: 1,
      borderColor: "#fff",
      layout: [
        {
          component: iro.ui.Slider,
          options: {
            sliderType: 'hue'
          }
        },
        {
          component: iro.ui.Slider,
          options: {
            sliderType: 'saturation'
          }
        },
        {
          component: iro.ui.Slider,
          options: {
            sliderType: 'value'
          }
        }
      ]
    });
  }

  mouseDownUpEvent(downOrUp){
    var rect = this.currentSliderPointer.getBoundingClientRect();
    if(downOrUp === "down"){
      return new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window,
        "clientX" : rect.left,
        "clientY" : rect.top,
      })
    }else if(downOrUp === "up"){
      return new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window,
        "clientX" : rect.left,
        "clientY" : rect.top,
      })
    }
  }

  autoMoveSlider(direction){
    var moveValue = 0;
    direction === "left"? moveValue = 6 : moveValue = 11;
    //slider interval instance
    this.moveSliderIntervalInstance = setInterval(() => {
       var rect = this.currentSliderPointer.getBoundingClientRect();
       if(this.pointerLeft === parseInt(rect.left)){
        clearInterval(this.moveSliderIntervalInstance);
        this.autoMoveSlider(direction === "left"?"right":"left");
        this.pointerLeft = 0;
       }else{
        this.pointerLeft = parseInt(rect.left);
        this.currentSliderPointer.dispatchEvent(
            new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                view: window,
                'clientX': rect.left + moveValue,
                'clientY': rect.top,
        }));
       }
    },300);
  }

  componentDidMount(){
    var base = document.getElementById('my-extension-root');
    this.colorPickerDOMEl = $(base).find('div.IroColorPicker');
    $(this.colorPickerDOMEl).css({'display': 'block',
      'position': 'fixed',
      'left': '50%',
      'transform' : 'translateX(-50%)',
      'margin' : 'auto',
      'bottom' : '98px',
      'z-index' : '9147483647293475293567293475620937845683450483570835702834750283502835'
    });
    var sliders = $(this.colorPickerDOMEl).find('.IroSlider');
    this.colorSlider = sliders[0];
    this.lightSlider = sliders[1];
    this.darkSlider = sliders[2];
    $(this.colorSlider).addClass('sliderStyle');
    $(this.lightSlider).addClass('sliderStyle');
    $(this.darkSlider).addClass('sliderStyle');
    this.colorSliderPointer = $(this.colorSlider).find(".IroHandle, .IroHandle--0, .IroHandle--isActive")[0];
    this.lightSliderPointer = $(this.lightSlider).find(".IroHandle, .IroHandle--0, .IroHandle--isActive")[0];
    this.darkSliderPointer = $(this.darkSlider).find(".IroHandle, .IroHandle--0, .IroHandle--isActive")[0];
    //Initial Move
    this.pointerLeft = 0;
    this.setState({backgroundColor : ['lightcyan','unset','unset']});
    this.currentSliderPointer = this.colorSliderPointer;
    this.colorSliderPointer.dispatchEvent(this.mouseDownUpEvent("down"));  
    this.autoMoveSlider("right"); 
    //Updating selected color
    this.colorPicker.on('input:change', (color) => {
      this.setState({currentColor : color.hexString});
    });

    let intents = [
      {
        "intentName":"color.submit",
        "utterences":[
          "submit it",
          "submit the selected",
          "I want to submit",
          "can you submit",
          "how to submit",
          'submit this',
          "submit"
        ],
        "keywords": [
          "submit this",
          "submit the selected",
          "submit",
          "submit it"
        ]
      },
      {
        "intentName":"color.right",
        "utterences":[
          "move the slider right",
          "move right",
          "I want to move slider right",
          "can you move slider right",
          "how to move slider right",
          'right move',
          "right",
          "go right",
          "slider right"
        ],
        "keywords": [
          'right move',
          "right",
          "go right",
          "slider right",
          "move right"
        ]
      },
      {
        "intentName":"color.left",
        "utterences":[
          "move the slider left",
          "move left",
          "I want to move slider left",
          "can you move slider left",
          "how to move slider left",
          'left move',
          "left",
          "go left",
          "slider left"
        ],
        "keywords": [
          'left move',
          "left",
          "go left",
          "slider left",
          "move left"
        ]
      },    
      {
        "intentName":'color.colorControl',
        "utterences":[
          "color",
          "color control",
          "Go to color control",           
          "color option",
          "choose color",
          "select color",
          "control color option"
        ],
        "keywords": [
          "color",
          "color control",
          "Go to color control",           
          "color option",
          "choose color",
          "select color",
          "colour",
          "control colour"
        ]
      },
      {
        "intentName":'color.lighterControl',
        "utterences":[
          "lighter",
          "lighter control",
          "Go to lighter control",           
          "lighter option",
          "control lighter option",
          "make color lighter"
        ],
        "keywords": [
          "lighter",
          "lighter control",
          "Go to lighter control",           
          "lighter option",
          "light"
        ]
      },
      {
        "intentName":'color.darkerControl',
        "utterences":[
          "darker",
          "darker control",
          "Go to darker control",           
          "darker option",
          "control darker option",
          "dark",
          "control dark",
          "dark control"
        ],
        "keywords": [
          "darker",
          "darker control",
          "Go to darker control",           
          "darker option",
          "dark",
          "control darker",
          "dark control"
        ]
      },
      {
        "intentName":"color.autoMoveSliderLeft",
        "utterences":[
          "auto slider left",
          "move slider automatically left",
          "slider move auto left",           
          "slider move left",
          "auto move left",
          "auto left",
          "left auto",
          "slider moving left automatically",
          "left automatic"
        ],
        "keywords": [
          "auto move left",
          "auto left",
          "slider moving auto left",
          "auto silder left",
          "move auto left",
          "left auto",
        ]
      }, {
        "intentName":"color.autoMoveSliderRight",
        "utterences":[
          "auto slider right",
          "move slider automatically right",
          "slider move auto right",           
          "slider move right",
          "auto move right",
          "auto right",
          "right auto",
          "slider moving right automatically",
          "right automatic"
        ],
        "keywords": [
          "auto move right",
          "auto right",
          "slider moving right auto",
          "auto silder right",
          "move auto right",
          "right auto"
        ]
      },
      {
        "intentName":"color.exit",
        "utterences":[
          "exit",
          "exit from this",
          "I want to come out of this",
          "close this",
          "go to root",
          "disable this",
          "discard changes",
          "discard"
        ],
        "keywords": [
          "exit",
          "close",
          "come out",
          "exit from this",
          "disable",
          "root",
          "discard changes",
          "discard"
        ]
      },
      {
        "intentName":"color.stop",
        "utterences":[
          'stop slider',
          "stop moving slider",
          "stop slider moving",
          "stop",
          "I want to stop",
          "slider stop",
          "stop it"
        ],
        "keywords": [
          'stop slider',
          "stop moving slider",
          "stop slider moving",
          "stop",
          "stop it"
        ]
      }
    ];
    this.classifier = new Molir(intents, 0.5);
  }

  transferControl(sliderPointer, bgColor){
    this.currentSliderPointer.dispatchEvent(this.mouseDownUpEvent("up"));     
    clearInterval(this.moveSliderIntervalInstance);
    this.pointerLeft = 0;
    this.currentSliderPointer = sliderPointer;
    this.setState({backgroundColor : bgColor});
    this.currentSliderPointer.dispatchEvent(this.mouseDownUpEvent("down"));  
    this.autoMoveSlider("right"); 
  }

  handleCommands(text){
    try{
    if(text === "color.colorControl" || text === "color" || text === "colour"){
      this.transferControl(this.colorSliderPointer,['lightcyan','unset','unset']);
      return true;
    }else if(this.response === "color.lighterControl" || text === "lighter" || text === "light"){
      this.transferControl(this.lightSliderPointer,['unset','lightcyan','unset']);
      return true;
    }else if(this.response === "color.darkerControl" || text === "darker" || text === "dark"){
      this.transferControl(this.darkSliderPointer,['unset','unset','lightcyan']);
      return true;
    }else if(this.response === "color.autoMoveSliderLeft" || text === "auto left"){
      clearInterval(this.moveSliderIntervalInstance);
      this.pointerLeft = 0;
      this.autoMoveSlider("left"); 
      return true;
    }else if(this.response === "color.autoMoveSliderRight" || text === "auto right" || text === "auto"){
      clearInterval(this.moveSliderIntervalInstance);
      this.pointerLeft = 0;
      this.autoMoveSlider("right"); 
      return true;
    }else if(this.response === "color.stop" || text === "stop"){
      clearInterval(this.moveSliderIntervalInstance);
      this.pointerLeft = 0;
      return true;
    }else if(this.response === "color.left" || text === "left"){
      this.currentSliderPointer.dispatchEvent(
        new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            view: window,
            'clientX': this.currentSliderPointer.getBoundingClientRect().left + 6,
            'clientY': this.currentSliderPointer.getBoundingClientRect().top,
      }));
      return true;
    }else if(this.response === "color.right" || text === "right"){
      this.currentSliderPointer.dispatchEvent(
        new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            view: window,
            'clientX': this.currentSliderPointer.getBoundingClientRect().left + 11,
            'clientY': this.currentSliderPointer.getBoundingClientRect().top,
      }));
      return true;
    }else if(this.response === "color.submit" || text === "submit"){
      clearInterval(this.moveSliderIntervalInstance);
      this.pointerLeft = 0;
      this.props.element.value = this.colorPicker.color.hexString;
      this.handleExit();
      return true;
    }else if(this.response === "color.exit" || text === "exit"){
      this.handleExit();
      return true;
    }
    return false;
    }catch(e){console.log(e)}
  }

  componentDidUpdate(prevProps) {
    try{
    if(prevProps.random !== this.props.random) {     
      if(this.props.spokenText !== undefined){
        this.classifier.classify(this.props.spokenText)
        .then((result)=>{
            this.response = result.intentName
        })
        .then(() => {                 
            if(!this.handleCommands(this.props.spokenText.trim().toLowerCase()))this.handleCommands(this.response);
        })           
      }          
    }
    }catch(e){console.log(e)}
  } 

  handleExit(){
    this.componentWillUnmount();
    setTimeout(()=>{
      this.props.exit();    
    },500);
  }

  componentWillUnmount(){
    $(this.props.element).removeClass("shadow-for-box-voice-browser-green");
    this.currentSliderPointer.dispatchEvent(this.mouseDownUpEvent("up"));     
    clearInterval(this.moveSliderIntervalInstance);
    this.pointerLeft = 0;
    $(this.colorPickerDOMEl).remove();
  }

  render() {
    return (      
      <section className="color-input-options-bar">
        <div className="top-bar">
          <div>
            <span className="Selected-Color">
              <b>Selected Color </b>
            </span>      
            <div className="selectedColorBg" style = {{ 'background-color' : this.state.currentColor }}></div>
          </div>

          <div className="top-bar-options">
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <IoIosSend />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                  Submit
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
          

        <div className="control-options" style={{ 'background-color' : this.state.backgroundColor[0]}} >
          <center className="center-option" >
            <span className="control-option-heading">Color</span>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className:  "option-icon-size"  }}>
                        <div>
                        <RiSettings3Line />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Auto Left / Right
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
          </center>
                    
          <div className="leftRightDiv">
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <AiOutlineArrowLeft/>
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Left
                </div>
            </div>   
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <AiOutlineArrowRight/>
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Right
                </div>
            </div>        
          </div>
        </div>
        
        <div className="control-options"  style={{ 'background-color' : this.state.backgroundColor[1]}} >
          <center className="center-option" >
            <span className="control-option-heading">Lighter</span>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className:  "option-icon-size"  }}>
                        <div>
                        <RiSettings3Line />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Auto Left / Right
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
          </center>
                    
          <div className="leftRightDiv">
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <AiOutlineArrowLeft/>
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Left
                </div>
            </div>   
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <AiOutlineArrowRight/>
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Right
                </div>
            </div>        
          </div>
        </div>

        <div className="control-options"  style={{ 'background-color' : this.state.backgroundColor[2]}} >
          <center className="center-option" >
            <span className="control-option-heading">Darker</span>
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className:  "option-icon-size"  }}>
                        <div>
                        <RiSettings3Line />
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Auto Left / Right
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
          </center>
                    
          <div className="leftRightDiv">
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <AiOutlineArrowLeft/>
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Left
                </div>
            </div>   
            <div className="option-item-wrapper">
                <div className="option-icon">
                    <IconContext.Provider value={{  className: "option-icon-size" }}>
                        <div>
                        <AiOutlineArrowRight/>
                        </div>
                    </IconContext.Provider>    
                </div>
                <div className="option-content">
                    Right
                </div>
            </div>        
          </div>
        </div>

      </section>

    );
  }
}

export default Color;