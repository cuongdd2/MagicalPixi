
require('./index.scss');

let React = require('react');

let List = require('../../componentFunctional/List');

let SpritePreview = require('../../components/SpritePreview');
let Download = require('../../componentFunctional/Download');

class MaterialsList extends React.Component {

  newMaterial(){
    SpritePreview();
  }

  edit(_id,resourceUrl,type,properties){
    SpritePreview({
      id:_id,
      resourceUrl,
      type,
      properties
    });
  }

  render(){
    return (
      <div id="mpMaterialsList" >
        <header className="top-container">

          <h3 className="material-title" >
          精灵列表
          </h3>

          <button onClick={this.newMaterial.bind(this)} className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建素材</button>

        </header>

        <List>
          {this.props.data.map((sprite,i)=>{

            let {_id,name,resourceUrl,type,properties} = sprite;

            return (
              <li key={"material"+i} className="material-one" >
                <span className="name">
                  {sprite.name}
                </span>

                <span className="operation" href="javascript:void 0">
                  <Download materialName={name} >
                  下载
                  </Download>
                </span>
                <a className="operation" onClick={this.edit.bind(this,_id,resourceUrl,type,properties)} href="javascript:void 0">编辑</a>
              </li>
            )
          })}
        </List>
      </div>
    )
  }
}

module.exports = MaterialsList;