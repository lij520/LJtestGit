/*
入口js
*/

import React from 'react';
import ReactDOM from 'react-dom';

/*
全局设置antd国际化的方式
*/
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';

import App from './App.js';

import memoryUtils from './utils/memoryUtils.jsx';
import storageUtils from './utils/storageUtils.jsx';


import { Provider } from 'react-redux';
import store from './redux/store';

// //读取local中保存的user，保存到内存中
// const user = storageUtils.getUser();
// memoryUtils.user = user;

//将App组件渲染到index页面的div上
ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </Provider>, document.getElementById('root'))

// //给store绑定状态更新的监听  
// store.subscribe(() => { //store内部状态数据发生改变时回调
//     //重新渲染Reducx组件
//     ReactDOM.render(<LocaleProvider locale={zhCN}><App/></LocaleProvider>,document.getElementById('root'))
// })