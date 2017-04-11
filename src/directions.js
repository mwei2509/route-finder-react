/* global google */
import React, { Component } from 'react'

export default class Directions extends Component{
  calculateTime(seconds){
    let hours   = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);

    let time=''
    if (hours >= 1){
      time = hours.toString() + " hours"
    }
    if (minutes >= 1){
      if(time){
        time = time + ", " + minutes.toString() + " minutes"
      }else{
        time = minutes.toString() + " minutes"
      }
    }
    return time
  }
  render(){
    return(
      <div className="directions">
      <h4>Origin: {this.props.origin}</h4>
      <h4>Destination: {this.props.destination}</h4>
      <h5>Duration: {this.calculateTime(this.props.duration)}</h5>
      <hr />
      {this.props.legs.map((legs, index)=>{
        let time=this.calculateTime(legs.duration.value)

        return (<div
          key={index}>
          <h4>Step {index+1}. {legs.start_address} to {legs.end_address} - Duration: {time}</h4>
          <ul>
          {legs.steps.map((step, index)=>{
            return (<li key={index} dangerouslySetInnerHTML={{__html: step.html_instructions}}></li>)
          })}
          </ul>
        </div>)
      })}
      </div>
    )
  }
}
