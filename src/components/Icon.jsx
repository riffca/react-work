import React from 'react';

let images = {}
let names = [
	"tick_white",
	"tick_black"
]
names.forEach(i=>{
	images[i] = require('icons/'+i+'.svg')
})


export default class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {images}
  }

  render() {
    return (
      <span className={"icon"} dangerouslySetInnerHTML={{__html: images[this.props.name]}} />
    );
  }
}
