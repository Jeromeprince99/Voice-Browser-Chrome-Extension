/*global chrome*/
/*Root Component*/

import React, { Component } from 'react';
import './App.css';
import Molir from 'molir/molir';
import MediaOptions from './MediaOptions';
import OpenURL from './OpenURL';
import Search from './Search';
import Click from './Click';
import ScrollArea from './ScrollArea';
import AutoScroll from './AutoScroll';
import $ from 'jquery';
import DictateText from './dictateText';
import Range from './RangeInput';
import Color from './ColorInput';
import Month from './MonthInput';
import Time from './TimeInput';
import DateInput from './DateInput';
import Week from './WeekInput';
import DateTimeLocal from './DateTimeLocalInput';
import SelectInput from './SelectInput';

class App extends Component {
  constructor(props){
    super(props);
    this.handleExit = this.handleExit.bind(this);
    this.navigation_goforward = this.navigation_goforward.bind(this);
    this.navigation_goback = this.navigation_goback.bind(this);
    this.navigation_reload = this.navigation_reload.bind(this);
    this.tabs_goToPrevious = this.tabs_goToPrevious.bind(this);
    this.tabs_goToNext = this.tabs_goToNext.bind(this);
    this.tabs_createNew = this.tabs_createNew.bind(this);
    this.tabs_closeCurrent = this.tabs_closeCurrent.bind(this);
    this.divertModuleClick = this.divertModuleClick.bind(this);
    this.handleExecution = this.handleExecution.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.volumeLevel = this.volumeLevel.bind(this);
    this.state = {currentModuleLevel: 'Root',
                  spokenText : '',
                  soundLevel : 0}
  }

