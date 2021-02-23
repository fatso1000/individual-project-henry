import React, { Component } from 'react'
import loaderImg from "../../public/Rolling-1s-200px.gif"

export class Loader extends Component {
    render() {
        return (
           <div>
               <img width="50px" src={loaderImg} alt="loading gif"/>
           </div> 
        )
    }
}
