/*WeekInput Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import $ from 'jquery';
import CalendarPage from 'calendar-page';
import currentWeekNumber from 'current-week-number';

class Week extends Component {
  constructor(props){
    super(props);
    this.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    this.tabClass = ['control-button-active','',''];
    this.dateBoxStyle = '';
    this.weekBoxStyle = '';
    this.currentWeeks = [];
    this.handleExit = this.handleExit.bind(this);
    this.singleDigitConvert = this.singleDigitConvert.bind(this);
    this.getDefaultValueMonthNameFromWeek = this.getDefaultValueMonthNameFromWeek.bind(this);
    this.ordinal_suffix_of = this.ordinal_suffix_of.bind(this);
    this.moveToYear = this.moveToYear.bind(this);
    this.moveToMonth = this.moveToMonth.bind(this);
    this.moveToWeek = this.moveToWeek.bind(this);
    this.update = this.update.bind(this);
    this.state = {currentControlBody : 'year',
                  selectedValue : 'please select'};
    this.componentDidMount();
  }

  componentDidMount(){
    try{
    this.year = null;
    this.month = null;
    this.week = null;
    this.minWeek = null;
    this.minYear = null;
    this.maxWeek = null;
    this.maxYear = null;
    this.step = null;
    if(this.props.element.hasAttribute('min')){
        var min = this.props.element.min.split('-');
        this.minWeek = parseInt(min[1].substring(1));
        this.minYear = parseInt(min[0]);
    }
    if(this.props.element.hasAttribute('max')){
        var max = this.props.element.max.split('-');
        this.maxWeek = parseInt(max[1].substring(1));
        this.maxYear = parseInt(max[0]);
    }
    if(this.props.element.hasAttribute('step')){
        this.step = this.props.element.step;
    }
    if(this.props.element.hasAttribute('value')){
        var defaultValue = this.props.element.value.split('-');
        this.year = parseInt(defaultValue[0]);
        this.week = parseInt(defaultValue[1].substring(1));
        this.month = this.getDefaultValueMonthNameFromWeek(this.year, this.week);
        this.setState({selectedValue : this.months[this.month-1]+' '+this.year+', '+this.ordinal_suffix_of(this.week)+' Week'});
    }else{
        var d = new Date();
        this.week = currentWeekNumber(d);
        this.month = d.getMonth() + 1;
        this.year = d.getFullYear();
        this.setState({selectedValue : this.months[this.month-1]+' '+this.year+', '+this.ordinal_suffix_of(this.week)+' Week'});
    }
    }catch(e){console.log(e)}
  }

  getDefaultValueMonthNameFromWeek(year, week){   
    for(var month = 0; month < 12 ; month++){
        var date = new Date(year, month, 1);
        var monthPage = new CalendarPage(date);
        for(var i = 0; i < monthPage.allDates.length; ){
            var dateString = monthPage.allDates[i].toString().split(' ');
            if(week === currentWeekNumber(monthPage.allDates[i])){
                if(year === parseInt(dateString[3])) return month+1;
                else{
                    if(month === 0){
                        if(currentWeekNumber(monthPage.allDates[i]) === 1){
                            return month+1;
                        }
                    }
                }
            }
            i += 7;
        }
    }
  }

  ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
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
            var minMonth = this.getDefaultValueMonthNameFromWeek(this.minYear, this.minWeek);
            var maxMonth = this.getDefaultValueMonthNameFromWeek(this.maxYear, this.maxWeek);
            if(no >= minMonth && no <= maxMonth){this.month = no; this.moveToWeek();}
          } else if(this.year === this.minYear){
            var minMonth = this.getDefaultValueMonthNameFromWeek(this.minYear, this.minWeek);
            if(no >= minMonth){this.month = no; this.moveToWeek();}
          } else if(this.year === this.maxYear){
            var maxMonth = this.getDefaultValueMonthNameFromWeek(this.maxYear, this.maxWeek);
            if(no <= maxMonth){this.month = no; this.moveToWeek();}
          } else{
             this.month = no; this.moveToWeek();
          }
          this.setState({selectedValue : this.months[this.month-1]+' '+this.year+', '+this.ordinal_suffix_of(this.week)+' Week'});
      }        
    }else if(this.state.currentControlBody === 'week'){
        var toProcess;
        var toReturn = true;
        for(var j=0;j<this.currentWeeks.length;j++){
            if(parseInt(this.currentWeeks[j].split(' ')[0]) === no){
                toProcess = this.currentWeeks[j];
                toReturn = false;
                break;
            }
        }
        if(toReturn) return;
        var week = parseInt(toProcess.split(' ')[0]);
        var month = parseInt(toProcess.split(' ')[1]);
        var year = parseInt(toProcess.split(' ')[2]);
        if(month === 1){
            if(week === 52 || week === 53){
                month = 12;
                year = year - 1;
            }
        }
        if(month === 12){
            if(week === 1){
                month = 1;
                year = year + 1;
            }
        }
        if(year === this.minYear && year === this.maxYear){
            if(no >= this.minWeek && no <= this.maxWeek) this.week = week; this.year = year; this.month = month;
        } else if(year === this.minYear){
            if(no >= this.minWeek) this.week = week; this.year = year; this.month = month;
        } else if(year === this.maxYear){
            if(no <= this.maxWeek) this.week = week; this.year = year; this.month = month;
        } else{
            this.week = week; this.year = year; this.month = month;
        }
        this.setState({selectedValue : this.months[this.month-1]+' '+this.year+', '+this.ordinal_suffix_of(this.week)+' Week'});    
    }else{
        if(this.minYear !== null || this.maxYear !== null){
            if(this.minYear !== null && this.maxYear !== null){
                if((no >= this.minYear) && (no <= this.maxYear)){ this.year = no; this.moveToMonth();}
            } else if( this.minYear !== null ){
                if(no >= this.minYear){ this.year = no; this.moveToMonth();}
            } else if(this.maxYear !== null){
                if(no <= this.maxYear){ this.year = no; this.moveToMonth();}
            }
        } else{
            this.year = no; this.moveToMonth();
        }
        this.setState({selectedValue : this.months[this.month-1]+' '+this.year+', '+this.ordinal_suffix_of(this.week)+' Week'});
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
          } else if(text.includes('week')  || text.includes('weak')  || text.includes('w')){
            this.moveToWeek();
          } else if(text.includes('submit')  || text.includes('summit')  || text.includes('sub') ){
            this.props.element.value = this.year+'-W'+(this.week < 10? '0'+this.week:this.week);
            setTimeout(()=>{this.handleExit();},400);
          } else if(text.includes('exit')  || text.includes('ex') ){
            setTimeout(()=>{this.handleExit();},400);
          } 
        }         
      }          
    }
    }catch(e){console.log(e)}
  } 

  moveToYear(){
    this.tabClass = ['control-button-active','',''];
    this.dateBoxStyle = '';
    this.weekBoxStyle = '';
    this.setState({currentControlBody : 'year'});
  }
  
  moveToMonth(){
    this.tabClass = ['','control-button-active',''];
    this.dateBoxStyle = '';
    this.weekBoxStyle = '';
    this.setState({currentControlBody : 'month'});
  }
  
  moveToWeek(){
    this.tabClass = ['','','control-button-active'];
    this.dateBoxStyle = 'dateBoxStyle';
    this.weekBoxStyle = 'weekBoxStyle';
    this.setState({currentControlBody : 'week'});
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
      } else if(this.state.currentControlBody === 'week'){
        var date = new Date(this.year, this.month-1, 1); 
        var page = new CalendarPage(date);
        this.currentWeeks = [];

        var currentControlBody = [];
        currentControlBody.push(
            <div className="headingContent" style={{ 'width' : '50px' }}>Week</div>
        );
        for (var i = 0; i < this.days.length; i++){
            currentControlBody.push(
                <div className="headingContent">{this.days[i]}</div>
            );
        }
        for (var i = 0; i < page.previousDates.length; i++){
            if(page.previousDates[i].toString().split(' ')[0] === 'Mon'){
                this.currentWeeks.push( currentWeekNumber(page.previousDates[i])+' '+ (page.previousDates[i].getMonth()+1) +' '+ page.previousDates[i].getFullYear() );
                currentControlBody.push(
                    <div className="dateWrapper" style={{ 'width' : '50px' , 'font-weight' : '600'}}>
                        <div className="selectable">{currentWeekNumber(page.previousDates[i])}</div>
                    </div>
                );
            }
            currentControlBody.push(
                <div className="dateWrapper" >
                    <div className="notSelectable" style={{ 'color' : 'black' }}>{page.previousDates[i].toString().split(' ')[2]}</div>
                </div>
            );
        }
        for (var i = 0; i < page.currentDates.length; i++){
            if(page.currentDates[i].toString().split(' ')[0] === 'Mon'){
                this.currentWeeks.push( currentWeekNumber(page.currentDates[i])+' '+ (page.currentDates[i].getMonth()+1) +' '+ page.currentDates[i].getFullYear() );
                currentControlBody.push(
                    <div className="dateWrapper" style={{ 'width' : '50px' , 'font-weight' : '600'}}>
                        <div className="selectable">{currentWeekNumber(page.currentDates[i])}</div>
                    </div>
                );
            }
            currentControlBody.push(
                <div className="dateWrapper" >
                    <div className="notSelectable" style={{ 'color' : 'black' }}>{page.currentDates[i].toString().split(' ')[2]}</div>
                </div>
            );
        }
        for (var i = 0; i < page.nextDates.length; i++){
            if(page.nextDates[i].toString().split(' ')[0] === 'Mon'){
                this.currentWeeks.push( currentWeekNumber(page.nextDates[i])+' '+ (page.nextDates[i].getMonth()+1) +' '+ page.nextDates[i].getFullYear() );
                currentControlBody.push(
                    <div className="dateWrapper" style={{ 'width' : '50px' , 'font-weight' : '600' }}>
                        <div className="selectable">{currentWeekNumber(page.nextDates[i])}</div>
                    </div>
                );
            }
            currentControlBody.push(
                <div className="dateWrapper" >
                    <div className="notSelectable" style={{ 'color' : 'black' }}>{page.nextDates[i].toString().split(' ')[2]}</div>
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
      var condition = 'Please say any week';
        if(this.props.element.hasAttribute('min')){
            condition += ' from '+this.ordinal_suffix_of(this.minWeek)+' week, '+this.minYear;
        }
        if(this.props.element.hasAttribute('max')){
            condition += ' to '+this.ordinal_suffix_of(this.maxWeek)+' week, '+this.maxYear;
        }
        if(this.props.element.hasAttribute('step')){
            condition += ' in intervals of '+this.step+' week';
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
                        week
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
            <section className={"complex-input-box-body "+ this.dateBoxStyle + ' ' + this.weekBoxStyle}>
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

export default Week;