  componentDidMount(){
    let intents = [
      {
        "intentName":"scrolldown",
        "utterences":[
          "scroll down",
          "I want to scroll the webpage down",
          "only scroll down",
          "one screen scroll down",
          "scroll down one screen"
        ],
        "keywords": [
          "scroll down",
          "down scroll",
          "one screen scroll down",
          "scroll down one screen",
          "down"
        ]
      },
      {
        "intentName":"scrollup",
        "utterences":[
          "scroll up",
          "I want to scroll the webpage up",
          "only scroll up",
          "one screen scroll up",
          "scroll up one screen"
        ],
        "keywords": [
          "scroll up",
          "up scroll",
          "one screen scroll up",
          "scroll up one screen",
          "up"
        ]
      },
      {
        "intentName":"scrollright",
        "utterences":[
          "scroll right",
          "I want to scroll the webpage right",
          "only scroll right",
          "one screen scroll right",
          "scroll right one screen"
        ],
        "keywords": [
          "scroll right",
          "right scroll",
          "one screen scroll right",
          "scroll right one screen",
          "right"
        ]
      },
      {
        "intentName":"scrollleft",
        "utterences":[
          "scroll left",
          "I want to scroll the webpage left",
          "only scroll left",
          "one screen scroll left",
          "scroll left one screen"
        ],
        "keywords": [
          "scroll left",
          "left scroll",
          "one screen scroll left",
          "scroll left one screen",
          "left"
        ]
      },
      {
        "intentName":"module.autoscroll",
        "utterences":[
          "auto scroll",
          "scroll automatically",
          "scroll down automatically",
          "scroll up automatically",
          "scroll down fastly",
          "scroll down slowly",
          "scroll up fastly",
          "scroll up slowly",
          "auto scroll slowly",
          "auto scroll fastly"
        ],
        "keywords": [
          "auto scroll",
          "fastly",
          "slowly",
          "scroll fastly",
          "scroll auto",
          "scroll slowly",
          "auto"
        ]
      },
      {
        "intentName":"module.scrollarea",
        "utterences":[
          "scroll area",
          "scroll area select",
          "select scroll area",
          "scroll area selection",
          "I want to select the scroll area",
          "show scroll areas",
          "Display scroll area",
          "Can you show me the scroll areas",
          "How to select scroll area",
          "I need to scroll that area",
          "I want to scroll particular element",
          "I want to scroll this element",
          "How do I scroll this area",
          "How can I scroll an area element"
        ],
        "keywords": [
          "scroll area",
          "scroll area select",
          "select scroll area",
          "scroll area selection",         
          "show scroll areas",
          "Display scroll area",
          "area",
          "area scroll"
        ]
      },
      {
        "intentName":"zoom.in",
        "utterences":[
          "zoom in",
          "increase zoom level",
          "in",
          "in zoom",
          "make zoom high",
          "make zoom in"
        ],
        "keywords": [
          "zoom in",
          "increase zoom level",
          "in",
          "in zoom",
          "make zoom high",
          "make zoom in"
        ]
      },
      {
        "intentName":"zoom.out",
        "utterences":[
          "zoom out",
          "decrease zoom level",
          "out",
          "out zoom",
          "make zoom low",
          "make zoom out"
        ],
        "keywords": [
          "zoom out",
          "decrease zoom level",
          "out",
          "out zoom",
          "make zoom low",
          "make zoom out"
        ]
      },
      {
        "intentName":"top",
        "utterences":[
          "go to top of the page",
          "top",
          "move to top page",
          "go to top"
        ],
        "keywords": [
          "go to top of the page",
          "top",
          "move to top page",
          "go to top"
        ]
      },
      {
        "intentName":"bottom",
        "utterences":[
          "go to bottom of the page",
          "bottom",
          "move to bottom page",
          "go to bottom"
        ],
        "keywords": [
          "go to bottom of the page",
          "bottom",
          "move to bottom page",
          "go to bottom"
        ]
      },
      {
        "intentName":"module.mediaoptions",
        "utterences":[
          "select video",
          "select media",
          "select audio",
          "video",
          "audio",
          "media",
          "media control",
          "media control options",
          "media options"
        ],
        "keywords": [
          "select video",
          "select media",
          "select audio",
          "video",
          "audio",
          "media",
          "media control",
          "media control options",
          "media options"
        ]
      },
      {
        "intentName":"navigation.goforward",
        "utterences":[
          "Go forward",
          "move forward",
          "I want to move forward",
          "can you go forward",
          "how to go forward"
        ],
        "keywords": [
          "Go forward",
          "move forward",
          "forward"
        ]
      },
      {
        "intentName":"navigation.goback",
        "utterences":[
          "Go back",
          "move back",
          "I want to move back",
          "can you go back",
          "how to go back"
        ],
        "keywords": [
          "Go back",
          "move back",
          "back",
          "backward"
        ]
      },
      {
        "intentName":"navigation.reload",
        "utterences":[
          "Reload the website",
          "reload the webpage",
          "I want to reload the webpage",
          "can you reload the webpage",
          "how to reload the webpage",
          "Again load the webpage",
          "reload current page",
          "reload current tab",
          "reload website",
          "reload webpage",
          "reload page",
          "reload content",
          "refresh",
          "refresh page"
        ],
        "keywords": [
          "Reload the website",
          "reload the webpage",
          "reload",
          "refresh",
          "reload webpage",
          "reload website",
          "reload current tab",
          "reload page",
          "reload content"
        ]
      },
      {
        "intentName":"tabs.goToPrevious",
        "utterences":[
          "tab previous",
          "previous",
          "Go to previous tab",
          "previous tab",
          "move to previous tab",
          "I want to go to previous tab",
          "I want to move to previous tab",
          "can you go to previous tab",
          "how to go to previous tab"
        ],
        "keywords": [
          "move to previous tab",
          "previous tab",
          "tab previous",
          "previous",
          "go to previous tab"
        ]
      },
      {
        "intentName":"tabs.goToNext",
        "utterences":[
          "tab next",
          "next",
          "Go to next tab",
          "next tab",
          "move to next tab",
          "I want to go to next tab",
          "I want to move to next tab",
          "can you go to next tab",
          "how to go to next tab"
        ],
        "keywords": [
          "move to next tab",
          "next tab",
          "tab next",
          "next",
          "go to next tab"
        ]
      },
      {
        "intentName":"tabs.createNew",
        "utterences":[
          "tab create",
          "create",
          "new",
          "Create new tab",
          "new tab",
          "make a new tab",
          "I want to create a new tab",
          "can you create a new tab",
          "how to create a new tab"
        ],
        "keywords": [
          "tab create",
          "create",
          "new",
          "Create new tab",
          "new tab",
          "make a new tab"
        ]
      },
      {
        "intentName":"tabs.closeCurrent",
        "utterences":[
          "tab close",
          "close",
          "close current tab",
          "close this tab",
          "close tab",
          "close active tab",
          "I want to close tab",
          "can you close tab",
          "how to close tab"
        ],
        "keywords": [
          "tab close",
          "close",
          "close current tab",
          "close this tab",
          "close tab",
          "close active tab"
        ]
      },
      {
        "intentName":"module.openURL",
        "utterences":[
          "open website",
          "open URL",
          "open webpage",
          "I want to open website",
          "can you open website",
          "how to open website",
          "open this url in new tab",
          "open this website in new tab"
        ],
        "keywords": [
          "open website",
          "open URL",
          "open webpage",
          "open"
        ]
      },
      {
        "intentName":"module.search",
        "utterences":[
          "Search Query",
          "Search Sentence",
          "Search term",
          "Search word",
          "Search text",
          "I want to search something",
          "can you search",
          "how to do google search",
          "search this",
          "search this query",
          "how do I search in google",
          "I want to get search results for this text"
        ],
        "keywords": [
          "Search",
          "Search Query",
          "Search Sentence",
          "Search term",
          "Search word",
          "Search text",
          "search results"
        ]
      },
      {
        "intentName":"module.click",
        "utterences":[
          "Click",
          "Click link",
          "Click button",
          "Press",
          "Press button",
          "click website URL",
          "click href",
          "I want to click",
          "can you click",
          "how to click",
          "click this",
          "how do I click"
        ],
        "keywords": [
          "Click",
          "Click link",
          "Click button",
          "Press",
          "Press button",
          "click website URL",
          "click href"
        ]
      },
      {
        "intentName":"exit",
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
      }
    ];
    this.classifier = new Molir(intents, 0.5);
  }

