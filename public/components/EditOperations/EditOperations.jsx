require('./EditOperations.scss')

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

const T = React.PropTypes;

import { saveViewData } from '../../js/actions/gameView'

class EditOperations extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  saveScene(){
    let currentState = this.props.store.getState();

    saveViewData()(null,this.props.store.getState);
  }

  render() {
    return (
      <div id="editOperations">
        <button onClick={this.saveScene.bind(this)} className="weui_btn weui_btn_mini weui_btn_default">保存</button>
      </div>
    )
  }
}

EditOperations.propTypes = {
  store:T.object.isRequired
};

module.exports = EditOperations;