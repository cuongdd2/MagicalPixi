require('./index.scss');
require("../../styles/wedget/button.css");


let PIXI = require('pixi');
let React = require('react');

let FileUpload = require('../../componentFunctional/FileUpload');
let SettingList = require('./SettingList');

let setConfig = require('../../common/setConfig');
let renderer = require('../../common/getRenderer');

let {SPRITE_IM,SPRITE_MC,spriteFnMap,} = require('./previewConfig');


let getSpriteTpeByUrl  = (url)=>{

  let im = /\.png$/;
  let mc =  /\.json/;

  return mc.test(url)?SPRITE_MC:
    im.test(url)?SPRITE_IM:null;
};

class SpritePreview extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      init:true,
      spriteType:'',
      spriteDisplayObjProperties:{
      }
    };


    this.spriteDisplayObj = {};
  }

  componentDidMount(){
    let previewContainer = document.querySelector('#spritePreviewBox .preview-container');

    previewContainer.appendChild(renderer.view);

    this.stage = new PIXI.Container();

    this.runRender(this.stage);
  }

  componentWillUnmount(){
    cancelAnimationFrame(this.rafFlag);
  }

  runRender(stage){

    let animate = () => {

      stage.children.forEach((function(child){
        if(child.render){
          child.render();
        }
      }));
      // render the stage container
      renderer.render(stage);

      this.rafFlag = requestAnimationFrame(animate);
    };
    animate();
  };


  uploadDone(uploadResult){
    let { spriteDisplayObjProperties} = this.state;

    let resourceKey = 'img' + Date.now();

    let spriteType = getSpriteTpeByUrl(uploadResult);

    PIXI.loader.add(resourceKey,uploadResult)
      .load((loader,resources)=>{

        //同时兼容到im和mc
        spriteDisplayObjProperties.textures = resources[resourceKey].texture || resources[resourceKey].textures;

        this.spriteDisplayObj = spriteFnMap(spriteType)(spriteDisplayObjProperties);

        this.stage.removeChildren();
        this.stage.addChild(this.spriteDisplayObj);

        this.setState({
          spriteType,
          init:false
        })
      });
  }

  fixProperties(properties,newProperties){

    if(properties.play !== undefined){
      delete newProperties.stop;
    }
    if(properties.stop !== undefined){
      delete newProperties.play;
    }

    console.log(newProperties);

    return newProperties;
  }

  setPropertyTo(properties={}){
    let { spriteDisplayObjProperties:oldProperties} = this.state;

    let newProperties = Object.assign(oldProperties,properties);

    newProperties = this.fixProperties(properties,newProperties);

    if(this.spriteDisplayObj){
      setConfig(this.spriteDisplayObj,newProperties);
    }

    this.setState({
      spriteDisplayObjProperties:newProperties
    })
  }

  render(){
    let {init,spriteType} = this.state;

    return (
      <div id="spritePreviewBox" data-init={init}>
        <h3>预览</h3>

        <div className="container">
          <FileUpload uploadDone={this.uploadDone.bind(this)}>
            <div className="preview-container">

            </div>
          </FileUpload>

          <SettingList spriteType={spriteType}
                       changeSetting={this.setPropertyTo.bind(this)} />

        </div>

        <footer className="operation">
          <button className="weui_btn weui_btn_mini weui_btn_primary">确定（没效果）</button>
          <button className="weui_btn weui_btn_mini weui_btn_default">取消（没效果）</button>
        </footer>
      </div>
    )
  }
}

module.exports = SpritePreview;