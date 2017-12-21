import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import definition from 'utils/definition';
import Icon from 'components/Icon';
import jquery from 'jquery'

import chan from "utils/chan"

function mapStateToProps(state) {
  return {

  };
}


class ChooseItems extends React.Component {

	static propTypes = {
	    alreadyItems: PropTypes.array,
	    setPayload: PropTypes.func,
	};

	static defaultProps = {
	   	alreadyItems: [],
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
		//console.log(v)
		//console.log(s)
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
    let { isProducts, isTags, isPicture } = this.props
		let current = this.state.currentItems
			.map((i, index)=>{
			return (
				<div key={index} onClick={this.removeSelect.bind(this, index, event)} style={{background:"lightgreen"}} className="form_item_choice _product">
          { isProducts ? <div><image src=""/><p>{i.title}</p></div> : null }
          { isTags ? <p>{i.name}</p> : null }
          { isPicture ? <img style={{ width: "100%"}} src={i.thumb} /> : null }
				</div>
			)

		})

		let choice = this.state.choiceItems
			.map((i, index)=>{ 
			return ( 
				<div key={index} onClick={this.select.bind(this, index, event)} className="form_item_choice _product">
          { isProducts ? <div><image src=""/><p>{i.title}</p></div> : null }
          { isTags ? <p>{i.name}</p> : null }
          { isPicture ? <img style={{ width: "100%"}} src={i.thumb} /> : null }
				</div>
			)
		})


		return  (<div>
					<div>
						{ current }
						{ current.length && choice.length ? <div style={{ height: 3, background: "black"}} /> : null }
						{ choice }
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
    	imageFiles: [],
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

  _onChangeFiles(key) {
  	let files = this.refs[key].files
    let keys = Object.keys(files)
  	keys.forEach((k,index)=>{
  		let file = new FileReader()
  		let image = new Image()
      let requestModelID = this.state.requestObject.id
  		file.onload = ()=>{
  			let { name, type, size } = files[index]
        if (size > 1200000) {
          alert(`большой размер файла ${name}`)
          return
        } 
  			let imageObject = { 
          name, 
          mime: type, 
          shop:requestModelID, 
          product: requestModelID, 
          size, 
          data: file.result 
        } 
  			let imageFiles = [...this.state.imageFiles, imageObject]
  			this.setState({imageFiles})
  			image.src=file.result
        if(index+1>= keys.length) {
          this.setState({openItems: true})
        }
  		}
  		file.readAsDataURL(files[index])
  	})
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

  _removeImage(index){
  	let imageFiles = this.state.imageFiles.slice()
  	imageFiles.splice(index,1)
  	this.setState({imageFiles})
  }

  _renderPayload(){
  	return Object.keys(this.state.requestObject).map((key, index) => {

  		let isChooseItems = definition.types[key]=="items"
  		let isImagesUpload = key == "images"
  		let noRender = ['intuser','intshop','id'].indexOf(key)!=-1
      let isChooseProducts = key == "products"
      let isChooseTags = key == "tags"
      let isChoosePicturies = key == "images"
      let { requestObject } = this.state
  		let imagesToUpload = this.state.imageFiles.map((image, index)=>{
  			return <div key={index} onClick={this._removeImage.bind(this, index)} className="app_image_card">
	  				<div><img src={image.data} /></div>
	  				<div><Icon name={"tick_black"} /></div> 
  				</div>
  		})

        return (
            <div key={index}>

            	<div>

            		{ noRender ? null : <label>{key}</label> }

            		{ isChooseItems ? 

            			isImagesUpload ? 

            				<div className="_images_to_upload">
		            			<div onClick={(()=>{this.setState({openItems:!this.state.openItems})}).bind(this)}>
                        <label htmlFor={"images"}> Выберите картинки</label>
		            				<input id="images" type={"file"}  ref={key} multiple style={{display:"none"}} onChange={ this._onChangeFiles.bind(this, key) } />
		            			</div>
		            			<div className="form_upload_images">
		            				{imagesToUpload}
		            			</div>
		            		</div>

	            			:

	            			<div onClick={()=>{this.setState({openItems:!this.state.openItems})}}>
	            				<input type={definition.types[key]} disabled placeholder={"Выберите "+key}className="_disabled" ref={key} onChange={ this._onChange.bind(this, key) } />
	            			</div>

            			: 
            			
            			noRender ? null : <input type={definition.types[key]} ref={key} onChange={ this._onChange.bind(this, key) } value={ this.state.requestObject[key] }/> }

            		{ isChooseProducts && Array.isArray(requestObject[key]) && this.state.openItems ? 
              			<ChooseItems
                      isProducts={true}
                      choiceRequest={{action: "product-get", payload:{auth:true}}}
                      alreadyItems={requestObject[key]}
                      setFunc={this.setItemsPayloadChunk.bind(this,key)}
                      /> 
                  : null }

                { isChooseTags && Array.isArray(requestObject[key]) && this.state.openItems ? 
                    <ChooseItems
                      isTags={true}
                      choiceRequest={{action: "tag-get", payload:{}}}
                      alreadyItems={requestObject[key]}
                      setFunc={this.setItemsPayloadChunk.bind(this,key)}
                      /> 
                  : null }

                { isChoosePicturies && Array.isArray(requestObject[key]) && this.state.openItems ? 
                    <ChooseItems
                      isPicture={true}
                      choiceRequest={{action: "image-get", payload:{intproduct: requestObject[key]}}}
                      alreadyItems={this.state.requestObject[key]}
                      setFunc={this.setItemsPayloadChunk.bind(this,key)}
                      /> 
                  : null }

            	</div>

            </div>
            
        )
    }) 

  }
  _request(){
    return chan
      .req(this.props.method, this.state.requestObject)
      .then(data=>{
        if ( ~this.props.method.indexOf("auth")) {
          localStorage.setItem("token", data.token)
        }
      })
  }

  _reqWithUploads(){
    let promises = []
    let images = []
    this.state.imageFiles.forEach(i=>{
      promises.push(new Promise((resolve, reject)=>{
        chan.req("upload-image",i, true).then(data=>{
          images.push(data)
          resolve(data)
        }).catch(err=>reject(err))
      }))
    })
    Promise.all([...promises]).then(data=>{
      let { requestObject } = this.state
      requestObject["images"] = [...requestObject["images"], ...data]
      this.setState({requestObject})     
    }).then(()=>this._request())
  }

  makeReq() {
    this.state.imageFiles.length ? this._reqWithUploads() : this._request()
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