  handleExit(){
    this.setState({currentModuleLevel: 'Root'});
  }

  navigation_goforward(){
    chrome.runtime.sendMessage({module:"navigation.goforward"}, function(response) { });
  }

  navigation_goback(){
    chrome.runtime.sendMessage({module:"navigation.goback"}, function(response) { });
  }

  navigation_reload(){
    chrome.runtime.sendMessage({module:"navigation.reload"}, function(response) { });    
  }

  tabs_goToPrevious(){
    chrome.runtime.sendMessage({module:"tabs.goToPrevious"}, function(response) { });    
  }

  tabs_goToNext(){
    chrome.runtime.sendMessage({module:"tabs.goToNext"}, function(response) { });    
  }

  tabs_createNew(){
    chrome.runtime.sendMessage({module:"tabs.createNew"}, function(response) { });    
  }

  tabs_closeCurrent(){
    chrome.runtime.sendMessage({module:"tabs.closeCurrent"}, function(response) { });    
  }

  divertModuleClick(elementTransfer, module){
    this.elementTransfer = elementTransfer;
    this.setState({currentModuleLevel: module});
  }

  handleExecution(finalText, randomString){
    try{
    this.random = randomString;
    this.setState({spokenText : finalText});
    this.classifier.classify(finalText)
    .then((result)=>{
        this.response = result.intentName
    })
    .then(() => {
      if(this.state.currentModuleLevel === "Root"){
        if(this.response === "scrolldown"){
          var scrollTopPosition = $(window).scrollTop();
          $(window).scrollTop($(window).scrollTop() + $(window).innerHeight()-100);
          if(scrollTopPosition === $(window).scrollTop()){
            document.body.scrollTo(document.body.scrollLeft, document.body.scrollTop + $(window).innerHeight()-100);
          }
        }else if(this.response === "scrollup"){
          var scrollTopPosition = $(window).scrollTop();
          $(window).scrollTop($(window).scrollTop() - $(window).innerHeight()-100);
          if(scrollTopPosition === $(window).scrollTop()){
            document.body.scrollTo(document.body.scrollLeft, document.body.scrollTop - $(window).innerHeight()-100);
          }
        }else if(this.response === "scrollright"){
          var scrollLeftPosition = $(window).scrollLeft();
          $(window).scrollLeft($(window).scrollLeft() + $(window).innerWidth()-100);
          if(scrollLeftPosition === $(window).scrollLeft()){
            document.body.scrollTo(document.body.scrollLeft + $(window).innerWidth()-100 , document.body.scrollTop);
          }
        }else if(this.response === "scrollleft"){
          var scrollLeftPosition = $(window).scrollLeft();
          $(window).scrollLeft($(window).scrollLeft() - $(window).innerWidth()-100);
          if(scrollLeftPosition === $(window).scrollLeft()){
            document.body.scrollTo(document.body.scrollLeft - $(window).innerWidth()-100 , document.body.scrollTop);
          }
        }else if(this.response === "zoom.in"){
          chrome.runtime.sendMessage({module:"zoom.in"}, function(response) { });    
        }else if(this.response === "zoom.out"){
          chrome.runtime.sendMessage({module:"zoom.out"}, function(response) { });    
        }else if(this.response === "top"){
          var scrollTopPosition = $(window).scrollTop();
          window.scrollTo(0,0);
          if(scrollTopPosition === $(window).scrollTop()){
            document.body.scrollTo(0,0);
          }
        }else if(this.response === "bottom"){
          var scrollTopPosition = $(window).scrollTop();
          window.scrollTo(0,document.body.scrollHeight);
          if(scrollTopPosition === $(window).scrollTop()){
            document.body.scrollTo(0,document.body.scrollHeight);
          }
        }else if(this.response === "navigation.goforward"){
          this.navigation_goforward();
        }else if(this.response === "navigation.goback"){
          this.navigation_goback();
        }else if(this.response === "navigation.reload"){
          this.navigation_reload();
        }else if(this.response === "tabs.goToPrevious"){
          this.tabs_goToPrevious();
        }else if(this.response === "tabs.goToNext"){
          this.tabs_goToNext();
        }else if(this.response === "tabs.createNew"){
          this.tabs_createNew();
        }else if(this.response === "tabs.closeCurrent"){
          this.tabs_closeCurrent();
        }else if(this.response === "module.openURL"){
          this.setState({currentModuleLevel: 'Open URL'});
        }else if(this.response === "module.search"){
          this.setState({currentModuleLevel: 'Search'});
        }else if(this.response === "module.autoscroll"){
          this.setState({currentModuleLevel: 'Auto Scroll'});
        }else if(this.response === "module.scrollarea"){
          this.setState({currentModuleLevel: 'Scroll Area'});
        }else if(this.response === "module.mediaoptions"){
          this.setState({currentModuleLevel: 'Media Options'});
        }else if(this.response === "module.click"){
          this.setState({currentModuleLevel: 'Click'});
        }else if(this.response === "exit"){
          this.setState({currentModuleLevel: 'Root'});
        }
      }
    }) 
   }catch(e){console.log(e)}
  }

