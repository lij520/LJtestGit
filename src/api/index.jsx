/*
包含应用中所有的接口请求函数的模块
要求：能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/
import jsonp from 'jsonp';
import ajax from "./ajax";
import { message } from 'antd';

/* 
问：什么时候用post请求什么时候用get请求?
答：当查询时一般都用get请求
    当对后台数据进行添加、删除、修改时用post请求
    如果没有请求参数用post无意义
*/

//登陆
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST');

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST');

//获取一级/二级分类的列表//GET请求
export const reqCategory = (parentId) => ajax('/manage/category/list',{parentId:parentId});

//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax('/manage/category/add',{categoryName,parentId},'POST');  //用两个参数接收

//更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax('/manage/category/update',{categoryId,categoryName},'POST');  //用一个参数对象接受

//获取商品分页列表
export const reqProducts = (pageNum,pageSize) =>ajax('/manage/product/list',{pageNum,pageSize})

//搜索商品分页列表 searchType：productDesc/productName
export const reqSearchProducts = (pagenum,pagesize,searchName,searchType) =>ajax('/manage/product/search',
    {
        pageNum : pagenum,
        pageSize : pagesize,
        [searchType]:searchName, //如果变量要做属性值，必须要用[]
    }
);

//获取一个分类
export const reqCategories = (categoryIds) =>ajax('/product/category/info',{categoryId:categoryIds});

//更新商品状态（上下架）
export const reqUpdateStatus = (productId,statusId) => ajax('/manage/product/updateStatus',{productId,statusId});

//删除图片
export const reqDeleteImg = (name)=>ajax('/manage/img/delete',{name},'POST');

// //更新商品详情
// export const reqUpdateProduct = (product) =>ajax('/manage/product/update',{product},'POST')

// //添加商品
// export const reqAddProduct = (product) =>ajax('/manage/product/add',{product},'POST')

//添加或更新商品
export const reqAddorUpdateProduct = (product) =>ajax('/manage/product/'+(product._id?'update':'add'),{product},'POST')

//获取角色列表
export const reqRoleList = ()=>ajax('/manage/role/list');


//添加角色
export const reqAddRole = (name,time)=>ajax('/manage/role/add',{name,time},'POST');

//更新角色
export const reqUpdateRole = (role)=>ajax('/manage/role/update',role,'POST');

//获取用户列表
export const reqUserList = ()=>ajax('/manage/user/list');

//删除用户
export const reqDeleteUser=(userId)=>ajax('/manage/user/delete',{userId},'POST');

//添加用户
export const reqAddUsers=(user)=>ajax('/manage/user/add',user,'POST');
/* 
天气请求的接口文件
json请求的接口请求函数
*/
/*
一、jsonp请求的原理：
1、用来解决ajax请求跨域问题的，只能解决GET类型的请求
2、本质不是ajax请求，而是一般的GET请求
二、怎么做的？
    浏览器端：动态生成<script>标签来请求后台接口（src就是接口的url）
          定义好用于接收响应数据的函数（fn），并将函数名通过请求参数提交给后台
    服务器端：接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用
    浏览器端：收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，得到了需要的结果数据
*/
export const reqWeather = (city) =>{

    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        //发送jsonp请求
        jsonp(url,{},(err,data) =>{
            console.log('jsonp',err,data);
            //判断获取数据成功与否
            if(!err&&data.status==='success'){
                //如果成功
                const {dayPictureUrl,weather}=data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather});
            }else{
                //如果失败
                message.error('获取天气信息失败');
            }
        })
    })
}
// reqWeather('福州');