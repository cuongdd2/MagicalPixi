let React = require('react');
let T = React.PropTypes;

let _ = require('lodash');

let buildQueryStr = require('../../common/buildQueryStr');

let API = require('../../libs/API');

class Download extends React.Component {

  downloadMaterial(query){

    let queryStr = buildQueryStr(query);

    window.open(API.buildDownloadZip+`?${queryStr}`);
  }

  download(){
    let {query} = this.props;

    if(query){
      this.downloadMaterial(query)
    }
  }

  render(){
    return (
      <a href="javascript:void 0" onClick={this.download.bind(this)}>
      {this.props.children}
      </a>
    )
  }
}

Download.propTypes = {
  query:T.object.isRequired
}


module.exports = Download;