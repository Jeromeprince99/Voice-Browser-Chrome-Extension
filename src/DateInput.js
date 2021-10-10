/*DateInput Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import $ from 'jquery';
import CalendarPage from 'calendar-page';
import { format } from 'fecha';

class DateInput extends Component {
  constructor(props){
    super(props);
    this.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    this.tabClass = ['control-button-active','',''];
    this.dateBoxStyle = '';
    this.handleExit = this.handleExit.bind(this);
    this.singleDigitConvert = this.singleDigitConvert.bind(this);
    this.update = this.update.bind(this);
    this.state = {currentControlBody : 'year',
                  selectedValue : 'please select'};
    this.componentDidMount();
  }

  componentDidMount(){
    try{
    this.year = null;
    this.month = null;
    this.date = null;
    this.minMonth = null;
    this.minYear = null;
    this.minDate = null;
    this.maxMonth = null;
    this.maxYear = null;
    this.maxDate = null;
    this.step = null;
    if(this.props.element.hasAttribute('min')){
        var min = this.props.element.min.split('-');
        this.minMonth = parseInt(min[1]);
        this.minYear = parseInt(min[0]);
        this.minDate = parseInt(min[2]);
    }
    if(this.props.element.hasAttribute('max')){
        var max = this.props.element.max.split('-');
        this.maxMonth = parseInt(max[1]);
        this.maxYear = parseInt(max[0]);
        this.maxDate = parseInt(max[2]);
    }
    if(this.props.element.hasAttribute('step')){
        this.step = this.props.element.step;
    }
    if(this.props.element.hasAttribute('value')){
        var defaultValue = this.props.element.value.split('-');
        this.year = parseInt(defaultValue[0]);
        this.month = parseInt(defaultValue[1]);
        this.date = parseInt(defaultValue[2]);
        this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date), 'dddd MMMM Do, YYYY')});
    }else{
        var d = new Date();
        this.date = d.getDate();
        this.month = d.getMonth() + 1;
        this.year = d.getFullYear();
        this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date), 'dddd MMMM Do, YYYY')});
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
    if(this.state.currentControlBody === 'month'){
      if(no <= 12 && no > 0){
          if(this.year === this.minYear){
              if(no >= this.minMonth)this.month = no;
          } else if(this.year === this.maxYear){
              if(no <= this.maxMonth)this.month = no;
          } else{
             this.month = no;
          }
          this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date), 'dddd MMMM Do, YYYY')});
      }        
    }else if(this.state.currentControlBody === 'date'){
        var date = new Date(this.year, this.month-1, 0).getDate();
        if(no <= date && no > 0){
            if(this.year === this.minYear && this.month === this.minMonth){
                if(no >= this.minDate)this.date = no;
            } else if(this.year === this.maxYear && this.month === this.maxMonth){
                if(no <= this.maxDate)this.date = no;
            } else{
               this.date = no;
            }
            this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date), 'dddd MMMM Do, YYYY')});
        }        
    }else{
        if(this.minYear !== null || this.maxYear !== null){
            if(this.minYear !== null && this.maxYear !== null){
                if((no >= this.minYear) && (no <= this.maxYear)) this.year = no;
            } else if( this.minYear !== null ){
                if(no >= this.minYear) this.year = no;
            } else if(this.maxYear !== null){
                if(no <= this.maxYear) this.year = no;
            }
        } else{
            this.year = no;
        }
        this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date), 'dddd MMMM Do, YYYY')});
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
          if(text.includes('month') || text.includes('manth') || text.includes('mon') || text.includes('nth')){
            this.setState({currentControlBody : 'month'});
            this.tabClass = ['','control-button-active',''];
            this.dateBoxStyle = '';
          } else if(text.includes('year')  || text.includes('yeah')  || text.includes('dear')  || text.includes('y')  || text.includes('er')){
            this.setState({currentControlBody : 'year'});
            this.tabClass = ['control-button-active','',''];
            this.dateBoxStyle = '';
          } else if(text.includes('date')  || text.includes('da')){
            this.setState({currentControlBody : 'date'});
            this.tabClass = ['','','control-button-active'];
            this.dateBoxStyle = 'dateBoxStyle';
          } else if(text.includes('submit')  || text.includes('summit')  || text.includes('sub') ){
            this.props.element.value = this.year+'-'+(this.month < 10? '0'+this.month:this.month)+'-'+(this.date < 10? '0'+this.date:this.date);
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
    this.setState({currentControlBody : 'year',
                   selectedValue : 'please select'});
    $(this.props.element).removeClass("shadow-for-box-voice-browser-green");
  }

  render() {
      if(this.state.currentControlBody === 'month'){
        var id = 0;
        var currentControlBody = this.months.map((month) => {
            id = id+1;
            return  <div className="option-item-wrapper" style={{ 'background-color' : 'unset', 'box-shadow' : 'rgba(0, 0, 0, 0.19) 0px 0px 5px .3px', 'margin' : '8px', 'line-height' : '20px', 'height' : '20px', 'text-align' : 'center'}}>
                        <div className="option-label">
                            {id}
                        </div>
                        <div className="option-content" style={{ 'font-weight': '100', 'padding' : '0px 2px', 'line-height' : 'unset'}}>
                            {month}
                        </div>
                    </div>
          });
      } else if(this.state.currentControlBody === 'date'){
        var date = new Date(this.year, this.month-1, 1); 
        var page = new CalendarPage(date);

        var currentControlBody = [];
        for (var i = 0; i < this.days.length; i++){
            currentControlBody.push(
                <div className="headingContent">{this.days[i]}</div>
            );
        }
        for (var i = 0; i < page.previousDates.length; i++){
            currentControlBody.push(
                <div className="dateWrapper" >
                    <div className="notSelectable">{page.previousDates[i].toString().split(' ')[2]}</div>
                </div>
            );
        }
        for (var i = 0; i < page.currentDates.length; i++){
            currentControlBody.push(
                <div className="dateWrapper">
                    <div className="selectable">{page.currentDates[i].toString().split(' ')[2]}</div>
                </div>
            );
        }
        for (var i = 0; i < page.nextDates.length; i++){
            currentControlBody.push(
                <div className="dateWrapper" >
                    <div className="notSelectable">{page.nextDates[i].toString().split(' ')[2]}</div>
                </div>
            );
        }
      } else{
        var value = 'Please say any year';
        if(this.props.element.hasAttribute('min')){
            value += ' from '+this.minYear;
        }
        if(this.props.element.hasAttribute('max')){
            value += ' to '+this.maxYear;
        }     
        var currentControlBody = <b>
                                    {value}
                                </b>;
      }
      var condition = 'Please say any year, month and date';
        if(this.props.element.hasAttribute('min')){
            condition += ' from '+this.minYear+'-'+(this.minMonth < 10? '0'+this.minMonth:this.minMonth)+'-'+(this.minDate < 10? '0'+this.minDate:this.minDate);
        }
        if(this.props.element.hasAttribute('max')){
            condition += ' to '+this.maxYear+'-'+(this.maxMonth < 10? '0'+this.maxMonth:this.maxMonth)+'-'+(this.maxDate < 10? '0'+this.maxDate:this.maxDate);
        }
        if(this.props.element.hasAttribute('step')){
            condition += ' in intervals of '+this.step+' days';
        }        
    return (      
        <div className="voice-browser-options-bar" style={{ 'background-color' : 'white'}}>   
            <section className="complex-input-box-topBar">
                <div className="complex-control-options">
                    <div className={"control-button "+ this.tabClass[0]}>
                        year
                    </div>
                    <div className={"control-button "+ this.tabClass[1]}>
                        month
                    </div>
                    <div className={"control-button "+ this.tabClass[2]}>
                        date
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
            <section className={"complex-input-box-body "+ this.dateBoxStyle}>
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

export default DateInput;
