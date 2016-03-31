/**
 * Created by zyg on 16/1/16.
 */
var path = require('path');
var Sprite = require('../models/Sprite');

var configScriptsTemplate = require('./spriteConfigScriptsTemplate');
var indexScriptsTemplate = require('./spriteIndexScriptsTemplate');

var resourceObjBuild = function (resourceUrl) {
  var resourceArr = [resourceUrl];

  if(resourceUrl.indexOf('.json') !== -1){
    var p = path.parse(resourceUrl);
    var name = p.name;
    var dir = p.dir;

    resourceArr.push(
      path.resolve(dir,name + '.png')
    );
  }

  return resourceArr.map(function (url) {
    return [
      path.parse(url).base,
      path.join(__dirname,'../public',url)
    ]
  }).reduce(function (init, next) {
    init[next[0]] = next[1];
    return init;
  },{})
};

var build = function (materialObj) {

  var name = materialObj.name;

  var properties = JSON.parse(materialObj.properties);

  var actionFrames = JSON.parse(materialObj.actionFrames);

  console.log('actionFrames:',actionFrames);

  var scripts = configScriptsTemplate(
    materialObj.name,
    materialObj.type,
    properties,
    actionFrames
  );

  console.log('configScript done:',materialObj);

  var indexScripts = indexScriptsTemplate();

  //var resourceObj = resourceObjBuild(materialObj.resourceUrl);
  //
  //resourceObj = Object.assign(resourceObj,{
  //  [configScriptsTemplate.filename]:new Buffer(scripts.text),
  //  [indexScriptsTemplate.filename]:new Buffer(indexScripts.text)
  //});
  var scriptsFileResourceObj = {
    [configScriptsTemplate.filename]: new Buffer(scripts.text),
    [indexScriptsTemplate.filename]: new Buffer(indexScripts.text)
  };


  return scriptsFileResourceObj;
};

/**
 *
 * @param materialObj
 *  materialObj.name 必须有
 *  一个素材对象，同mongo的存储对象。
 */
module.exports = function buildMaterialZipSource(materialObj) {
  var name = materialObj.name;
  
  var isAllRequired = ['name','type','resourceUrl','properties'].every(function (key) {
    return materialObj[key];
  });

  materialObj.actionFrames = materialObj.actionFrames || '[]';

  return new Promise(function (resolve,reject) {
    if(!name){
      throw new Error('materialObj must have "name" ');
    }
    console.log('isAllRequired:',isAllRequired);

    if(isAllRequired){

      var scriptsFiles = build(materialObj);

      var resourceObj = resourceObjBuild(materialObj.resourceUrl);

      resolve(Object.assign({},scriptsFiles,resourceObj));
    }else{
      reject(false);
    }
  })
};