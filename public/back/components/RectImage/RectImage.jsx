require('./RectImage.scss');

 import ReactDOM from 'react-dom'
 const T = React.PropTypes;

 var propTypes = {
 };

 };

  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){
    var style = {
      backgroundImage:"url(" + this.props.src + ")",
      backgroundSize: 'cover',
      width: this.props.width,
      height: this.props.height
    }
    return (
      <div className="rectImage" style={style}>

      </div>
    )
  }
}
 RectImage.propTypes = propTypes;

