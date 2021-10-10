/*TimeInput Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import $ from 'jquery';

class Time extends Component {
  constructor(props){
    super(props);
    this.tabClass = ['control-button-active',''];
    this.handleExit = this.handleExit.bind(this);
    this.singleDigitConvert = this.singleDigitConvert.bind(this);
    this.update = this.update.bind(this);
    this.state = {currentControlBody : 'hour',
                  selectedValue : 'please select'};
    this.componentDidMount();
  }

  componentDidMount(){
    try{
    this.hour = null;
    this.minute = null;
    this.minMinute = null;
    this.minHour = null;
    this.maxMinute = null;
    this.maxHour = null;
    if(this.props.element.hasAttribute('min')){
        var min = this.props.element.min.split(':');
        this.minMinute = parseInt(min[1]);
        this.minHour = parseInt(min[0]);
    }
    if(this.props.element.hasAttribute('max')){
        var max = this.props.element.max.split(':');
        this.maxMinute = parseInt(max[1]);
        this.maxHour = parseInt(max[0]);
    }
    if(this.props.element.hasAttribute('value')){
        var defaultValue = this.props.element.value.split(':');
        this.hour = parseInt(defaultValue[0]);
        this.minute = parseInt(defaultValue[1]);
        this.setState({selectedValue :  (this.hour < 10? '0'+this.hour:this.hour)+':'+(this.minute < 10? '0'+this.minute:this.minute)});
    }
    }catch(e){console.log(e)}
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
    try{
    const no = parseInt(noString);
    if(this.state.currentControlBody === 'hour'){
      if(no <= 23 && no >= 0){
        if(this.minHour !== null || this.maxHour !== null){
          if(this.minHour !== null && this.maxHour !== null){
              if((no >= this.minHour) && (no <= this.maxHour)) this.hour = no;
          } else if( this.minHour !== null ){
              if(no >= this.minHour) this.hour = no;
          } else if(this.maxHour !== null){
              if(no <= this.maxHour) this.hour = no;
          }
        } else{
            this.hour = no;
        }
        this.setState({selectedValue :  (this.hour < 10? '0'+this.hour:this.hour)+':'+(this.minute < 10? '0'+this.minute:this.minute)});
      }        
    }else{
      if(no <= 59 && no >= 0){
        if(this.hour === this.minHour){
          if(no >= this.minMinute)this.minute = no;
        } else if(this.hour === this.maxHour){
          if(no <= this.maxMinute)this.minute = no;
        } else{
          this.minute = no;
        }
        this.setState({selectedValue :  (this.hour < 10? '0'+this.hour:this.hour)+':'+(this.minute < 10? '0'+this.minute:this.minute)});
      }        
    }
    }catch(e){console.log(e)}
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
          if(text.includes('hour') || text.includes('our') || text.includes('aur') || text.includes('h')){
            this.setState({currentControlBody : 'hour'});
            this.tabClass = ['control-button-active','']
          } else if(text.includes('minute')  || text.includes('minit')  || text.includes('minat') ){
            this.setState({currentControlBody : 'minute'});
            this.tabClass = ['','control-button-active']
          } else if(text.includes('submit')  || text.includes('summit')  || text.includes('sub') ){
            this.props.element.value = (this.hour < 10? '0'+this.hour:this.hour)+':'+(this.minute < 10? '0'+this.minute:this.minute);
            setTimeout(()=>{this.handleExit();},400);
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
    this.setState({currentControlBody : 'hour',
                   selectedValue : 'please select'});
    $(this.props.element).removeClass("shadow-for-box-voice-browser-green");
  }

  render() {
      if(this.state.currentControlBody === 'hour'){
        var modified = false;
        var value = 'Please say any number';
        if(this.props.element.hasAttribute('min')){
            value += ' from '+this.minHour; modified = true;
        }
        if(this.props.element.hasAttribute('max')){
            value += ' to '+this.maxHour; modified = true;
        } 
        if(!modified){value = 'Please say any number from 0 to 23';}
        var currentControlBody = <b>
                                    {value}
                                </b>;
      }else{
        var value = 'Please say any number from 0 to 59';
        var currentControlBody = <b>
                                    {value}
                                </b>;
      }
      var condition = 'Please say any hour and minute (24 hour format)';
      if(this.props.element.hasAttribute('min')){
          condition += ' from '+ (this.minHour < 10? '0'+this.minHour:this.minHour)+':'+(this.minMinute < 10? '0'+this.minMinute:this.minMinute);
      }
      if(this.props.element.hasAttribute('max')){
          condition += ' to '+ (this.maxHour < 10? '0'+this.maxHour:this.maxHour)+':'+(this.maxMinute < 10? '0'+this.maxMinute:this.maxMinute);
      }
    return (      
        <div className="voice-browser-options-bar" style={{ 'background-color' : 'white'}}>   
            <section className="complex-input-box-topBar">
                <div className="complex-control-options">
                    <div className={"control-button "+ this.tabClass[0]}>
                        hour
                    </div>
                    <div className={"control-button "+ this.tabClass[1]}>
                        minute
                    </div>
                </div>
                <div className="main-options">
                    <div className="option-item-wrapper" style={{ 'margin' : '2px 8px 8px 8px' }}>
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
                    <div className="option-item-wrapper"  style={{ 'margin' : '2px 8px 8px 8px' }}>
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
            </section>
            <section className="complex-input-box-body">
                {currentControlBody}
            </section>
            <section className="complex-input-box-bottomBar">
                <div className="conditions">
                    {condition}
                </div>
                <div className="selectedValue">
                    Selected Value :  {this.state.selectedValue}
                </div>
            </section>
      </div>
    );
  }
}

export default Time;