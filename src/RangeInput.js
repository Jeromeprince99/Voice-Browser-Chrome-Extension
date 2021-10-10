/*Range Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import $ from 'jquery';

class Range extends Component {
  constructor(props){
    super(props);
    this.handleExit = this.handleExit.bind(this);
    this.initialize = this.initialize.bind(this);
    this.initialize();
  }

  initialize(){
    this.max = 100;
    this.min = 0;
    this.step = 1;
    if(this.props.element.hasAttribute('max')){
     this.max = this.props.element.getAttribute('max');
    }
    if(this.props.element.hasAttribute('min')){
     this.min = this.props.element.getAttribute('min');
    }
    if(this.props.element.hasAttribute('step')){
     this.step = this.props.element.getAttribute('step');
    }
  }

  componentDidMount(){
   
  }

  componentDidUpdate(prevProps) {
    try{
    if(prevProps.random !== this.props.random) {     
      if(this.props.spokenText !== undefined){
        if(!isNaN(this.props.spokenText)){
          if(this.props.spokenText.includes('.')){
            this.no = parseFloat(this.props.spokenText);
          }else{
            this.no = parseInt(this.props.spokenText);
          }
          if(this.no >= this.min && this.no <= this.max){
            this.props.element.value = this.no;
            setTimeout(()=>{this.handleExit();},700);
          }                
        }else{
          var text = this.props.spokenText.trim().toLowerCase();
          if((text.length <= 5) && text.includes('exit')){
            this.componentWillUnmount();
            this.props.exit();
            return;
          }   
        }         
      }          
    }
    }catch(e){console.log(e)}
  } 

  handleExit(){
    this.componentWillUnmount();
    this.props.exit();    
  }

  componentWillUnmount(){
    $(this.props.element).removeClass("shadow-for-box-voice-browser-green");
  }

  render() {
    return (      
        <div className="voice-browser-options-bar">      
          <div className="option-guidance-text">
            <div className="option-guidance-icon">
              <IconContext.Provider value={{  className: "option-guidance-icon-size" }}>
                  <div>
                  <IoMdInformationCircleOutline /> 
                  </div>
              </IconContext.Provider>    
            </div>
            <div className="option-guidance-content">
              Tell number between <b>{this.min}</b> to <b>{this.max}</b> in intervals of <b>{this.step}</b>
            </div>
            <div className="exit-button-wrapper">
              <div className="exit-icon">
                  <IconContext.Provider value={{  className: "exit-icon-size" }}>
                      <div>
                      <AiOutlineCloseCircle /> 
                      </div>
                  </IconContext.Provider>    
              </div>
              <div className="exit-content">
                  Exit
              </div>
            </div>
          </div>   
        </div>
    );
  }
}

export default Range;


