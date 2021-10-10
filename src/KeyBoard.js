/*Keyboard Component*/

import React, { Component } from 'react';

class Keyboard extends Component {
  constructor(props){
    super(props);
    this.normalKeys = { 1 : {'key': '`','id' : 10}, 
                        2 : {'key': '1','id' : 1},
                        3 : {'key': '2','id' : 2},
                        4 : {'key': '3','id' : 3},
                        5 : {'key': '4','id' : 4},
                        6 : {'key': '5','id' : 5},
                        7 : {'key': '6','id' : 6},
                        8 : {'key': '7','id' : 7},
                        9 : {'key': '8','id' : 8},
                        10 : {'key': '9','id' : 9},
                        11 : {'key': '0','id' : 0},
                        12 : {'key': '-','id' : 11},
                        13 : {'key': '=','id' : 12},
                        14 : {'key': 'backspace','id' : 13,'break' : 'yes','class':'backspace-width'},
                        15 : {'key': 'tab','id' : 14,'class':'tab-width'},
                        16 : {'key': 'q','id' : 15},
                        17 : {'key': 'w','id' : 16},
                        18 : {'key': 'e','id' : 17},
                        19 : {'key': 'r','id' : 18},
                        20 : {'key': 't','id' : 19},
                        21 : {'key': 'y','id' : 20},
                        22 : {'key': 'u','id' : 21},
                        23 : {'key': 'i','id' : 22},
                        24 : {'key': 'o','id' : 23},
                        25 : {'key': 'p','id' : 24},
                        26 : {'key': '[','id' : 25},
                        27 : {'key': ']','id' : 26},
                        28 : {'key': '\\','id' : 27,'break' : 'yes'},
                        29 : {'key': 'shift','id' : 28,'class':'shift-style'},
                        30 : {'key': 'a','id' : 29},
                        31 : {'key': 's','id' : 30},
                        32 : {'key': 'd','id' : 31},
                        33 : {'key': 'f','id' : 32},
                        34 : {'key': 'g','id' : 33},
                        35 : {'key': 'h','id' : 34},
                        36 : {'key': 'j','id' : 35},
                        37 : {'key': 'k','id' : 36},
                        38 : {'key': 'l','id' : 37},
                        39 : {'key': ';','id' : 38},
                        40 : {'key': '\'','id' : 39},
                        41 : {'key': '↲ enter','id' : 40,'break' : 'yes','class':'enter-width'},
                        42 : {'key': 'z','id' : 41},
                        43 : {'key': 'x','id' : 42},
                        44 : {'key': 'c','id' : 43},
                        45 : {'key': 'v','id' : 44},
                        46 : {'key': 'b','id' : 45},
                        47 : {'key': 'n','id' : 46},
                        48 : {'key': 'm','id' : 47},
                        49 : {'key': ',','id' : 48},
                        50 : {'key': '.','id' : 49},
                        51 : {'key': '/','id' : 50},
                        52 : {'key': 'space','id' : 51,'class':'space-width'}
                    };
    this.shiftKeys =  { 1 : {'key': '~','id' : 0}, 
                        2 : {'key': '!','id' : 1},
                        3 : {'key': '@','id' : 2},
                        4 : {'key': '#','id' : 3},
                        5 : {'key': '$','id' : 4},
                        6 : {'key': '%','id' : 5},
                        7 : {'key': '^','id' : 6},
                        8 : {'key': '&','id' : 7},
                        9 : {'key': '*','id' : 8},
                        10 : {'key': '(','id' : 9},
                        11 : {'key': ')','id' : 10},
                        12 : {'key': '_','id' : 11},
                        13 : {'key': '+','id' : 12},
                        14 : {'key': 'backspace','id' : 13,'break' : 'yes','class':'backspace-width'},
                        15 : {'key': 'tab','id' : 14,'class':'tab-width'},
                        16 : {'key': 'Q','id' : 15},
                        17 : {'key': 'W','id' : 16},
                        18 : {'key': 'E','id' : 17},
                        19 : {'key': 'R','id' : 18},
                        20 : {'key': 'T','id' : 19},
                        21 : {'key': 'Y','id' : 20},
                        22 : {'key': 'U','id' : 21},
                        23 : {'key': 'I','id' : 22},
                        24 : {'key': 'O','id' : 23},
                        25 : {'key': 'P','id' : 24},
                        26 : {'key': '{','id' : 25},
                        27 : {'key': '}','id' : 26},
                        28 : {'key': '|','id' : 27,'break' : 'yes'},
                        29 : {'key': 'shift','id' : 28,'class':'shift-style'},
                        30 : {'key': 'A','id' : 29},
                        31 : {'key': 'S','id' : 30},
                        32 : {'key': 'D','id' : 31},
                        33 : {'key': 'F','id' : 32},
                        34 : {'key': 'G','id' : 33},
                        35 : {'key': 'H','id' : 34},
                        36 : {'key': 'J','id' : 35},
                        37 : {'key': 'K','id' : 36},
                        38 : {'key': 'L','id' : 37},
                        39 : {'key': ':','id' : 38},
                        40 : {'key': '"','id' : 39},
                        41 : {'key': '↲ enter','id' : 40,'break' : 'yes','class':'enter-width'},
                        42 : {'key': 'Z','id' : 41},
                        43 : {'key': 'X','id' : 42},
                        44 : {'key': 'C','id' : 43},
                        45 : {'key': 'V','id' : 44},
                        46 : {'key': 'B','id' : 45},
                        47 : {'key': 'N','id' : 46},
                        48 : {'key': 'M','id' : 47},
                        49 : {'key': '<','id' : 48},
                        50 : {'key': '>','id' : 49},
                        51 : {'key': '?','id' : 50},
                        52 : {'key': 'space','id' : 51,'class':'space-width'}
                    };
    this.singleDigitConvert = this.singleDigitConvert.bind(this);
    this.update = this.update.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {keyType : 'normal'}
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
    if(this.state.keyType === 'normal'){
        for(var key in this.normalKeys){
          if(this.normalKeys[key].id === no){
            if(this.normalKeys[key].key === 'backspace'){
              try{
                this.props.element.value = this.props.element.value.substring(0, this.props.element.value.length -1);
              }catch(e){}
            }else if(this.normalKeys[key].key === 'tab'){
              this.props.element.value += '\t';
            }else if(this.normalKeys[key].key === 'shift'){
              this.setState({keyType:'shift'});
            }else if(this.normalKeys[key].key === '↲ enter'){
              this.props.element.value += '\n';
            }else if(this.normalKeys[key].key === 'space'){
              this.props.element.value += ' ';
            }else{
              this.props.element.value += this.normalKeys[key].key;
            }
            break;
          }
        }
    }else{
      for(var key in this.shiftKeys){
        if(this.shiftKeys[key].id === no){
          if(this.shiftKeys[key].key === 'backspace'){
            try{
              this.props.element.value = this.props.element.value.substring(0, this.props.element.value.length -1);
            }catch(e){}
          }else if(this.shiftKeys[key].key === 'tab'){
            this.props.element.value += '\t';
          }else if(this.shiftKeys[key].key === 'shift'){
            this.setState({keyType:'normal'});
          }else if(this.shiftKeys[key].key === '↲ enter'){
            this.props.element.value += '\n';
          }else if(this.shiftKeys[key].key === 'space'){
            this.props.element.value += ' ';
          }else{
            this.props.element.value += this.shiftKeys[key].key;
          }
          break;
        }
      }
    }
    }catch(e){console.log(e)}
  }

  handleKeyPress(noString){
    var noString = noString.trim();
    if(!isNaN(noString)){
      this.update(noString);
    } else if(this.singleDigitConvert(noString) !== false){
      this.update(this.singleDigitConvert(noString));
    }      
  }

  render() {
    var keys = [];
    if(this.state.keyType === 'normal'){
       for(var key in this.normalKeys){
        keys.push(  <div className={"key "+this.normalKeys[key].class}>
                        <div className="key-label">
                            {this.normalKeys[key].key}
                        </div>
                        <div className="key-id">
                            {this.normalKeys[key].id}                               
                        </div>                    
                    </div>
                );
        if(this.normalKeys[key].hasOwnProperty('break')){
            keys.push( <br/> );
        }
       }
    }else{
        for(var key in this.shiftKeys){
            keys.push(  <div className={"key "+this.shiftKeys[key].class}>
                            <div className="key-label">
                                {this.shiftKeys[key].key}
                            </div>
                            <div className="key-id">
                                {this.shiftKeys[key].id}                               
                            </div>                    
                        </div>
                    );
          if(this.shiftKeys[key].hasOwnProperty('break')){
            keys.push( <br/> );
          }
        }
    }
            
    return (
        <div className="keyboard-wrapper">
           {keys}
        </div>
    );
  }
}

export default Keyboard;

   