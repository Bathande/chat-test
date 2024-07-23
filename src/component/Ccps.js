import React, { Component } from 'react';
import "amazon-connect-streams";
import {ccpConfig} from "../conf/configurations"
import "./css/ccps.css"

class Ccps extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount(){
    //     const containerDiv = document.getElementById("container-ccp");
    //     window.connect.core.initCCP(containerDiv, ccpConfig);
    
          
    // }
  
    initCCP = async () => {
    let containerDiv = document.getElementById("container-ccp");
    window.connect.core.initCCP(containerDiv, ccpConfig);

      
      };

    render() {
        return (
            <div id='container-ccp' >
                <p>Custom CCP</p>
                <button onClick={this.initCCP}>click</button>
            </div>
        );
    }
}

export default Ccps;
