import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import definition from 'utils/definition'

import chan from "utils/chan"

function mapStateToProps(state) {
  return {

  };
}


class ChooseItems extends React.Component {

	static propTypes = {
	    alreadyItems: PropTypes.array,
	    setPayload: PropTypes.func
	};

	static defaultProps = {
	   	alreadyItems: []
	}

	constructor(){

		super()

		this.state = {
			choiceItems: [],
			currentItems: []
		}

	}

	componentWillMount(){
		let { choiceRequest: { action, payload } } = this.props
		this.setState({
			currentItems: this.props.alreadyItems
		})
		chan.req(action, payload).then(items=>{
			this.setState({choiceItems:items.filter(i=> !this.props.alreadyItems.find(item=>i.id==item.id))})
		})
	}

	componentDidUpdate(v,s){
		console.log(v)
		console.log(s)
	}

	select(index, e){
		e.preventDefault()
		let currentItemsLast =  this.state.currentItems.slice()
		let choiceItems = this.state.choiceItems.slice()
		let current = choiceItems.splice(index,1)
		let currentItems = [ ...this.state.currentItems, ...current]
		this.setState({
			choiceItems,
			currentItems
		})
		this.props.setFunc(currentItems)

	}

	removeSelect(index, e){
		e.preventDefault()
		let currentItems =  this.state.currentItems.slice()
		let choiceItems = this.state.choiceItems.slice()
		let current = currentItems.splice(index,1)
		this.setState({
			choiceItems: [ ...this.state.choiceItems, ...current],
			currentItems,
		})
		this.props.setFunc(currentItems)
	}

	render(){

		let current = this.state.currentItems
			.map((i, index)=>{
			return (
				<div key={i.index} onClick={this.removeSelect.bind(this, index, event)} className="form_item_choice">		    
					<h3>{i.id}</h3>
				    <p>{i.title}</p>
				</div>
			)

		})

		let choice = this.state.choiceItems
			.map((i, index)=>{ 
			return (
				<div key={i.index} onClick={this.select.bind(this, index, event)} className="form_item_choice">
				    <h3>{i.id}</h3>
				    <p>{i.title}</p>	
				</div>
			)
		})


		return  (<div>
					<div>
						{current}
						<div style={{ height: 10, background: "black"}} />
						{choice}
				   </div> 
			   </div>)
	}

}

export class FormUniversal extends React.Component {

	static propTypes = {
		formFields: PropTypes.object,
	};

	static defaultProps = {
		formFields: {noPayload: true}
	};

  constructor(props) {
    super(props);
    this.state = { 
    	requestObject: {},
    	openItems: false,
    	updateMode: false,
    }

  }

  _updateRequestObjectField(key, value){

  	if(this.props.formFields.noPayload){
	  	let object = this.state.requestObject
	  	delete object["noPayload"]
	  	object[key] = value
	  	this.setState( { requestObject: { ...object } } ) 
  	} else {
  		let requestObject = this.props.formFields
  		requestObject[key] = value
  		this.setState({requestObject})
  	}
  }


  _onChange(key){
  	this._updateRequestObjectField(key, this.refs[key].value)
  }

  componentWillReceiveProps(nextProps) {
  	if(!nextProps.noPayload) {
  		for ( let key in nextProps.formFields) {
  			this._updateRequestObjectField(key, nextProps.formFields[key])
  		}
  	}

  	if (nextProps.formFields.noPayload) {
  		this._setDefinedRequestObject()
  	}
  }

  _setDefinedRequestObject(){
	if( this.props.method) {
  		let chunks = this.props.method.split("-")
  		let current = definition.actions[chunks[0]][chunks[1]]
  		for ( let key in current) {
	  		this._updateRequestObjectField(key, current[key])
	  	}
  	}
  }

  componentWillMount() {
  	let fields = this.props.formFields
  	if (fields.noPayload) {
  		this._setDefinedRequestObject()
  	} else {
	  	for ( let key in fields) {
	  		this._updateRequestObjectField(key, fields[key])
	  	}
  	}

  }

  setItemsPayloadChunk(key, items){
  	this.state.requestObject[key]=items
  	this.setState({
  		requestObject: this.state.requestObject
  	})
  }

  _renderPayload(){
  	return Object.keys(this.state.requestObject).map((key, index) => {
  		let ChooseItems = definition.types[key]=="items"
  		let noRender = ['intuser','intshop','id'].indexOf(key)!=-1
        return (
            <div key={index}>

            	<div>

            		{ noRender ? null : <label>{key}</label> }

            		{ ChooseItems ? 

            			<div onClick={()=>{this.setState({openItems:!this.state.openItems})}}>
            				<input type={definition.types[key]} disabled placeholder="choose items" className="_disabled" ref={key} onChange={ this._onChange.bind(this, key) } />
            			</div>

            			: 
            			
            			noRender ? null : <input type={definition.types[key]} ref={key} onChange={ this._onChange.bind(this, key) } value={ this.state.requestObject[key] }/> }

            		{ Array.isArray(this.state.requestObject[key]) && this.state.openItems ? 

            			<ChooseItems 
            				choiceRequest={{action: "product-get",payload:{auth:true}}}
            				alreadyItems={this.state.requestObject[key]}
            				setFunc={this.setItemsPayloadChunk.bind(this,key)}
            				/> 
            			: null }

            	</div>

            </div>
            
        )
    }) 

  }

  makeReq() {
  	chan
	  	.req(this.props.method, this.state.requestObject)
	  	.then(data=>{
			if ( ~this.props.method.indexOf("auth")) {
				localStorage.setItem("token", data.token)
			}
	  	})
  }

  render() {
    return (
      	<div className="app_form_universal">
			<div className="_form_wrapper">      		
		      	{ this._renderPayload() }
		      	<button onClick={this.makeReq.bind(this)}>Send</button>
		    </div>
      	</div>
    );
  }

}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(FormUniversal)
