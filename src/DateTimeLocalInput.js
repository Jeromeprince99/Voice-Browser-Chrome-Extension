/*DateTimeLocalInput Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import $ from 'jquery';
import CalendarPage from 'calendar-page';
import { format } from 'fecha';

class DateTimeLocal extends Component {
  constructor(props){
    super(props);
    this.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    this.tabClass = ['control-button-active','','','',''];
    this.dateBoxStyle = '';
    this.dateBoxStyleHorizontalPadding = '';
    this.handleExit = this.handleExit.bind(this);
    this.singleDigitConvert = this.singleDigitConvert.bind(this);
    this.moveToYear = this.moveToYear.bind(this);
    this.moveToMonth = this.moveToMonth.bind(this);
    this.moveToDate = this.moveToDate.bind(this);
    this.moveToHour = this.moveToHour.bind(this);
    this.moveToMinute = this.moveToMinute.bind(this);
    this.update = this.update.bind(this);
    this.state = {currentControlBody : 'year',
                  selectedValue : 'please select'};
    this.componentDidMount();
  }

  componentDidMount(){
    try{
    //Date
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
    //Time 
    this.hour = null;
    this.minute = null;
    this.minMinute = null;
    this.minHour = null;
    this.maxMinute = null;
    this.maxHour = null;
    if(this.props.element.hasAttribute('min')){
        var dateAndTime = this.props.element.min.split('T');
        var minDate = dateAndTime[0].split('-');
        this.minMonth = parseInt(minDate[1]);
        this.minYear = parseInt(minDate[0]);
        this.minDate = parseInt(minDate[2]);
        var minTime = dateAndTime[1].split(':');
        this.minMinute = parseInt(minTime[1]);
        this.minHour = parseInt(minTime[0]);
    }
    if(this.props.element.hasAttribute('max')){
        var dateAndTime = this.props.element.max.split('T');
        var maxDate = dateAndTime[0].split('-');
        this.maxMonth = parseInt(maxDate[1]);
        this.maxYear = parseInt(maxDate[0]);
        this.maxDate = parseInt(maxDate[2]);
        var maxTime = dateAndTime[1].split(':');
        this.maxMinute = parseInt(maxTime[1]);
        this.maxHour = parseInt(maxTime[0]);
    }
    if(this.props.element.hasAttribute('step')){
        this.step = this.props.element.step;
    }
    if(this.props.element.hasAttribute('value')){
        var dateAndTime = this.props.element.value.split('T');

        var defaultDateValue = dateAndTime[0].split('-');
        this.year = parseInt(defaultDateValue[0]);
        this.month = parseInt(defaultDateValue[1]);
        this.date = parseInt(defaultDateValue[2]);
        
        var defaultTimeValue = dateAndTime[1].split(':');
        this.hour = parseInt(defaultTimeValue[0]);
        this.minute = parseInt(defaultTimeValue[1]);
        this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date, this.hour, this.minute), 'dddd MMMM Do YYYY, hh:mm A')});
    }else{
        var d = new Date();
        this.date = d.getDate();
        this.month = d.getMonth() + 1;
        this.year = d.getFullYear();
        this.hour = d.getHours();
        this.minute = d.getMinutes();
        this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date, this.hour, this.minute), 'dddd MMMM Do YYYY, hh:mm A')});
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
          if(this.year === this.minYear && this.year === this.maxYear){
              if(no >= this.minMonth && no <= this.maxMonth) {this.month = no; this.moveToDate();}
          } else if(this.year === this.minYear){
              if(no >= this.minMonth) {this.month = no; this.moveToDate();}
          } else if(this.year === this.maxYear){
              if(no <= this.maxMonth) {this.month = no; this.moveToDate();}
          } else{
             this.month = no;
             this.moveToDate();
          }
          this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date, this.hour, this.minute), 'dddd MMMM Do YYYY, hh:mm A')});
      }        
    }else if(this.state.currentControlBody === 'date'){
        var date = new Date(this.year, this.month-1, 0).getDate();
        if(no <= date && no > 0){
            if(this.year === this.minYear && this.month === this.minMonth && this.year === this.maxYear && this.month === this.maxMonth){
                if(no >= this.minDate && no <= this.maxDate) {this.date = no; this.moveToHour();}
            } else if(this.year === this.minYear && this.month === this.minMonth){
                if(no >= this.minDate) {this.date = no; this.moveToHour();}
            } else if(this.year === this.maxYear && this.month === this.maxMonth){
                if(no <= this.maxDate) {this.date = no; this.moveToHour();}
            } else{
               this.date = no;
               this.moveToHour();
            }
            this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date, this.hour, this.minute), 'dddd MMMM Do YYYY, hh:mm A')});
        }        
    }else if(this.state.currentControlBody === 'year'){
        if(this.minYear !== null || this.maxYear !== null){
            if(this.minYear !== null && this.maxYear !== null){
                if((no >= this.minYear) && (no <= this.maxYear)){ this.year = no; this.moveToMonth();}
            } else if( this.minYear !== null ){
                if(no >= this.minYear) {this.year = no; this.moveToMonth();}
            } else if(this.maxYear !== null){
                if(no <= this.maxYear) {this.year = no; this.moveToMonth();}
            }
        } else{
            this.year = no;
            this.moveToMonth();
        }
        this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date, this.hour, this.minute), 'dddd MMMM Do YYYY, hh:mm A')});
    } else if(this.state.currentControlBody === 'hour'){
        if(no <= 23 && no >= 0){
            if(this.year === this.minYear && this.month === this.minMonth && this.date === this.minDate && this.year === this.maxYear && this.month === this.maxMonth && this.date === this.maxDate){
                if((no >= this.minHour) && (no <= this.maxHour)) {this.hour = no; this.moveToMinute();}
            } else if(this.year === this.minYear && this.month === this.minMonth  && this.date === this.minDate ){
                if(no >= this.minHour) {this.hour = no; this.moveToMinute();}
            } else if(this.year === this.maxYear && this.month === this.maxMonth && this.date === this.maxDate ){
                if(no <= this.maxHour) {this.hour = no; this.moveToMinute();}
            } else{
                this.hour = no;
                this.moveToMinute();
            }
            this.setState({selectedValue : format(new Date(this.year, this.month-1, this.date, this.hour, this.minute), 'dddd MMMM Do YYYY, hh:mm A')});
        }        
    } else if(this.state.currentControlBody === 'minute'){
        if(no <= 59 && no >= 0){
            if(this.year === this.minYear && this.month === this.minMonth && this.date === this.minDate && this.hour === this.minHour && this.year === this.maxYear && this.month === this.maxMonth && this.date === this.maxDate && this.hour === this.maxHour){
                if((no >= this.minMinute) && (no <= this.maxMinute)) this.minute = no; 
            } else if(this.year === this.minYear && this.month === this.minMonth  && this.date === this.minDate  && this.hour === this.minHour ){
                if(no >= this.minMinute) this.minute = no;
            } else if(this.year === this.maxYear && this.month === this.maxMonth && this.date === this.maxDate  && this.hour === this.maxHour ){
                if(no <= this.maxMinute) this.minute = no;
            } else{
                this.minute = no;         
            }
            this.setState({selectedValue :  format(new Date(this.year, this.month-1, this.date, this.hour, this.minute), 'dddd MMMM Do YYYY, hh:mm A')});
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
          if(text.includes('month') || text.includes('manth') || text.includes('mon') || text.includes('nth')){
            this.moveToMonth();
          } else if(text.includes('year')  || text.includes('yeah')  || text.includes('dear')  || text.includes('y')  || text.includes('er')){
            this.moveToYear();
          } else if(text.includes('date')  || text.includes('da')){
            this.moveToDate();
          } else if(text.includes('hour') || text.includes('our') || text.includes('aur') || text.includes('h')){
            this.moveToHour();
          } else if(text.includes('minute')  || text.includes('minit')  || text.includes('minat') ){
            this.moveToMinute();
          } else if(text.includes('submit')  || text.includes('summit')  || text.includes('sub') ){
            this.props.element.value = this.year+'-'+(this.month < 10? '0'+this.month:this.month)+'-'+(this.date < 10? '0'+this.date:this.date)+'T'+(this.hour < 10? '0'+this.hour:this.hour)+':'+(this.minute < 10? '0'+this.minute:this.minute);
            setTimeout(()=>{this.handleExit();},400);
          } else if(text.includes('exit')  || text.includes('ex') ){
            setTimeout(()=>{this.handleExit();},400);
          } 
        }         
      }          
    }
    }catch(e){console.log(e)}
  } 

  moveToYear (){
    this.tabClass = ['control-button-active','','','',''];
    this.dateBoxStyle = '';
    this.dateBoxStyleHorizontalPadding = '';
    this.setState({currentControlBody : 'year'});
  }

  moveToMonth(){
    this.tabClass = ['','control-button-active','','',''];
    this.dateBoxStyle = '';
    this.dateBoxStyleHorizontalPadding = ''; 
    this.setState({currentControlBody : 'month'});
  }
  
  moveToDate(){
    this.tabClass = ['','','control-button-active','',''];
    this.dateBoxStyle = 'dateBoxStyle';
    this.dateBoxStyleHorizontalPadding = 'dateBoxStyleHorizontalPadding';
    this.setState({currentControlBody : 'date'});
  }
  
  moveToHour(){
    this.tabClass = ['','','','control-button-active',''];
    this.dateBoxStyle = '';
    this.dateBoxStyleHorizontalPadding = '';
    this.setState({currentControlBody : 'hour'});
  }
  
  moveToMinute(){
    this.tabClass = ['','','','','control-button-active'];
    this.dateBoxStyle = '';
    this.dateBoxStyleHorizontalPadding = '';
    this.setState({currentControlBody : 'minute'});
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
      } else if(this.state.currentControlBody === 'year'){
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
      } else if( this.state.currentControlBody === 'hour'){
        var value = 'Please say any number from 0 to 23';
        var currentControlBody = <b>
                                    {value}
                                </b>;
      } else if( this.state.currentControlBody === 'minute'){
        var value = 'Please say any number from 0 to 59';
        var currentControlBody = <b>
                                    {value}
                                </b>;
      }
      var condition = 'Please say any year, month, date, hour and minute';
        if(this.props.element.hasAttribute('min')){
            condition += ' from '+ format(new Date(this.minYear, this.minMonth-1, this.minDate, this.minHour, this.minMinute), 'MMMM Do YYYY, hh:mm A');
        }
        if(this.props.element.hasAttribute('max')){
            condition += ' to '+ format(new Date(this.maxYear, this.maxMonth-1, this.maxDate, this.maxHour, this.maxMinute), 'MMMM Do YYYY, hh:mm A');
        }
        if(this.props.element.hasAttribute('step')){
            condition += ' in intervals of '+this.step+' seconds';
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
                    <div className={"control-button "+ this.tabClass[3]}>
                        hour
                    </div>
                    <div className={"control-button "+ this.tabClass[4]}>
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
            <section className={"complex-input-box-body "+ this.dateBoxStyle +" " + this.dateBoxStyleHorizontalPadding}  style={{ 'max-width' : '490px' }}>
                {currentControlBody}
            </section>
            <section className="complex-input-box-bottomBar">
                <div className="conditions" style={{ 'max-width' : '490px', 'padding' : '0px 10px' }}>
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

export default DateTimeLocal;
