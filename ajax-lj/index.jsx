import ajax from "./ajax";

//获取当前用户所在行政区域的下属行政树(search.jsx)
export const reqLocation = (sessionId) => ajax('/api/common/ca-company/getCompanyTree?sessionId=' + sessionId, {}, 'POST');

// 获取公路路段数据的Table表格(detailroad.jsx)
export const reqAddRoadTable = (region_id, lower, Condition, queryValue, currentPage, pageSize) => ajax('/api/common/gl-road/queryRoadListByRegionIdAndCondition?region_id=' + region_id + '&lower=' + lower + '&Condition=' + Condition + '&queryValue=' + queryValue + '&currentPage=' + currentPage + '&pageSize=' + pageSize, {}, 'POST')

//获取区域所有路段数据(mapcommon.jsx)
export const reqAllRoadData = (region_id) => ajax('/api/mapmanage/gl-road-track-point/queryTrackPointByReginonId?region_id=' + region_id, {}, 'POST')

//获取点击的某行的该段道路数据(mapcommon.jsx)
export const requniqRoadData = (keyno) => ajax('/api/mapmanage/gl-road-track-point/queryTrackPoint?keyno=' + keyno, {}, 'POST')

//获取区域所有路线数据(roadline.jsx)
export const reqLineRoadTable = (region_id, lower, Condition, queryValue, currentPage, pageSize) => ajax('/api/common/gl-line/getRoadLineByRegion?region_id=' + region_id + '&lower=' + lower + '&queryCondition=' + Condition + '&queryValue=' + queryValue + '&pageSize=' + pageSize + '&currentPage=' + currentPage, {}, 'POST');

//根据道路keyno获取道路的属性信息(roadtailform.jsx)
export const reqRoadtailForm = (keyno) => ajax('/api/common/gl-road/queryRoadByKeyno?keyno=' + keyno, {}, 'POST')

//获取村路长/乡路长/专管员全部数据接口
export const reqRoaderAndmanager = (current, size, susertype) => ajax('/api/common/gl-user/getGlUserList?current=' + current + '&size=' + size + '&susertype=' + susertype, {}, 'POST');

//获取保险公司/养护队/运管部门/路政中队接口
export const reqMantanceAndCompany = (current, size, suserclass) => ajax('/api/common/ca-user/getCaUserList?current=' + current + '&size=' + size + '&suserclass=' + suserclass, {}, 'POST');

//获取行政区划下的路线代码接口
export const reqRoadLineCode = (region_id, lower, queryCondition, queryValue, pageSize, currentPage) => ajax('/api/common/gl-line/getRoadLineByRegion?region_id=' + region_id + '&lower=' + lower + '&queryCondition=' + queryCondition + '&queryValue=' + queryValue + '&pageSize=' + pageSize + '&currentPage=' + currentPage, {}, 'POST');

//获取路标接口
export const reqLandMarkList = (region_id, lower, Condition, queryValue, currentPage, pageSize) => ajax('/api/roadsign/gl-facilities/getGlFacilitiesList?sadminarea=' + region_id + '&isContainChildren=' + lower + '&size=' + pageSize + '&current=' + currentPage + `&${Condition}=` + queryValue, {}, 'POST')

//获取桥梁接口
export const reqBridgeList = (region_id, lower, Condition, queryValue, currentPage, pageSize) => ajax('/api/roadsign/gl-bridge/getGlBridgeList?sadminarea=' + region_id + '&isContainChildren=' + lower + '&size=' + pageSize + '&current=' + currentPage + `&${Condition}=` + queryValue, {}, 'POST')

//获取景点列表接口
export const reqSceneryPointsList = (region_id, lower, Condition, queryValue, currentPage, pageSize) => ajax('/api/roadsign/gl-view-spot/getGlViewSpotList?sadminarea=' + region_id + '&isContainChildren=' + lower + '&size=' + pageSize + '&current=' + currentPage + `&${Condition}=` + queryValue, {}, 'POST');

//根据附属编码获取桥梁属性信息
export const reqBridgeAttr = (sbridgecode) => ajax('/api/roadsign/gl-bridge/getBridgeBySbridgecode?sbridgecode=' + sbridgecode, {}, 'POST');

//根据keyno获取路标属性信息
export const reqRoadmarkAttr = (keyno) => ajax('/api/roadsign/gl-facilities/getGlFacilitiesById?keyno=' + keyno, {}, 'POST');

//根据keyno获取景点属性信息
export const reqSecenryAttr = (keyno) =>ajax('/api/roadsign/gl-view-spot/getGlViewSpotById?keyno='+keyno,{},'POST');

//获取当前区域村路长/乡路长/专管员接口
export const reqRoaderManager = (current, size, susertype,sadminarea) => ajax('/api/common/gl-user/getGlUserList?current=' + current + '&size=' + size + '&susertype=' + susertype+'&sadminarea='+sadminarea, {}, 'POST');


//获取全部地区列表接口
export const reqAllRegions = ()=>ajax('/api/common/ca-company/getCompanyList',{},'POST');

//获取路标经纬度接口
export const reqRoadMarkLonlat = ()=>ajax('/api/roadsign/gl-facilities/getGlFacilitiesInFo',{},'POST');

//获取桥梁经纬度接口
export const reqBridgeLonLat = ()=>ajax('/api/roadsign/gl-bridge/getGlBridgeInFo',{},'POST');

//获取景点经纬度接口
export const reqSceneryLonLat = ()=>ajax('/api/roadsign/gl-view-spot/getGlViewSpotInFo',{},'POST');

//根据账户信息进行查询接口(保险公司/养护队/运管部门/路政中队接口)
export const reqcaUserTypeList = (account)=>ajax('/api/common/ca-user/getCaUserByAccount?account='+account,{},'POST');

//根据账户信息进行查询(专管员/村路长/乡路长)
export const reqglUserTypeList = (account)=>ajax('/api/common/gl-user/getGlUserByAccount?account='+account,{},'POST');

//地图时间类型显示
export const reqReportType = (userAccount,keyno)=>ajax('/api/mapmanage/MapEventController/Event?userAccount='+userAccount+'&keyno='+keyno,{});

//路管员获取数据接口
export const reqManagerOnOff = (userAccount) =>ajax('/api/mapmanage/user-position/getOneLineMessage?userAccount='+userAccount,{});

//获取事件上报类型接口
export const reqEventReport =(sparentkeyno)=>ajax('/api/ggtreecode/getGlRoadProblemType?sparentkeyno='+sparentkeyno,{})