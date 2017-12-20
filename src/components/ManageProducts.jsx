import React from 'react';
import { connect } from 'react-redux';
import ListProducts from 'components/ListProducts';
import FormUniversal from 'components/FormUniversal';
import Search from 'components/Search'
import PropTypes from 'prop-types'
import { loadProductList } from 'store/local/product'
import chan from "utils/chan"

function mapStateToProps(state) {
  return {
  	//product: state.product.opened
  };
}

const mapDispatchToProps = {
  loadProductList
}

export class ProductsManage extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
    	edit: true,
      formPayload: {},
      createMode: true,
      listname: "auth"
    }
  }

  selectProduct(id){
  	chan.req("product-get",{product:id}).then(product=>{
      this.setState({
        formPayload: this._setPayload(product),
        edit:true,
        createMode: false
      })
  	})
  }

  searchDoneAction(response) {
    this.setState({
      listname: "search-results",
    })

    this.props.loadProductList({
      listname: "search-results",
      products: response,
    })
    
  }

  _setCreateMode(){
    this.setState({createMode:true, edit:true})
  }

  _setPayload(product){
    let { title, description, images, id } = product
    return { title, description, images, id } 
  }

  render() {
    let searchFields = {
      title: {
        type:"text",
        placeholder: "название"
      }
    }
    
    return (
      <div className="app_flex_menu_style">
        <div className="product_list_column">
          <Search method={"product-get"} searchFields={searchFields} doneAction={this.searchDoneAction.bind(this)} />
      		<ListProducts listname={this.state.listname} clickAction={this.selectProduct.bind(this)} />
      	</div>
        <div className="_right_info">
          { this.state.createMode ? null : <h2 style={{cursor:"pointer"}} onClick={this._setCreateMode.bind(this)}>Создать</h2> }
         	{ this.state.edit ? <div className="product_list_column">
        		<FormUniversal method={"product-change"} formFields={this.state.createMode ? { noPayload: true } : this.state.formPayload } />
        	</div> :<h1>Продукт не выбран</h1> }
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsManage)
