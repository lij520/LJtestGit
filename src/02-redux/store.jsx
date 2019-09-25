/*
redux最核心的管理对象：store
*/

// import {createStore} from 'redux';
import reducer from './reducer'

//自定义redux中的createStore
import {createStore} from '../lib/redux/index';

export default createStore(reducer);