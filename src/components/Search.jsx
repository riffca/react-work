import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import chan from 'utils/chan';
import FormPrevent from 'components/FormPrevent';
import { setList } from "store/local/product";

let fields = {
	text: {
		type: "text",
		placeholder: "название"
	}
}

function mapStateToProps(state) {
  return {
  };
}


const mapDispatchToProps = {
  setList
}

export class Search extends React.Component {
  static propTypes = {
  	method: PropTypes.string,
    doneAction: PropTypes.func,
    searchFields: PropTypes.object
  };
  static defaultProps = {
  	doneAction: ()=>console.log('sey up please search func')
  }

  constructor(props) {

    super(props);

    this.state = {
    	fields: props.searchFields ? props.searchFields : fields,
    	searchRequestObject: {}
    }

  }


  _setRequestData(){
  	let data = {}
    let none = false
  	Object.keys(this.state.fields).forEach((key,index)=>{
  		data[key]=this.refs[key].value.trim()
      console.log(data[key])
      if(!data[key])none=true
  	})
  	return none || data
  }

  onChange(key){
    let value = this.refs[key].value
    if (value.length ==0) {
      this.props.setList([],{listname: "auth"})
    }
  }

  submit(){
  	let { method, doneAction } = this.props
    let reqData = this._setRequestData()
    if(reqData) {
    	chan
    		.req(method,reqData)
    		.then(data=>doneAction(data))    
    } 
  }

  render() {

  	let { fields: propFields } = this.state

  	let fields = Object.keys(propFields).map((key, index)=>{

      	return <div className="form-group" key={index}>
      		<input onChange={this.onChange.bind(this,key)} ref={key} type={propFields[key].type} placeholder={propFields[key].placeholder} className="form-control"/>
      		<button type="submit" className="btn">поиск</button>
      	</div>

  	})

    return (
      <div className="app_search form-inline">
      	<form className="form-inline" 

      		onSubmit={e=>{
	      	e.preventDefault();
	        e.stopPropagation();
	        this.submit.call(this)
	      	}} 

	      	onKeyUp={
		      	(e) => {
		        if (e.key != 'Backspace') {
		      	  this.submit.call(this)
		        }
		      }
		    }

	      	onKeyDown={
		      	(e) => {
		        if (e.key === 'Enter') {
		          e.preventDefault();
		          onSubmit();
		        }
		      }
		    }>

		    { fields }

      	</form>

      </div>

    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