  handleTextUpdate(interimText){
    this.setState({spokenText : interimText});
  }

  volumeLevel(level){
    this.setState({volumeLevel : level});
  }
  
  render() {
    const moduleAssigner = this.state.currentModuleLevel;
    let moduleComponent;
    if (moduleAssigner === 'Auto Scroll') {
      moduleComponent = <AutoScroll exit={this.handleExit} spokenText={this.state.spokenText} random={this.random} />;
    } else if (moduleAssigner === 'Scroll Area') {
      moduleComponent = <ScrollArea exit={this.handleExit} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Media Options') {
      moduleComponent = <MediaOptions exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Search') {
      moduleComponent = <Search exit={this.handleExit} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Open URL') {
      moduleComponent = <OpenURL exit={this.handleExit} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Click') {
      moduleComponent = <Click exit={this.handleExit} divertModule={this.divertModuleClick} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Dictate Text') {
      moduleComponent = <DictateText exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Range') {
      moduleComponent = <Range exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random}/>;
    } else if(moduleAssigner === 'Color') {
      moduleComponent = <Color exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Month') {
      moduleComponent = <Month exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Time') {
      moduleComponent = <Time exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Date') {
      moduleComponent = <DateInput exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Week') {
      moduleComponent = <Week exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'DateTime-Local') {
      moduleComponent = <DateTimeLocal exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'SelectInput') {
      moduleComponent = <SelectInput exit={this.handleExit} element={this.elementTransfer} spokenText={this.state.spokenText} random={this.random} />;
    } else if(moduleAssigner === 'Root') { 
      moduleComponent = null;
    }
    return (      
      <div > 
        {moduleComponent} 
        <div className="voice-browser-statusbar">       
          <div className="text-status">
            <div className="child-component-status">
              {this.state.currentModuleLevel}
            </div>
            <div className="text-input">
              {this.state.spokenText}
            </div>
          </div>
          <div className="microphone-status">
            <svg className="microphone-style" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <linearGradient  id="half"  x1="0.5" y1="1" x2="0.5" y2="0">
                   <stop offset="0%" stop-color="dodgerblue" />
                   <stop offset={this.state.volumeLevel+'%'} stop-color="dodgerblue" />
                   <stop offset={this.state.volumeLevel+'%'} stop-color="rgb(204, 204, 204)" />
                   <stop offset="100%" stop-color="rgb(204, 204, 204)" />
                 </linearGradient>            
               </defs>
               <g fill="url(#half)">
                <path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z">
                </path>
               </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
