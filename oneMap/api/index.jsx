import ajax from "./ajax.jsx";

const baseURL = 'http://36.250.234.160:13077';
// const baseURL=''

//获取市级列表
export const reqgetCity = (rId,rgId) => ajax(baseURL+'/City/searchByUser',{roleId:rId , regionId:rgId});

//获取县级列表
export const reqgetCountry = (type,cyId) => ajax(baseURL+'/City/showCity',{title:type ,cityId:cyId});

//获取地区列表
export const reqgetCounty = (cityId) => ajax(baseURL+'/country',{cityId});

//获取桥梁
export const reqgetBridge = (fesIndex,loc,areaId) =>{
    
    if(loc==="cityId"){
        return ajax(baseURL+'/total',{title:fesIndex,cityId:areaId}); 
    }else if(loc==="countryId"){
        return ajax(baseURL+'/total',{title:fesIndex,countryId:areaId}); 
    }
} 

//获取路管员
export const reqgetManager = (userId) =>ajax(baseURL+'/getCityPositionByRegionId',userId,'POST'); 

//获取养护类数据
export const reqgetMatiance = (locChange,rgId,fesIndex) =>{
    if(locChange==="townId"){
        return ajax(baseURL+'/total?title=matiance',{townId:rgId,problem_id:fesIndex});
    }else if(locChange="countryId"){
        return ajax(baseURL+'/total?title=matiance',{countryId:rgId,problem_id:fesIndex});
    }else if(locChange="cityId"){
        return ajax(baseURL+'/total?title=matiance',{cityId:rgId,problem_id:fesIndex});
    }
} 

//获取管理类数据
export const reqgetRoadEvent = (locChange,rgId,fesIndex) => {
    if(locChange==="townId"){
        return ajax(baseURL+'/total?title=roadEvent',{townId:rgId,problem_id:fesIndex});
    }else if(locChange="countryId"){
        return ajax(baseURL+'/total?title=roadEvent',{countryId:rgId,problem_id:fesIndex});
    }else if(locChange="cityId"){
        return ajax(baseURL+'/total?title=roadEvent',{cityId:rgId,problem_id:fesIndex});
    }
}

//获取中心点数据
export const reqCenter = (rId,rgId) => ajax(baseURL+'/City/center_inf',{roleId:rId,regionId:rgId});