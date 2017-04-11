import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// import GoogleApiComponent from './container'


export default class Map extends Component{
  constructor(props){
    super(props)
    this.state={
      zoom: 13
    }
  }
  componentDidMount(){
    this.loadMap()
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (this.props.origin){
      this.loadMap()
      this.loadDirections()
    }
  }

  loadMap(){
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign({}, {
        center: this.props.center,
        zoom: this.state.zoom
      })
      this.map = new maps.Map(node, mapConfig);
      // this.map.data.loadGeoJson(
      //   'https://storage.googleapis.com/mapsdevsite/json/google.json');
    }

  }

  loadDirections(){
    const {google} = this.props;
    let directionsDisplay = new google.maps.DirectionsRenderer
    let directionsService = new google.maps.DirectionsService
    directionsDisplay.setMap(this.map);
    let request={
      origin: this.props.origin,
      destination: this.props.destination,
      waypoints: this.props.waypoints,
      optimizeWaypoints: true,
      travelMode: this.props.transitmode
    }

    directionsService.route(request, function(result, status){
      if(status=='OK'){
        directionsDisplay.setDirections(result)
      }
    })
  }

  render(){
    const style={
      width: '100%',
      height: '100%'
    }
    return(
      <div ref='map' style={style}>
      </div>
    )
  }
}
