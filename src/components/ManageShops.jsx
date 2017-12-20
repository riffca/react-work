import React from 'react';
import { connect } from 'react-redux';
import ListShops from 'components/ListShops';
import FormUniversal from 'components/FormUniversal';
import PropTypes from 'prop-types'
import chan from "utils/chan"

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {

}

export class ManageShops extends React.Component {
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

  selectShop(id){
  	chan.req("shop-get",{shop:id}).then(shop=>{
      this.setState({
        formPayload: this._setPayload(shop),
        edit:true,
        createMode: false
      })
  	})
  }

  setCreateMode(){
    this.setState({createMode:true, edit:true})
  }

  _setPayload(shop){
    let { name, advt, id, products } = shop
    return { name, advt, id, products } 
  }

  render() {
    return (
      <div className="app_flex_menu_style">
      	<div className="shop_list_column">
      		<ListShops auth={true} clickAction={this.selectShop.bind(this)} />
      	</div>

        <div className="_right_info">
          { this.state.createMode ? null : <h2 style={{cursor:"pointer"}} onClick={this.setCreateMode.bind(this)}>Создать</h2> }
         	{ this.state.edit ? <div className="shop_list_column">
        		<FormUniversal method={"shop-change"} formFields={this.state.createMode ? { noPayload: true } : this.state.formPayload } />
        	</div> :<h1>Магазин не выбран</h1> }
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(ManageShops)
