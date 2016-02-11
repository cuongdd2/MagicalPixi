require('./FlexBox.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');


class FlexBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      width:props.childrenWidth
    }

  }

  componentDidMount(){
    let {width} = this.state;

    _.map(Object.keys(this.refs),  (refName) => {

      log(refName);
      log(this.refs);

      let refI = parseInt(refName);
      let theDOM = ReactDOM.findDOMNode(this.refs[refName]);

      if(theDOM){
        theDOM.style.width = width[refI] + 'px';
      }
    })
  }




  render(){
    let {width} = this.state;

    return (
      <div className="flex-box" >
      {React.Children.map(this.props.children,(child,i)=>{
        if(width[i]){
          child = React.cloneElement(child,{
            ref:`${i}c`,
          })
        }
        return child;
      })}
      </div>
    )
  }
}

module.exports = FlexBox;