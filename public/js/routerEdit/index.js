import React from 'react'
import ReactRouter,{Router,IndexRoute,Route,browserHistory} from 'react-router'
import * as _ from 'lodash'

//<IndexRoute component={DefaultComponent} />

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

import {editReducer} from '../reducers'
import {routerBuild} from '../../common/routerBuild'

import defaultRouterComponent from './console'

//log(ReactRouter);
//log(ReactRouter.browserHistory,browserHistory);
//
let routersLoad = require.context('./',false,/\.js|\.jsx$/);

let routerList = [
  <IndexRoute key="route0" component={defaultRouterComponent} />
];

routerList = routerList.concat(_.filter(routersLoad.keys(),(key)=>{
  return !/index\.js$/.test(key);
}).map((key,i)=>{
  return {
    path:key.replace('./','').replace(/\.js|\.jsx$/,''),
    component:routersLoad(key)
  }
}).map(({path,component},i)=>{
  i += 1;
  return (
    <Route key={'route'+i} path={path} component={component} />
  )
}));

//
//let history  = createHistory();
//
//let reducer = combineReducers(Object.assign({}, reducers, {
//  routing: routeReducer
//}));
//
//// Sync dispatched route actions to the history
//let reduxRouterMiddleware = syncHistory(history);
//
//let createStoreWithMiddleware = applyMiddleware(
//  thunk,
//  reduxRouterMiddleware
//)(createStore)
//
//let store = createStoreWithMiddleware(reducer);
//
//// Required for replaying actions from devtools to work
//reduxRouterMiddleware.listenForReplays(store)
//
//module.exports = (
//  <Provider store={store} >
//    <Router history={browserHistory}>
//      <route path='/'>
//        {routerList}
//      </route>
//    </Router>
//  </Provider>
//);

//let RouterElement = routerBuild(routerList,reducers);

export function createRouterList(store){

  return routerBuild(routerList,store);
}