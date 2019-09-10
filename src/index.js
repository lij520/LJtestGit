/*
入口js
*/

import React from 'react';
import ReactDOM from 'react-dom';

/*
全局设置antd国际化的方式
*/
import { LocaleProvider } from 'antd'; 
import zhCN from 'antd/es/locale-provider/zh_CN';

import App from  './App.js';
import memoryUtils from './utils/memoryUtils.jsx';
import storageUtils from './utils/storageUtils.jsx';

//读取local中保存的user，保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user ; 

//将App组件渲染到index页面的div上
ReactDOM.render(<LocaleProvider locale={zhCN}><App/></LocaleProvider>,document.getElementById('root'))