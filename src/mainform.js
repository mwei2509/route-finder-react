import React, {Component} from 'react'
import Address from './address.js'

export default class Mainform extends Component{
  constructor(){
    super()

    this.state={
      addresses: [''],
      origin: '',
      destination: '',
      roundtrip: false,
      transitmode: 'DRIVING'
    }

    this.onChange=this.onChange.bind(this)
  }

  removeAddress(index){
    let addresses = this.state.addresses
    addresses.splice(index,1)
    this.setState({
      addresses: addresses
    })
  }

  addAddress(event){
    event.preventDefault()
    let addresses=this.state.addresses
    addresses.push('')
    this.setState({
      addresses: addresses
    })
  }

  enterAddress(index, value){
    let addresses=this.state.addresses
    addresses[index]=value
    this.setState({
      addresses: addresses
    })
  }

  submitRoutes(event){
    event.preventDefault()
    let origin = this.state.origin
    let destination = (this.state.roundtrip) ? this.state.origin : this.state.destination
    this.props.calcRoutes(origin, destination, this.state.addresses, this.state.transitmode)
  }

  onChange(field, event){
    this.setState({
      [field]: event.target.value
    })
  }

  toggleRoundtrip(){
    this.setState({
      roundtrip: !this.state.roundtrip
    })
  }

  changeTransit(event){
    this.setState({
      transitmode: event.target.value
    })
  }

  render(){
    return(
      <form onSubmit={this.submitRoutes.bind(this)}>
        <div className="form-group row">
          <div className="col-md-12">
            <label>Origin: </label>
            <input type="text" className="form-control" value={this.state.origin} onChange={this.onChange.bind(this,'origin')}></input>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-3 center">
            <label>Roundtrip?</label>
            <input type="checkbox" checked={this.state.roundtrip} onChange={this.toggleRoundtrip.bind(this)} /><br />
          </div>
        {this.state.roundtrip ? null : <div className="col-md-9"><label>Destination:</label><input type="text" className="form-control" value={this.state.destination} onChange={this.onChange.bind(this,'destination')}></input></div>}
        </div>
        <div className="form-group row">
          <label className="col-md-3">Transit Mode</label>
          <div className="col-md-9">
            <select value={this.state.transitmode} onChange={this.changeTransit.bind(this)} className="form-control">
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </select>
          </div>
        </div>
        {this.state.addresses.map((address, index)=>{
          return(
            <Address
              key={index}
              index={index}
              value={address}
              enterAddress={this.enterAddress.bind(this)}
              removeAddress={this.removeAddress.bind(this)}
              />
          )
        })}
        <div className="form-group row pad-top">
          <div className="col-md-6">
            <button className="wide-btn btn" onClick={this.addAddress.bind(this)}>(+) Add Address</button>
          </div>
          <div className="col-md-6">
            <button className="wide-btn btn" type="submit">Create my Route</button>
          </div>
        </div>
      </form>
    )
  }
}
