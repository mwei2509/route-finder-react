import React, { Component } from 'react'
import './App.css'
import Mainform from './mainform.js'
import axios from 'axios'
import Directions from './directions.js'
import Container from './container.js'

class App extends Component {
  constructor(){
    super()
    this.state={
      addresses: [],
      results: {},
      origin: '',
      destination: '',
      legs: [],
      duration: 0,
      waypoints: [],
      center: {lat: 40.702702,lng: -74.014660},
      toggleMenu: "active",
      transitmode: 'DRIVING'
    }
  }

  getRouteData(origin, destination, addresses, transitmode){
    this.setState({
      addresses: addresses
    })
    let waypoints=addresses.filter(Boolean).join("|")
    return (axios
      .get(`${process.env.REACT_APP_API_LINK}/googlemaps?origin=${origin}&destination=${destination}&waypoints=${waypoints}&mode=${transitmode.toLowerCase()}`)
    )
  }

  calcRoutes(origin, destination, addresses, transitmode){
    this.getRouteData(origin, destination, addresses, transitmode).then((data)=>{
      let legs = data.data.routes[0].legs
      let time = 0
      let waypoints=legs.map((leg, index)=>{
        time+=leg.duration.value
        return {location: leg.start_address,stopover: true}
      })
      waypoints.shift()
      let destination = legs[legs.length-1].end_address
      let origin = legs[0].start_address
      let center = legs[0].start_location
      this.setState({
        legs: data.data.routes[0].legs,
        duration: time,
        center: center,
        origin: origin,
        waypoints: waypoints,
        destination: destination,
        results: data,
        transitmode: transitmode
      })
    })
  }

  toggleMenu(event){
    event.preventDefault()
    if (this.state.togglemenu==="active"){
      this.setState({
        togglemenu: ''
      })
    }else{
      this.setState({
        togglemenu: "active"
      })
    }
  }

  displayDirections(){
    return (
        <div className="col-md-6 shadow">
          <Directions
            duration={this.state.duration}
            origin={this.state.origin}
            destination={this.state.destination}
            waypoints={this.state.waypoints}
            addresses={this.state.addresses}
            legs={this.state.legs}
            results={this.state.results}
            />
        </div>
      )
  }

  displayMap(origin){
    let classname
    if (origin){
      classname="col-md-6 no-pad"
    }else{
      classname="col-md-12 no-pad"
    }
    return (
      <div className={classname}>
        <Container
          origin={this.state.origin}
          center={this.state.center}
          destination={this.state.destination}
          waypoints={this.state.waypoints}
          transitmode={this.state.transitmode}
        />
      </div>
    )
  }
  render() {
    // <div className="header"><h2>Find the Best Route</h2></div>
    return (
      <div id="wrapper" className={this.state.togglemenu}>
        <div id="header">ROUTE FINDER</div>
        <div id="sidebar-wrapper">
          <ul id="sidebar_menu" className="sidebar-nav">
           <li className="sidebar-brand"><a id="menu-toggle" href="#" onClick={this.toggleMenu.bind(this)}>Add addresses to your route!<span id="main_icon" className="glyphicon glyphicon-align-justify"></span></a></li>
          </ul>
          <div className="sidebar-nav" id="sidebar">
            <div id="route-form">
              <Mainform
                calcRoutes={this.calcRoutes.bind(this)}
                />
            </div>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="page-content inset">
            <div className="row">
              <div className="col-md-12 no-pad">
                {this.state.origin ? this.displayDirections() : null}
                {this.displayMap(this.state.origin)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
