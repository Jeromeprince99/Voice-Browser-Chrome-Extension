/*Auto Scroll Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { TiMediaStop } from "react-icons/ti";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import {GoDash,GoPlus} from "react-icons/go";
import Molir from 'molir/molir';
import $ from 'jquery';

class AutoScroll extends Component {
  constructor(props){
    super(props);
    this.state = {speed: 20};
  }

  componentDidMount(){
    let intents = [
        {
          "intentName":"autoscroll.down",
          "utterences":[
            "scroll the element down",
            "scroll down",
            "I want to scroll down",
            "can you scroll down",
            "how to scroll down",
            'down scroll'
          ],
          "keywords": [
            "scroll down",
            "scroll element down",
            'down scroll',
            "down"
          ]
        },
        {
          "intentName":"autoscroll.up",
          "utterences":[
            "scroll the element up",
            "scroll up",
            "I want to scroll up",
            "can you scroll up",
            "how to scroll up",
            'up scroll'
          ],
          "keywords": [
            "scroll up",
            "scroll element up",
            'up scroll',
            "up"
          ]
        },
        {
          "intentName":"autoscroll.right",
          "utterences":[
            "scroll the element right",
            "scroll right",
            "I want to scroll right",
            "can you scroll right",
            "how to scroll right",
            'right scroll'
          ],
          "keywords": [
            "scroll right",
            "scroll element right",
            'right scroll',
            "right"
          ]
        },
        {
          "intentName":"autoscroll.left",
          "utterences":[
            "scroll the element left",
            "scroll left",
            "I want to scroll left",
            "can you scroll left",
            "how to scroll left",
            'left scroll'
          ],
          "keywords": [
            "scroll left",
            "scroll element left",
            'left scroll',
            "left"
          ]
        },    
        {
          "intentName":'autoscroll.fast',
          "utterences":[
            "scroll fastly",
            "scroll faster",
            "faster",           
            "fastly",
            "fast"
          ],
          "keywords": [
            "scroll fastly",
            "scroll faster",
            "faster",           
            "fastly",
            "fast"
          ]
        },
        {
          "intentName":"autoscroll.slow",
          "utterences":[
            "scroll slowly",
            "scroll slower",
            "slower",           
            "slowly",
            "slow"
          ],
          "keywords": [
            "scroll slowly",
            "scroll slower",
            "slower",           
            "slowly",
            "slow"
          ]
        },
        {
          "intentName":"autoscroll.exit",
          "utterences":[
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
        },
        {
            "intentName":"autoscroll.stop",
            "utterences":[
                'stop scrolling',
                "I want to stop this automatic scrolling",
                "scroll stop",
                "auto stop",
                "stop scroll",
                "stop it",
                "auto scroll stop"
            ],
            "keywords": [
                'stop',
                "scroll stop",
                "auto stop",
                "stop scrolling",
                "stop it",
                "auto scroll stop",
                "halt"
            ]
        }
      ];
      this.classifier = new Molir(intents, 0.5);
      
      this.scrollerIntervalInstance = setInterval(fn=>{},200);
      this.currentAutoScrollOption = '';
  }
  
  componentDidUpdate(prevProps) {
    try{
    if (prevProps.random !== this.props.random) {
        if(this.props.spokenText !== undefined){           
            this.classifier.classify(this.props.spokenText)
            .then((result)=>{
                this.response = result.intentName
            })
            .then(() => {            
                if(this.response === "autoscroll.down"){
                    this.currentAutoScrollOption = 'autodown';
                    clearInterval(this.scrollerIntervalInstance);
                    this.scrollerIntervalInstance = setInterval(fn=>{
                        $(window).scrollTop($(window).scrollTop() + this.state.speed );},100);
                }else if(this.response === "autoscroll.up"){
                    this.currentAutoScrollOption = 'autoup';
                    clearInterval(this.scrollerIntervalInstance);
                    this.scrollerIntervalInstance = setInterval(fn=>{
                        $(window).scrollTop($(window).scrollTop() - this.state.speed );},100);                
                }else if(this.response === "autoscroll.right"){
                    this.currentAutoScrollOption = 'autoright';
                    clearInterval(this.scrollerIntervalInstance);
                    this.scrollerIntervalInstance = setInterval(fn=>{
                        $(window).scrollLeft($(window).scrollLeft() + this.state.speed );},100);                
                }else if(this.response === "autoscroll.left"){
                    this.currentAutoScrollOption = 'autoleft';
                    clearInterval(this.scrollerIntervalInstance);
                    this.scrollerIntervalInstance = setInterval(fn=>{
                        $(window).scrollLeft($(window).scrollLeft() - this.state.speed );},100);                
                }else if(this.response === "autoscroll.fast"){
                    if(this.currentAutoScrollOption == 'autodown'){
                        clearInterval(this.scrollerIntervalInstance);                        
                        this.setState({speed:this.state.speed+4});
                        this.scrollerIntervalInstance = setInterval(fn=>{
                            $(window).scrollTop($(window).scrollTop() + this.state.speed );},100);
                    }else if(this.currentAutoScrollOption == 'autoup'){                           
                        clearInterval(this.scrollerIntervalInstance);                        
                        this.setState({speed:this.state.speed+4});
                        this.scrollerIntervalInstance = setInterval(fn=>{
                            $(window).scrollTop($(window).scrollTop() - this.state.speed );},100);
                    }else if(this.currentAutoScrollOption == 'autoright'){
                        clearInterval(this.scrollerIntervalInstance);                        
                        this.setState({speed:this.state.speed+4});
                        this.scrollerIntervalInstance = setInterval(fn=>{
                            $(window).scrollLeft($(window).scrollLeft() + this.state.speed );},100);              
                    }else if(this.currentAutoScrollOption == 'autoleft'){
                        clearInterval(this.scrollerIntervalInstance);                        
                        this.setState({speed:this.state.speed+4});
                        this.scrollerIntervalInstance = setInterval(fn=>{
                            $(window).scrollLeft($(window).scrollLeft() - this.state.speed );},100);              
                    }
                }else if(this.response === "autoscroll.slow"){
                    if(this.currentAutoScrollOption == 'autodown'){
                        if(this.state.speed-4>0){
                            clearInterval(this.scrollerIntervalInstance);
                            this.setState({speed:this.state.speed - 4 });
                            this.scrollerIntervalInstance = setInterval(fn=>{
                                $(window).scrollTop($(window).scrollTop() + this.state.speed );},100);
                        }
                    }else if(this.currentAutoScrollOption == 'autoup'){
                        if(this.state.speed-4>0){
                            clearInterval(this.scrollerIntervalInstance);
                            this.setState({speed:this.state.speed - 4 });
                            this.scrollerIntervalInstance = setInterval(fn=>{
                                $(window).scrollTop($(window).scrollTop() - this.state.speed );},100);
                        }
                    }else if(this.currentAutoScrollOption == 'autoright'){
                        if(this.state.speed-4>0){
                            clearInterval(this.scrollerIntervalInstance);
                            this.setState({speed:this.state.speed - 4 });
                            this.scrollerIntervalInstance = setInterval(fn=>{
                                $(window).scrollLeft($(window).scrollLeft() + this.state.speed );},100);              
                        }
                    }else if(this.currentAutoScrollOption == 'autoleft'){
                        if(this.state.speed-4>0){
                            clearInterval(this.scrollerIntervalInstance);
                            this.setState({speed:this.state.speed - 4 });
                            this.scrollerIntervalInstance = setInterval(fn=>{
                                $(window).scrollLeft($(window).scrollLeft() - this.state.speed );},100);          
                        }
                    }                       
                }else if(this.response === "autoscroll.stop"){
                    clearInterval(this.scrollerIntervalInstance);
                }else if(this.response === "autoscroll.exit"){                       
                    this.componentWillUnmount();
                    this.props.exit();
                    return;
                }
            })     
        }    
    }
    }catch(e){console.log(e)}
  }

  componentWillUnmount(){
    clearInterval(this.scrollerIntervalInstance);
    this.currentAutoScrollOption = '';
  }

  render() {
    return (      
        <div className="voice-browser-options-bar">      
            <div className="options-container">    
                <div className="option-item-wrapper">
                    <div className="option-icon">
                        <IconContext.Provider value={{  className: "option-icon-size" }}>
                            <div>
                            <AiOutlineArrowDown  /> 
                            </div>
                        </IconContext.Provider>    
                    </div>
                    <div className="option-content">
                        Down
                    </div>
                </div>        
                <div className="option-item-wrapper">
                    <div className="option-icon">
                        <IconContext.Provider value={{  className: "option-icon-size" }}>
                            <div>
                            <AiOutlineArrowUp />
                            </div>
                        </IconContext.Provider>    
                    </div>
                    <div className="option-content">
                        Up
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
                            <GoPlus />
                            </div>
                        </IconContext.Provider>    
                    </div>
                    <div className="option-content">
                        Faster
                    </div>
                </div>
                <div className="option-item-wrapper">
                    <div className="option-icon">
                        <IconContext.Provider value={{  className: "option-icon-size" }}>
                            <div>
                            <GoDash />
                            </div>
                        </IconContext.Provider>    
                    </div>
                    <div className="option-content">
                        Slower
                    </div>
                </div>
                <div className="speed">
                    <div className="speed-content">
                    Speed : {this.state.speed}px/100ms
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

export default AutoScroll;
