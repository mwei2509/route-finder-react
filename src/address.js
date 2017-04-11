import React, {Component} from 'react'

export default class Address extends Component{
  constructor(props){
    super(props)

    this.state={
      value: ''
    }
  }

  destroyAddress(index, event){
    event.preventDefault()
    this.props.removeAddress(index)
  }

  handleChange(event){
    this.setState({
      value: event.target.value
    }, ()=>{
      this.props.enterAddress(this.props.index, this.state.value)
    })
  }
  componentDidUpdate(){
  }

  render(){
    return(
      <div className="form-group row">
        <label className="col-md-12">Enter Address #{this.props.index + 1}</label>
        <div className="col-md-9"><input type="text" className="form-control" value={this.props.value} onChange={this.handleChange.bind(this)}></input></div>
        <div className="col-md-3 no-pad"><button className="btn btn-primary" onClick={this.destroyAddress.bind(this, this.props.index)}>Remove</button></div>
      </div>
    )
  }
}
