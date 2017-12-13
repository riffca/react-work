import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import definition from 'definition'
import chan from "chan"

function mapStateToProps(state) {
  return {

  };
}


class ChooseItems extends React.Component {

	static propTypes = {
	    currentItems: PropTypes.array,
	};

	static defaultPropTypes = {
	    currentItems: []
	}

	constructor(){
		super()
		this.state = {
			choiceItems: []
		}
	}

	render(){
		let { choiceItems } = this.state
		let current = this.props.currentItems.map(i=><div className="form_item_choice"></div>)
		let choice = choiceItems.map((i, index)=>
			<div onClick={this.select.bind(this, index)} className="form_item_choice">
			    <h3>{i.id}</h3>
			    <p>{i.title}</p>	
			</div>
		)
		return  (<div>
					<div>
					{current}
					{choice}
				   </div> 
			   </div>)
	}

	componentWillMount(){
		let { choiceRequest: { action, payload } } = this.props
		chan.req(action, payload).then(items=>{
			this.setState({choiceItems:items})
		})
	}

	componentWillReceiveProps(newProps) {
		if(this.props.requestKey != newProps.requestKey) {
	    	this.setState({currentItems: newProps.currentItems});
		}
	}

	select(index){
		let current = this.state.choiceItems.splice(1,index)
		let currentItems = this.state.currentItems
		currentItems.push(current)

		this.setState({
			currentItems,
			choiceItems: this.state.choiceItems
		})
		//store.setPayload(requestKey,choiceItems)
	}

}

export class FormUniversal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
    	requestObject: {},
    	openItems: false
    }
  }

  _setRequestObject(key, value){
  	let object = this.state.requestObject
  	object[key] = !this.props.payload ? value : this.props.payload[key]
  	this.setState( { requestObject: { ...this.state.requestObject, ...object } } ) 
  }


  _onChange(key){
  	this._setRequestObject(key, this.refs[key].value)
  }

  componentWillMount() {

  	if( this.props.method) {
  		let chunks = this.props.method.split("-")
  		let current = definition.actions[chunks[0]][chunks[1]]
  		for ( let key in current) {
	  		this._setRequestObject(key, current[key])
	  	}
  	}

  	if (this.props.payload) {
	  	for ( let key in this.props.payload) {
	  		this._setRequestObject(key)
	  	}
  	}

  }

  _renderPayload(){

  	let { payload } = this.props
  	return Object.keys(this.state.requestObject).map((key, index) => {
  		let isItems = definition.types[key]=="items"
        return (
            <div key={index}>
            	<div>
            		<label>{key}</label>
            		{ isItems ? 
            			<div onClick={()=>{this.setState({openItems:!this.state.openItems})}}>
            				<input type={definition.types[key]} disabled placeholder="choose items" className="_disabled" ref={key} onChange={ this._onChange.bind(this, key) } value={ this.state.requestObject[key] }/>
            			</div>
            			:
            			<input type={definition.types[key]} ref={key} onChange={ this._onChange.bind(this, key) } value={ this.state.requestObject[key] }/>
            		}
            		{ this.state.requestObject[key].map && this.state.openItems ? <ChooseItems currentItems={this.state.requestObject[key]} choiceRequest={{action: "product-get",payload:{auth:true}}}/> : null }
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
