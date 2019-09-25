/*
redux最核心的管理对象：store
*/

import {/* createStore,  */applyMiddleware} from 'redux';
import {createStore} from '../lib/redux/index';
import reducer from './reducer';
import thunk from 'redux-thunk'; //用来实现redux异步的redux中间件插件
import {composeWithDevTools} from 'redux-devtools-extension';

// export default createStore(reducer,applyMiddleware(thunk));
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));
// export default createStore(reducer);