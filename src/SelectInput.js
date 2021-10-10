/*SelectInput Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { AiOutlineCloseCircle, AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import $ from 'jquery';

class SelectInput extends Component {
  constructor(props){
    super(props);
    this.bodyEl = null;
    this.handleExit = this.handleExit.bind(this);
    this.singleDigitConvert = this.singleDigitConvert.bind(this);
    this.update = this.update.bind(this);
    this.componentDidMount();
    this.setBodyRef = el =>{
      this.bodyEl = el;
    };
  }

  componentDidMount(){
    this.selectOptions = Array.from(this.props.element.options);
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
    return false;
  }

  update(noString){
    const no = parseInt(noString);
    if(no <= this.props.element.options.length && no > 0){
        this.props.element.value = this.selectOptions[no - 1].value;
        setTimeout(()=>{this.handleExit();},400);
    }
  }

  componentDidUpdate(prevProps) {
    try{
    if(prevProps.random !== this.props.random) {     
      if(this.props.spokenText !== undefined){
        var noString = this.props.spokenText.trim().toLowerCase();
        if(!isNaN(this.props.spokenText)){
            this.update(this.props.spokenText);
        } else if(this.singleDigitConvert(noString) !== false){
            this.update(this.singleDigitConvert(noString));
        } else{
          var text = this.props.spokenText.trim().toLowerCase();
          if(text.includes('scroll up') || text.includes('up') || text.includes('u') ){
            $(this.bodyEl).scrollTop($(this.bodyEl).scrollTop() - $(this.bodyEl)[0].clientHeight);
          } else if(text.includes('scroll down')  || text.includes('down')  || text.includes('d') ){
            $(this.bodyEl).scrollTop($(this.bodyEl).scrollTop() + $(this.bodyEl)[0].clientHeight);
          } else if(text.includes('exit')  || text.includes('ex') ){
            setTimeout(()=>{this.handleExit();},400);
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
    this.currentControlBody = [];
    for(var i = 1 ; i <= this.selectOptions.length ; i++){
      this.currentControlBody.push(
                <div className="option-item-wrapper" style={{   'height' : 'unset', 
                                                                'margin' : '0px', 
                                                                'background-color' : 'unset', 
                                                                'line-height' : '20px', 
                                                                'border-bottom' : '1px solid rgba(0,0,0,0.4)' , 
                                                                'border-top' : 'none',
                                                                'border-left' : 'none',
                                                                'border-right' : 'none',
                                                                'border-radius' : 'unset',
                                                                'padding' : '5px' }}>
                    <div className="option-label">
                        {i}
                    </div>
                    <div className="option-content" style={{ 'padding' : '0px 2px 0px 8px', 'line-height' : 'unset'}}>
                        { this.selectOptions[i-1].innerHTML }
                    </div>
                </div>
      );
    }
  
    return (      
        <div className="voice-browser-options-bar" style={{ 'background-color' : 'white'}}>   
            <section className="select-option-bar">
                <div className="topBar">
                    <div className="option-item-wrapper">
                        <div className="option-icon">
                            <IconContext.Provider value={{  className: "option-icon-size" }}>
                                <div>
                                    <AiOutlineArrowUp />
                                </div>
                            </IconContext.Provider>    
                        </div>
                        <div className="option-content">
                            Scroll Up
                        </div>
                    </div>   
                    <div className="option-item-wrapper exit-option" >
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
                <div className="body" ref={this.setBodyRef}> 
                    {this.currentControlBody}
                </div>
                <div className="bottomBar">            
                    <div className="option-item-wrapper">
                        <div className="option-icon">
                            <IconContext.Provider value={{  className: "option-icon-size" }}>
                                <div>
                                    <AiOutlineArrowDown  /> 
                                </div>
                            </IconContext.Provider>    
                        </div>
                        <div className="option-content">
                        Scroll Down
                        </div>
                    </div>
                </div>
            </section>
      </div>
    );
  }
}

export default SelectInput;



   