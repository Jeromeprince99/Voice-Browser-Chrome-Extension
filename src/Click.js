/*Click Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import $ from 'jquery';
import { debounce } from 'throttle-debounce';

class Click extends Component {
  constructor(props){
    super(props);
    this.handleExit = this.handleExit.bind(this);
    this.isInViewport = this.isInViewport.bind(this);
    this.viewport = this.viewport.bind(this);
    this.state = { clickableElFinalArrState : [] };
  }

  componentDidMount(){
    try{
    this.scrollEnded = debounce(500, false, () =>
    {
      this.clickableElFinalArr = [];
      var vp = this.viewport();
      var elements = document.getElementsByTagName('*');
      for(var i=0;i<elements.length;i++){
        if($(elements[i]).is(":visible")){
          if($(elements[i]).is("a")){
            if(elements[i].getAttribute('href')!=null){
              if(this.isInViewport(elements[i],vp)) this.clickableElFinalArr.push(elements[i]);
            }else if(elements[i].getAttribute('onclick')!=null){
              if(this.isInViewport(elements[i],vp)) this.clickableElFinalArr.push(elements[i]);
            }else if(elements[i].getAttribute('role')=='button'){
              if(this.isInViewport(elements[i],vp)) this.clickableElFinalArr.push(elements[i]);
            }
          }else if($(elements[i]).is("button")){
            if(!$(elements[i]).prop('disabled')){
              if(this.isInViewport(elements[i],vp)) this.clickableElFinalArr.push(elements[i]);
            }
          }else if($(elements[i]).is("input")){
            if($(elements[i]).prop('type')!='hidden' && !$(elements[i]).prop('disabled')){
              if(this.isInViewport(elements[i],vp)) this.clickableElFinalArr.push(elements[i]);
            }
          }else if($(elements[i]).is("select") || $(elements[i]).is("textarea") || $(elements[i]).is("video") || $(elements[i]).is("audio")){
            if(this.isInViewport(elements[i],vp)) this.clickableElFinalArr.push(elements[i]);
          }else if(elements[i].getAttribute('role') === 'button'){
            if(this.isInViewport(elements[i],vp)) this.clickableElFinalArr.push(elements[i]);
          }
        }
      } 
      this.setState({clickableElFinalArrState : this.clickableElFinalArr});
    });
    $(document).scroll(this.scrollEnded);
    this.scrollEnded();

    /* embed, iframe, object */
    /* For other clickable elements
    var ev = $._data(elements[i], 'events');
    if(ev && ev.click) console.log(elements[i]);
    */
  
    this.numberSaid = false;
    }catch(e){console.log(e)}
  }
  
  isInViewport(element,vp)
  { 
      // This checks if the element is in the viewport area, you could also
      // check the display and visibility of its style.
      var rect = element.getBoundingClientRect( ) ;
      var x = rect.left ;
      var x2 = x + element.offsetWidth ;
      var y = rect.top ;
      var y2 = y + element.offsetHeight ;
      return !( x >= vp.w || y >= vp.h || x2 < 0 || y2 < 0 ) ;
  }

  viewport()
  {   var vp = [];
      vp.x = window.pageXOffset ;
      vp.w = window.innerWidth ;
      vp.x2 = vp.x + vp.w - 1 ;
      vp.y = window.pageYOffset ;
      vp.h = window.innerHeight ;
      vp.y2 = vp.y + vp.h - 1 ;
      return vp ;
  }

  componentDidUpdate(prevProps) {
    try{
    if(prevProps.random !== this.props.random) {     
      if(this.props.spokenText !== undefined){
        if(!isNaN(this.props.spokenText)){
          const id = parseInt(this.props.spokenText);
          if(id <= this.clickableElFinalArr.length && id > 0){
            this.numberSaid = true;
            this.selectedClickableElement = this.clickableElFinalArr[id-1];
            this.clickableElFinalArr = [];
            this.setState({clickableElFinalArrState : []});
            this.scrollEnded.cancel();

            if($(this.selectedClickableElement).is("a") || $(this.selectedClickableElement).is("button")){
                this.selectedClickableElement.click();
            }else if($(this.selectedClickableElement).is("input")){
              var inputType = this.selectedClickableElement.getAttribute('type');
              if(inputType === "button" || inputType === "checkbox" ||inputType === "file" ||inputType === "radio" ||
              inputType === "reset" ||inputType === "submit" ||inputType === "image"){
                this.selectedClickableElement.click();
              }else if(inputType === "email" || inputType === "password" ||inputType === "search" ||inputType === "tel" ||
                inputType === "text" ||inputType === "number" ||inputType === "url"){
                  try{
                    this.selectedClickableElement.focus();
                    this.props.divertModule(this.selectedClickableElement, 'Dictate Text');
                    $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
                    if(inputType !== "email" && inputType !== "password" && inputType !== "number" ){
                      this.selectedClickableElement.setSelectionRange(this.selectedClickableElement.value.length,this.selectedClickableElement.value.length);
                    }return;
                  }catch(e){console.log(e)}
              }else if(inputType === "range"){
                this.props.divertModule(this.selectedClickableElement, 'Range');
                $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
                return;
              }else if(inputType === "color"){
                this.props.divertModule(this.selectedClickableElement, 'Color');
                $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
                return;
              }else if(inputType === "datetime-local" || inputType === "datetime"){
                this.props.divertModule(this.selectedClickableElement, 'DateTime-Local');
                $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
                return;
              }else if(inputType === "date"){
                this.props.divertModule(this.selectedClickableElement, 'Date');
                $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
                return;
              }else if(inputType === "month"){
                this.props.divertModule(this.selectedClickableElement, 'Month');
                $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
                return;
              }else if(inputType === "week"){
                this.props.divertModule(this.selectedClickableElement, 'Week');
                $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
                return;
              }else if(inputType === "time"){
                this.props.divertModule(this.selectedClickableElement, 'Time');
                $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
                return;
              }
            }else if($(this.selectedClickableElement).is("select")){
              this.props.divertModule(this.selectedClickableElement, 'SelectInput');
              $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
              return;
            }else if($(this.selectedClickableElement).is("textarea")){
              this.selectedClickableElement.focus();
              this.selectedClickableElement.setSelectionRange(this.selectedClickableElement.value.length,this.selectedClickableElement.value.length);
              this.props.divertModule(this.selectedClickableElement, 'Dictate Text');
              $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
              return;
            }else if($(this.selectedClickableElement).is("video") || $(this.selectedClickableElement).is("audio")){
              $(this.selectedClickableElement).addClass("shadow-for-box-voice-browser-green");
              this.props.divertModule(this.selectedClickableElement, 'Media Options');
              return;
            }else{
              this.selectedClickableElement.click();
            }
            setTimeout(()=>{this.handleExit();},700);
          }                
        }else{
          var text = this.props.spokenText.trim().toLowerCase();
          if((text.length <= 5) && text.includes('exit')){
            this.clickableElFinalArr = [];
            this.setState({clickableElFinalArrState : []});
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
    
  }

  render() {
    let clickComponent;
    var id = 0;
    this.clickableElements = null;
    this.clickableElements = this.state.clickableElFinalArrState.map((clickableEl) =>{
      var rect = clickableEl.getBoundingClientRect();
      id=id+1;
      return <div style={{ width: rect.width, height: rect.height, top: rect.top, left: rect.left }} 
              className="voice-browser-clickable-element-div">
              <span className="voice-browser-clickable-element-span">{id}</span>
              </div>
    });
    clickComponent = 
                    <div>
                      {this.clickableElements}
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
                            Tell the <b>ID</b> of the element
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
                    </div>;
    return (      
      <div > 
        {clickComponent} 
      </div>
    );
  }
}

export default Click;


