/*Scroll Area Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TiMediaStop } from "react-icons/ti";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineCloseCircle, AiOutlineSetting } from "react-icons/ai";
import {GoDash,GoPlus} from "react-icons/go";
import Molir from 'molir/molir';
import $ from 'jquery';

class ScrollArea extends Component {
  constructor(props){
    super(props);
    this.handleExit = this.handleExit.bind(this);
    this.state = {speed: 20,
        currentOptionsBar : 'ID'};
   }

  componentDidMount(){
    let intents = [
        {
          "intentName":"scroll.down",
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
          "intentName":"scroll.up",
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
          "intentName":"scroll.right",
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
          "intentName":"scroll.left",
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
          "intentName":"scroll.autodown",
          "utterences":[
            "Automatically scroll the element down",
            "scroll down automatically",
            "scroll down auto",
            'auto scroll down',
            "scroll auto down",
            "auto down"
          ],
          "keywords": [
            "scroll down automatically",
            "scroll down auto",
            'auto scroll down',
            "scroll auto down",
            "auto down"
          ]
        },
        {
          "intentName":"scroll.autoup",
          "utterences":[
            "Automatically scroll the element up",
            "scroll up automatically",
            "scroll up auto",
            'auto scroll up',
            "scroll auto up",
            "auto up"
          ],
          "keywords": [
            "scroll up automatically",
            "scroll up auto",
            'auto scroll up',
            "scroll auto up",
            "auto up"
          ]
        },
        {
          "intentName":"scroll.autoright",
          "utterences":[
            "Automatically scroll the element right",
            "scroll right automatically",
            "scroll right auto",
            'auto scroll right',
            "scroll auto right",
            "auto right"
          ],
          "keywords": [
            "scroll right automatically",
            "scroll right auto",
            'auto scroll right',
            "scroll auto right",
            "auto right"
          ]
        },
        {
          "intentName":"scroll.autoleft",
          "utterences":[
            "Automatically scroll the element left",
            "scroll left automatically",
            "scroll left auto",
            'auto scroll left',
            "scroll auto left",
            "auto left"
          ],
          "keywords": [
            "scroll left automatically",
            "scroll left auto",
            'auto scroll left',
            "scroll auto left",
            "auto left"
          ]
        },
        {
          "intentName":'scroll.fast',
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
          "intentName":"scroll.slow",
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
          "intentName":"scroll.exit",
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
            "intentName":"scroll.stop",
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
      //scrollintoview() and :scrollable selector filter
      (function ($) {
        var converter = {
            vertical: { x: false, y: true },
            horizontal: { x: true, y: false },
            both: { x: true, y: true },
            x: { x: true, y: false },
            y: { x: false, y: true }
        };

        var settings = {
            duration: "fast",
            direction: "both"
        };

        var rootrx = /^(?:html)$/i;

        // gets border dimensions
        var borders = function (domElement, styles) {
            styles = styles || (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(domElement, null) : domElement.currentStyle);
            var px = document.defaultView && document.defaultView.getComputedStyle ? true : false;
            var b = {
                top: (parseFloat(px ? styles.borderTopWidth : $.css(domElement, "borderTopWidth")) || 0),
                left: (parseFloat(px ? styles.borderLeftWidth : $.css(domElement, "borderLeftWidth")) || 0),
                bottom: (parseFloat(px ? styles.borderBottomWidth : $.css(domElement, "borderBottomWidth")) || 0),
                right: (parseFloat(px ? styles.borderRightWidth : $.css(domElement, "borderRightWidth")) || 0)
            };
            return {
                top: b.top,
                left: b.left,
                bottom: b.bottom,
                right: b.right,
                vertical: b.top + b.bottom,
                horizontal: b.left + b.right
            };
        };

        var dimensions = function ($element) {
            var win = $(window);
            var isRoot = rootrx.test($element[0].nodeName);
            return {
                border: isRoot ? { top: 0, left: 0, bottom: 0, right: 0} : borders($element[0]),
                scroll: {
                    top: (isRoot ? win : $element).scrollTop(),
                    left: (isRoot ? win : $element).scrollLeft()
                },
                scrollbar: {
                    right: isRoot ? 0 : $element.innerWidth() - $element[0].clientWidth,
                    bottom: isRoot ? 0 : $element.innerHeight() - $element[0].clientHeight
                },
                rect: (function () {
                    var r = $element[0].getBoundingClientRect();
                    return {
                        top: isRoot ? 0 : r.top,
                        left: isRoot ? 0 : r.left,
                        bottom: isRoot ? $element[0].clientHeight : r.bottom,
                        right: isRoot ? $element[0].clientWidth : r.right
                    };
                })()
            };
        };

        $.fn.extend({
            scrollintoview: function (options) {
                /// <summary>Scrolls the first element in the set into view by scrolling its closest scrollable parent.</summary>
                /// <param name="options" type="Object">Additional options that can configure scrolling:
                ///        duration (default: "fast") - jQuery animation speed (can be a duration string or number of milliseconds)
                ///        direction (default: "both") - select possible scrollings ("vertical" or "y", "horizontal" or "x", "both")
                ///        complete (default: none) - a function to call when scrolling completes (called in context of the DOM element being scrolled)
                /// </param>
                /// <return type="jQuery">Returns the same jQuery set that this function was run on.</return>

                options = $.extend({}, settings, options);
                options.direction = converter[typeof (options.direction) === "string" && options.direction.toLowerCase()] || converter.both;

                var dirStr = "";
                if (options.direction.x === true) dirStr = "horizontal";
                if (options.direction.y === true) dirStr = dirStr ? "both" : "vertical";

                var el = this.eq(0);
                var scroller = el.closest(":scrollable(" + dirStr + ")");

                // check if there's anything to scroll in the first place
                if (scroller.length > 0)
                {
                    scroller = scroller.eq(0);

                    var dim = {
                        e: dimensions(el),
                        s: dimensions(scroller)
                    };

                    var rel = {
                        top: dim.e.rect.top - (dim.s.rect.top + dim.s.border.top),
                        bottom: dim.s.rect.bottom - dim.s.border.bottom - dim.s.scrollbar.bottom - dim.e.rect.bottom,
                        left: dim.e.rect.left - (dim.s.rect.left + dim.s.border.left),
                        right: dim.s.rect.right - dim.s.border.right - dim.s.scrollbar.right - dim.e.rect.right
                    };

                    var animOptions = {};

                    // vertical scroll
                    if (options.direction.y === true)
                    {
                        if (rel.top < 0)
                        {
                            animOptions.scrollTop = dim.s.scroll.top + rel.top;
                        }
                        else if (rel.top > 0 && rel.bottom < 0)
                        {
                            animOptions.scrollTop = dim.s.scroll.top + Math.min(rel.top, -rel.bottom);
                        }
                    }
                    // horizontal scroll
                    if (options.direction.x === true)
                    {
                        if (rel.left < 0)
                        {
                            animOptions.scrollLeft = dim.s.scroll.left + rel.left;
                        }
                        else if (rel.left > 0 && rel.right < 0)
                        {
                            animOptions.scrollLeft = dim.s.scroll.left + Math.min(rel.left, -rel.right);
                        }
                    }
                    // scroll if needed
                    if (!$.isEmptyObject(animOptions))
                    {
                        if (rootrx.test(scroller[0].nodeName))
                        {
                            scroller = $("html,body");
                        }
                        scroller
                            .animate(animOptions, options.duration)
                            .eq(0) // we want function to be called just once (ref. "html,body")
                            .queue(function (next) {
                                $.isFunction(options.complete) && options.complete.call(scroller[0]);
                                next();
                            });
                    }
                    else
                    {
                        // when there's nothing to scroll, just call the "complete" function
                        $.isFunction(options.complete) && options.complete.call(scroller[0]);
                    }
                }
                // return set back
                return this;
            }
        });

        var scrollValue = {
            auto: true,
            scroll: true,
            visible: false,
            hidden: false
        };

        $.extend($.expr[":"], {
            scrollable: function (element, index, meta, stack) {
                var direction = converter[typeof (meta[3]) === "string" && meta[3].toLowerCase()] || converter.both;
                var styles = (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(element, null) : element.currentStyle);
                var overflow = {
                    x: scrollValue[styles.overflowX.toLowerCase()] || false,
                    y: scrollValue[styles.overflowY.toLowerCase()] || false,
                    isRoot: rootrx.test(element.nodeName)
                };

                // check if completely unscrollable (exclude HTML element because it's special)
                if (!overflow.x && !overflow.y && !overflow.isRoot)
                {
                    return false;
                }

                var size = {
                    height: {
                        scroll: element.scrollHeight,
                        client: element.clientHeight
                    },
                    width: {
                        scroll: element.scrollWidth,
                        client: element.clientWidth
                    },
                    // check overflow.x/y because iPad (and possibly other tablets) don't dislay scrollbars
                    scrollableX: function () {
                        return (overflow.x || overflow.isRoot) && this.width.scroll > this.width.client;
                    },
                    scrollableY: function () {
                        return (overflow.y || overflow.isRoot) && this.height.scroll > this.height.client;
                    }
                };
                return direction.y && size.scrollableY() || direction.x && size.scrollableX();
            }
        });
      })($);
      this.scrollableElFinalArr = [];
      var scrollableEl = $(":scrollable");
      var inc = 1;
      if(scrollableEl.length > 1){
        if($(scrollableEl[1]).is("body")){inc = 2;}     
      }                          
      var id = 0;
      for(inc;inc<scrollableEl.length;inc++){              
        this.scrollableElFinalArr.push(scrollableEl[inc]);
        
        $(scrollableEl[inc]).addClass("shadow-for-box-voice-browser-blue");                     
        var stylesForDiv = "position:relative;margin: 0px;padding: 0px; text-align: left; align-items: start; align-content: start; z-index: 1000000000000000000;";
        var stylesForSpan = "position: absolute;width: fit-content; height: fit-content; background-color: rgba(255,255,100,0.5); color: black; font-size: 15px; border: 1px solid rgba(0,0,0,0.8); z-index: 1000000000000000000; margin: 0px;  padding: 1px 2px; text-align: left; align-items: start; align-content: start; font-weight: bold;";
        id+=1;
        $(scrollableEl[inc]).prepend('<div id="voice-browser-extension-scroll-area-selection-identifier-'+id+'" style="top:-'+
                $(scrollableEl[inc]).css("padding-top")+';left:-'+$(scrollableEl[inc]).css("padding-left")+
                ';'+stylesForDiv+'"><span style="'+stylesForSpan+'">'+id+'</span></div>');            
      }   
      this.numberSaid = false;
      this.scrollerIntervalInstance = setInterval(fn=>{},200);
      this.currentAutoScrollOption = '';
  }
  
  componentDidUpdate(prevProps) {
    try{
    if (prevProps.random !== this.props.random) {
        if(this.props.spokenText !== undefined){
            if(this.numberSaid == false){
                if(!isNaN(this.props.spokenText)){
                    const id = parseInt(this.props.spokenText);
                    if(id <= this.scrollableElFinalArr.length){
                        this.numberSaid = true;
                        this.currentScrollElement = this.scrollableElFinalArr[id-1];
                        for(var i=0;i<this.scrollableElFinalArr.length;i++){                       
                            $(this.scrollableElFinalArr[i]).removeClass("shadow-for-box-voice-browser-blue");
                            var deleteID = '#voice-browser-extension-scroll-area-selection-identifier-'+(i+1);
                            $(deleteID).remove();
                        }
                        $(this.currentScrollElement).addClass("shadow-for-box-voice-browser-green");
                        this.setState({currentOptionsBar:'Scroll Area Options'});
                    }                
                }else{
                    var text = this.props.spokenText.trim().toLowerCase();
                    if((text.length <= 5) && text.includes('exit')){
                        for(var i=0;i<this.scrollableElFinalArr.length;i++){                       
                            $(this.scrollableElFinalArr[i]).removeClass("shadow-for-box-voice-browser-blue");
                            var deleteID = '#voice-browser-extension-scroll-area-selection-identifier-'+(i+1);
                            $(deleteID).remove();
                        }
                        this.componentWillUnmount();
                        this.props.exit();
                        return;
                    }   
                }               
            }
            else{
                this.classifier.classify(this.props.spokenText)
                .then((result)=>{
                    this.response = result.intentName
                })
                .then(() => {            
                    if(this.response === "scroll.down"){          
                        $(this.currentScrollElement).scrollTop($(this.currentScrollElement).scrollTop()+$(this.currentScrollElement)[0].clientHeight);
                    }else if(this.response === "scroll.up"){
                        $(this.currentScrollElement).scrollTop($(this.currentScrollElement).scrollTop()-$(this.currentScrollElement)[0].clientHeight);
                    }else if(this.response === "scroll.right"){
                        $(this.currentScrollElement).scrollLeft($(this.currentScrollElement).scrollLeft()+$(this.currentScrollElement)[0].clientWidth);
                    }else if(this.response === "scroll.left"){
                        $(this.currentScrollElement).scrollLeft($(this.currentScrollElement).scrollLeft()-$(this.currentScrollElement)[0].clientWidth);
                    }else if(this.response === "scroll.autodown"){
                        this.currentAutoScrollOption = 'autodown';
                        clearInterval(this.scrollerIntervalInstance);
                        this.scrollerIntervalInstance = setInterval(fn=>{
                            $(this.currentScrollElement).scrollTop($(this.currentScrollElement).scrollTop() + this.state.speed );},100);
                    }else if(this.response === "scroll.autoup"){
                        this.currentAutoScrollOption = 'autoup';
                        clearInterval(this.scrollerIntervalInstance);
                        this.scrollerIntervalInstance = setInterval(fn=>{
                            $(this.currentScrollElement).scrollTop($(this.currentScrollElement).scrollTop() - this.state.speed );},100);
                    
                    }else if(this.response === "scroll.autoright"){
                        this.currentAutoScrollOption = 'autoright';
                        clearInterval(this.scrollerIntervalInstance);
                        this.scrollerIntervalInstance = setInterval(fn=>{
                            $(this.currentScrollElement).scrollLeft($(this.currentScrollElement).scrollLeft() + this.state.speed );},100);
                    
                    }else if(this.response === "scroll.autoleft"){
                        this.currentAutoScrollOption = 'autoleft';
                        clearInterval(this.scrollerIntervalInstance);
                        this.scrollerIntervalInstance = setInterval(fn=>{
                            $(this.currentScrollElement).scrollLeft($(this.currentScrollElement).scrollLeft() - this.state.speed );},100);
                    
                    }else if(this.response === "scroll.fast"){
                        if(this.currentAutoScrollOption == 'autodown'){
                            clearInterval(this.scrollerIntervalInstance);                        
                            this.setState({speed:this.state.speed+4});
                            this.scrollerIntervalInstance = setInterval(fn=>{
                                $(this.currentScrollElement).scrollTop($(this.currentScrollElement).scrollTop() + this.state.speed );},100);                            
                        }else if(this.currentAutoScrollOption == 'autoup'){                           
                            clearInterval(this.scrollerIntervalInstance);                        
                            this.setState({speed:this.state.speed+4});
                            this.scrollerIntervalInstance = setInterval(fn=>{
                                $(this.currentScrollElement).scrollTop($(this.currentScrollElement).scrollTop() - this.state.speed );},100);                            
                        }else if(this.currentAutoScrollOption == 'autoright'){
                            clearInterval(this.scrollerIntervalInstance);                        
                            this.setState({speed:this.state.speed+4});
                            this.scrollerIntervalInstance = setInterval(fn=>{
                                $(this.currentScrollElement).scrollLeft($(this.currentScrollElement).scrollLeft() + this.state.speed );},100);
                        }else if(this.currentAutoScrollOption == 'autoleft'){
                            clearInterval(this.scrollerIntervalInstance);                        
                            this.setState({speed:this.state.speed+4});
                            this.scrollerIntervalInstance = setInterval(fn=>{
                                $(this.currentScrollElement).scrollLeft($(this.currentScrollElement).scrollLeft() - this.state.speed );},100);
                        }
                    }else if(this.response === "scroll.slow"){
                        if(this.currentAutoScrollOption == 'autodown'){
                            if(this.state.speed-4>0){
                                clearInterval(this.scrollerIntervalInstance);
                                this.setState({speed:this.state.speed - 4 });
                                this.scrollerIntervalInstance = setInterval(fn=>{
                                    $(this.currentScrollElement).scrollTop($(this.currentScrollElement).scrollTop() + this.state.speed );},100);
                            }
                        }else if(this.currentAutoScrollOption == 'autoup'){
                            if(this.state.speed-4>0){
                                clearInterval(this.scrollerIntervalInstance);
                                this.setState({speed:this.state.speed - 4 });
                                this.scrollerIntervalInstance = setInterval(fn=>{
                                    $(this.currentScrollElement).scrollTop($(this.currentScrollElement).scrollTop() - this.state.speed );},100);
                            }
                        }else if(this.currentAutoScrollOption == 'autoright'){
                            if(this.state.speed-4>0){
                                clearInterval(this.scrollerIntervalInstance);
                                this.setState({speed:this.state.speed - 4 });
                                this.scrollerIntervalInstance = setInterval(fn=>{
                                    $(this.currentScrollElement).scrollLeft($(this.currentScrollElement).scrollLeft() + this.state.speed );},100);
                            }
                        }else if(this.currentAutoScrollOption == 'autoleft'){
                            if(this.state.speed-4>0){
                                clearInterval(this.scrollerIntervalInstance);
                                this.setState({speed:this.state.speed - 4 });
                                this.scrollerIntervalInstance = setInterval(fn=>{
                                    $(this.currentScrollElement).scrollLeft($(this.currentScrollElement).scrollLeft() - this.state.speed );},100);
                            }
                        }                       
                    }else if(this.response === "scroll.stop"){
                        clearInterval(this.scrollerIntervalInstance);
                    }else if(this.response === "scroll.exit"){                       
                        this.componentWillUnmount();
                        this.props.exit();
                        return;
                    }
                })     
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
    $(this.currentScrollElement).removeClass("shadow-for-box-voice-browser-green");
    this.scrollableElFinalArr = []; 
    this.numberSaid = false;
    clearInterval(this.scrollerIntervalInstance);
    this.currentAutoScrollOption = '';
    this.currentScrollElement = null;    
  }

  render() {
    const optionsBar = this.state.currentOptionsBar;
    let optionsBarElements;
    if (optionsBar === 'Scroll Area Options') {
    optionsBarElements = <div className="voice-browser-options-bar">      
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
                                        <IconContext.Provider value={{  className:  "option-icon-size"  }}>
                                            <div>
                                            <AiOutlineSetting />
                                            </div>
                                        </IconContext.Provider>    
                                    </div>
                                    <div className="option-content">
                                        Auto + (down/up/right/left)
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
    } else if(optionsBar === 'ID') {
      optionsBarElements = <div className="voice-browser-options-bar">      
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
                        </div>;
    }
    return (      
      <div > 
        {optionsBarElements} 
      </div>
    );
  }
}

export default ScrollArea;
