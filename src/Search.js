/*global chrome*/
/*Search Component*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";

class Search extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
   
  }
  
  componentDidUpdate(prevProps) {
    try{
    if (prevProps.random !== this.props.random) {     
      if(this.props.spokenText !== undefined){
        var text = this.props.spokenText.trim().toLowerCase();
        if((text.length <= 5) && text.includes('exit')){
          this.props.exit();
          this.componentWillUnmount();
          return;
        }   
        var URL = "https://www.google.com/search?q="+this.props.spokenText.trim();
        chrome.runtime.sendMessage({url: URL,module:"Search"}, function(response) {
          //nothing now
        });
        setTimeout(()=>{
          this.props.exit();
          this.componentWillUnmount();
        },500);      
      }      
    }
    }catch(e){console.log(e)}
  }

  componentWillUnmount(){

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
            Tell what you want to search in google
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

export default Search;