import React from 'react';
import { connect } from 'react-redux';
import ListProducts from 'components/ListProducts';
import FormUniversal from 'components/FormUniversal';
import PropTypes from 'prop-types'
import { loadProduct } from 'store/local/product'
import chan from "utils/chan"

function mapStateToProps(state) {
  return {
  	product: state.product.opened
  };
}

const mapDispatchToProps = {

}

export class ProductsManage extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
    	edit: false,
      formPayload: {},
      createMode: false
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

  setCreateMode(){
    this.setState({createMode:true, edit:true})
  }

  _setPayload(product){
    let { title, description, images, id } = product
    return { title, description, images, id } 
  }

  render() {
    return (
      <div className="app_flex_menu_style">
      	<div className="product_list_column">
      		<ListProducts auth={true} clickAction={this.selectProduct.bind(this)} />
      	</div>

        <div className="_right_info">
          { this.state.createMode ? null : <h2 style={{cursor:"pointer"}} onClick={this.setCreateMode.bind(this)}>Создать</h2> }
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
// Implement map dispatch to props
)(ProductsManage)
