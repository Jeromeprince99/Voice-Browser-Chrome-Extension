/*Dictate Text Component*/
/*global chrome*/

import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { RiEraserLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPaste } from "react-icons/fa";
import { MdKeyboard, MdKeyboardHide } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import $ from 'jquery';
import Keyboard from './KeyBoard';

class DictateText extends Component {
  constructor(props){
    super(props);
    this.keyboard = null;
    this.toggleKeyboard =  <div className="option-item-wrapper">
                              <div className="option-icon">
                                  <IconContext.Provider value={{  className: "option-icon-size" }}>
                                      <div>
                                      <MdKeyboard /> 
                                      </div>
                                  </IconContext.Provider>    
                              </div>
                              <div className="option-content">
                                  Keyboard
                              </div>
                          </div>;
    this.state = {keyboard : 'closed'};
  }

  componentDidUpdate(prevProps) {
    try{
    if (prevProps.random !== this.props.random && this.props.spokenText != undefined) {
      var text = this.props.spokenText.trim().toLowerCase();
      if(text === "remove word"){
        try{
          var val = this.props.element.value;
          this.props.element.value = val.substring(0,val.lastIndexOf(" "));
        }
        catch(e){console.log(e);}
      }else if(text === "remove line"){
        var lines = this.props.element.value.split('\n');
        if(lines.length > 0){
          lines.splice(lines.length-1,lines.length);
          this.props.element.value = lines.join('\n');  
        }
      }else if(text === "cleanup" || text === "clean up"){
        this.props.element.value = '';
      }else if(text === "paste"){
        chrome.runtime.sendMessage({context:"clipboardAccess", readOrWrite:"read"},
          (response) => { 
            this.props.element.value += ' '+response.pasteData;
          });
      }else if(text === "submit"){
        if( this.props.element.form !== null) this.props.element.form.submit();
      }else if(text === "keyboard"){
        this.keyboard = <Keyboard ref={(cd) => this.child = cd} element={this.props.element} spokenText={this.props.spokenText} />;
        this.toggleKeyboard =  <div className="option-item-wrapper">
                                  <div className="option-icon">
                                      <IconContext.Provider value={{  className: "option-icon-size" }}>
                                          <div>
                                          <MdKeyboardHide /> 
                                          </div>
                                      </IconContext.Provider>    
                                  </div>
                                  <div className="option-content">
                                      Close Keyboard
                                  </div>
                              </div>;
        this.setState({keyboard : 'opened'});
      }else if(text === "close keyboard"){
        this.keyboard = null;
        this.toggleKeyboard =  <div className="option-item-wrapper">
                                  <div className="option-icon">
                                      <IconContext.Provider value={{  className: "option-icon-size" }}>
                                          <div>
                                          <MdKeyboard /> 
                                          </div>
                                      </IconContext.Provider>    
                                  </div>
                                  <div className="option-content">
                                      Keyboard
                                  </div>
                              </div>;
        this.setState({keyboard : 'closed'});
      }else if(text === "exit"){
        this.props.exit();
        this.componentWillUnmount();
        return;
      }else{
        if(this.state.keyboard === 'opened'){
          if(isNaN(this.props.spokenText)){
            this.props.element.value += ' '+this.props.spokenText;
          }else{
            if(parseInt(this.props.spokenText) > 52){ 
              this.props.element.value += ' '+this.props.spokenText;
            }else{
              this.child.handleKeyPress(this.props.spokenText);
            }
          }
        }else{
          this.props.element.value += ' '+this.props.spokenText;
        }
      } 
    }
    }catch(e){console.log(e)}
  }
  
  componentWillUnmount(){
    $(this.props.element).removeClass("shadow-for-box-voice-browser-green");
  }

  render() {
    return (
      <div>
        {this.keyboard}
        <div className="voice-browser-options-bar" style={{ 'padding' : '4px' }}>
          <div className="options-container" style={{ 'max-width' : '800px' }} >
              {this.toggleKeyboard}
              <div className="option-item-wrapper">
                  <div className="option-icon">
                      <IconContext.Provider value={{  className: "option-icon-size" }}>
                          <div>
                          <RiEraserLine /> 
                          </div>
                      </IconContext.Provider>    
                  </div>
                  <div className="option-content">
                      Remove Word
                  </div>
              </div>
              <div className="option-item-wrapper">
                  <div className="option-icon">
                      <IconContext.Provider value={{  className:  "option-icon-size"  }}>
                          <div>
                          <RiEraserLine />
                          </div>
                      </IconContext.Provider>    
                  </div>
                  <div className="option-content">
                      Remove Line
                  </div>
              </div>
              <div className="option-item-wrapper">
                  <div className="option-icon">
                      <IconContext.Provider value={{  className: "option-icon-size" }}>
                          <div>
                          <RiEraserLine /> 
                          </div>
                      </IconContext.Provider>    
                  </div>
                  <div className="option-content">
                      Clean Up
                  </div>
              </div>
              <div className="option-item-wrapper">
                  <div className="option-icon">
                      <IconContext.Provider value={{  className: "option-icon-size" }}>
                          <div>
                          <FaPaste />
                          </div>
                      </IconContext.Provider>    
                  </div>
                  <div className="option-content">
                      Paste
                  </div>
              </div>
              <div className="option-item-wrapper">
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
      </div>
    );
  }
}

export default DictateText;