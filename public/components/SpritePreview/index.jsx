require('./index.scss');

let PIXI = require('pixi');
let React = require('react');

let FileUpload = require('../../componentFunctional/FileUpload');
let SettingList = require('./SettingList');

let setConfig = require('../../common/setConfig');
let sprite = require('../../common/sprite');
let renderer = require('../../common/getRenderer');

const PERIOD_INIT = 0;
const PERIOD_MC = 1;
const PERIOD_IM = 2;

const SPRITE_MC = 'movieClip';
const SPRITE_IM = 'image';

let typeFnMap = {
  [SPRITE_IM]:sprite.getIm,
  [SPRITE_MC]:sprite.getMc
};

let getSpriteTpeByUrl  = (url)=>{

  let im = /\.png$/;
  let mc =  /\.json/;

  return mc.test(url)?SPRITE_MC:
    im.test(url)?SPRITE_IM:null;
};

let settingListConfigMap = {
  [SPRITE_IM]:[{
    name:'name',
    key:'name'
  },{
    name:'x',
    key:'x',
    describe:'for x'
  },{
    name:'y',
    key:'y',
    describe:'for y'
  },{
    name:'scale.x',
    key:'scale.x',
    describe:'for scale.x'
  }],
  [SPRITE_MC]:[{
    name:'name',
    key:'name'
  },{
    name:'x',
    key:'x',
    describe:'for x'
  },{
    name:'y',
    key:'y',
    describe:'for y'
  },{
    name:'scale.y',
    key:'scale.y',
    describe:'for scale.y'
  },{
    name:'animateSpeed',
    key:'animateSpeed',
    describe:'animateSpeed'
  },{
    name:'play and Stop',
    checkbox:{
      true:'play',
      false:'stop'
    },
  }]
};

class SpritePreview extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      period:PERIOD_INIT,
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

        this.spriteDisplayObj = typeFnMap[spriteType](spriteDisplayObjProperties);

        this.stage.removeChildren();
        this.stage.addChild(this.spriteDisplayObj);

        this.setState({
          spriteType
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

    setConfig(this.spriteDisplayObj,newProperties);

    this.setState({
      spriteDisplayObjProperties:newProperties
    })
  }

  render(){
    let {spriteType} = this.state;
    let settingListConfig = settingListConfigMap[spriteType] || [];

    return (
      <div id="spritePreviewBox">
        <h3>预览</h3>

        <div className="container">
          <FileUpload uploadDone={this.uploadDone.bind(this)}>
            <div className="preview-container">

            </div>
          </FileUpload>

          <SettingList settingListConfig={settingListConfig}
                       changeSetting={this.setPropertyTo.bind(this)} />

        </div>

        <footer className="operation">
          <button>submit</button>
          <button>reset</button>
        </footer>
      </div>
    )
  }
}

SpritePreview.SPRITE_MC = SPRITE_MC;
SpritePreview.SPRITE_IM = SPRITE_IM;

module.exports = SpritePreview;