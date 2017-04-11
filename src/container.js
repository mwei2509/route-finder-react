import React, { Component } from 'react'
import GoogleApiComponent from './GoogleApiComponent.js'
import Map from './map.js'

class Container extends Component{

  render(){
    if(!this.props.loaded){
      return <div>Loading...</div>
    }
    return(
      <div className="mapContainer">
        <Map
          google={this.props.google}
          origin={this.props.origin}
          center={this.props.center}
          destination={this.props.destination}
          waypoints={this.props.waypoints}
          transitmode={this.props.transitmode}
         />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(Container)
