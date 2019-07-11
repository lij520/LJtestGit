/*
    巡路月历
    --logCalender.jsx--
    --patrolLog.jsx--
*/
import React from 'react';
import { message, Calendar, Badge, LocaleProvider, Select, Row, Col, Button, Drawer, Alert, Modal} from 'antd';
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

import $ from 'jquery';
import './index.scss';
import './index.less';

const Option = Select.Option;

const nowTime = moment().format('YYYY-MM-DD'); 
var date=new Date;
var year=date.getFullYear();  //当月所在年份
var month=date.getMonth()+1;
month =(month<10 ? "0"+month:month);  //当月月份

class LogCalendar extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        endTime: nowTime,
        list: [],
        timeList: [],
        nowMonth: month,    
        nowYear: year,
        timeRange: {},      
        queryParam: {},
        disabled: false,
        roleId: _mm.getStorage('userInfo').roleId,
        regionId: _mm.getStorage('userInfo').regionId,
        userList: [],
        regionList: [],
        value: '',

        visible: false,
        drawer: [],
        visible_modal: false,
      }
    }

    componentDidMount() {
        // this.state.roleId === 9 
        //     ? 
        //     this.whenRoleIdisNine()
        //     : 
        //     this.queryUserList();
    }

    whenRoleIdisNine() {
        this.setState({
            disabled:true
        })
        this.queryRegionList();
    }

    //选择人员下拉框
    queryUserList() {
        var formData = new FormData();
        formData.set("userId",_mm.getStorage('userInfo').userId);
        formData.set("token",_mm.getStorage('userInfo').token);
        formData.set("roleType",'50');
        formData.set("regionId",this.state.regionId);
        
        $.ajax({
        type        :  'post',
        url         :  '/patrol/queryUserList',
        data        :  formData,
        cache       :  false,//上传文件无需缓存
        processData :  false,//用于对data参数进行序列化处理 这里必须false
        contentType :  false, //必须
        success     : res => {
            var {queryParam} = this.state;
            var i = 0;
            queryParam.userId = res.userList[i].user_id;

            this.setState({
                userList:res.userList,
                value:res.userList[i].real_name,
                queryParam: queryParam
            },() => this.loadList() );
        },
        error       : err => {
            message.error('error!');
        }
        });
    }

    //县级所属地区下拉框
    queryRegionList() {
        $.ajax({
            type    :  'get',
            url     :  '/patrol/regionList?regionId='+ _mm.getStorage('userInfo').regionId,
            data    :  {},
            success : res => {
                console.log(res);
                this.setState({
                    regionList: res
                })
            },
            error   : err => {
                message.error('error!');
            }
        });
    }

    //获取巡路月历所需数据
    loadList() {
        const startTime = moment().format('YYYY-MM') + '-' + '01';//当月的1号
        const {endTime} = this.state;

        var {queryParam,timeRange} = this.state;
        queryParam.appType = '1';
        queryParam.regionId = this.state.regionId;
        timeRange.DateStart = startTime;
        timeRange.DateEnd = endTime;

        this.setState({
            queryParam: queryParam,
            timeRange: timeRange
        });
    
        this.queryList(queryParam,startTime,endTime);
    }

    queryList(queryParam,startTime,endTime) {
        $.ajax({
            type        :  'get',
            url         :  '/patrolRecord/recordCalendar?appType='+queryParam.appType+"&userId="+queryParam.userId+"&regionId="+queryParam.regionId+"&startTime="+startTime+"&endTime="+endTime,
            data        :  {},
            success     : res => {
              if(res.result == 1){
                // res.PatrolRecord.length == 0 ? message.info(`${this.state.value} ` + `${this.state.nowYear}` + "年 " + `${this.state.nowMonth}` + "月份未巡路") :null;
                this.setState({
                  list:res.PatrolRecord,
                });
                console.log('list:',this.state.list);

                const timeList = [];
                $.each(res.PatrolRecord, function(index, item) {
                    timeList.push(moment(item.endTime).format("DD"));
                });
                this.setState({
                    timeList: this.unique(timeList),
                });
              }
              else if(res.result == -1){
                message.error(res.message);
                window.location.href = '/';
              }
              else{
                message.error(res.message);
              }
            },
            error       : err => {
                message.error('error!');
            }
        });
    } 

    //数组去重复函数
    unique(arr) {
      var result = [], hash = {};
      for (var i = 0, elem; (elem = arr[i]) != null; i++) {
          if (!hash[elem]) {
              result.push(elem);
              hash[elem] = true;
          }
      }
      return result;
    }
    //统计一个数组中有多少个不重复的单词：
    // 不用reduce时： 
    getArrayCnt(arr) { 
        var obj = {}; 
        for(var i= 0, l = arr.length; i< l; i++){ 
            var item = arr[i]; 
            obj[item] = (obj[item] +1 ) || 1; 
        } 
        return obj; 
    }
    // 用reduce时：
    getArrayCntReduce(arr){ 
        return arr.reduce(function(prev,next){ 
            prev[next] = (prev[next] + 1) || 1; 
            return prev; 
        },{}); 
    }
    //obj -> arr
    objToArr(obj) {
        var arr = [];
        for (let i in obj) {
            let o = {};
            o["a"] = i;
            o["b"] = obj[i];
            arr.push(o)
        }
        return arr;
    }

    //日期(日期面板)变化回调
    onCalendarChange(date) {
        this.setState({timeList: [] });

        let d_mon = date.month()+1;
        let d_month = (d_mon<10?"0"+d_mon:d_mon );
        let DateStart = date.year() +"-"+ d_month +"-"+ "01";
        var lastDay= new Date(date.year(),date.month()+1,0);
        let DateEnd = moment(lastDay).format('YYYY-MM-DD');
        // console.log(DateStart,DateEnd);

        const {queryParam,timeRange} = this.state;
        console.log('参数',queryParam)
        timeRange.DateStart = DateStart;
        timeRange.DateEnd = DateEnd;

        this.setState({
            nowMonth: d_month,
            nowYear: date.year(),
            timeRange: timeRange
        })
        // 判断JS对象是否拥有某属性
        // if('userId' in queryParam){
        //     console.log("参数不为空")
        // }else{
        //     console.log('参数为空')
        // } 
        if(JSON.stringify(queryParam) == "{}"){
            message.info("请选择地区和人员！");
        }else{
            this.queryList(queryParam,DateStart,DateEnd);
        }
        // this.queryList(queryParam,DateStart,DateEnd);
    }

    getListData(date) {
        let listData;
        if(date.year() == this.state.nowYear 
            && (date.month() + 1) == this.state.nowMonth 
            && this.state.timeList.length !=0){
            for(var i = 0; i < this.state.timeList.length; i++){
                if(date.date() == this.state.timeList[i]) {
                    listData = [
                      // { type: 'warning', content: 'This is warning event.' },
                      { type: 'success'},
                    ]; 
                }
            }
        }    
        return listData || [];
    }

    //自定义渲染日期单元格，返回内容会被追加到单元格
    dateCellRender(date) {
        const listData = this.getListData(date);
        return (
          <ul className="events">
            {
              listData.map((item,i) => (
                <li key={i}>
                  <Badge className="calendar_badge" status={item.type} text={item.content} />
                </li>
              ))
            }
          </ul>
        );
    }

    handleChange(value,option) {
        console.log(option);

        var {queryParam,timeRange} = this.state;
        var DateStart = timeRange.DateStart;
        var DateEnd = timeRange.DateEnd;
        queryParam.userId = option.key;

        this.queryList(queryParam,DateStart,DateEnd);
        this.setState({
            value: option.props.children,
            queryParam: queryParam
        });
    }

    handleRegionChange(value,option) {
        // console.log(value,option)
        this.setState({
            regionId: value
        },() => {
            this.setState({disabled: false})
            this.queryUserList()
        })
    }

    showDrawer() {
        const {list} = this.state;
        const arr = [];
        $.each(list, function(index, item) {
            arr.push(moment(item.endTime).format("DD"));
        });
        var _res = this.getArrayCnt(arr);
        console.log("_res",this.objToArr(_res) );
        
        this.setState({
            visible: true,
            drawer: this.objToArr(_res)
        });
    };
    
    onCloseDrawer() {
        this.setState({
            visible: false,
        });
    };

    openLogCalendar() {
        this.setState({
            visible_modal: true,
        });
        this.state.roleId === 9 
            ? 
            this.whenRoleIdisNine()
            : 
            this.queryUserList();
    }
    closeLogCalendar() {
        this.setState({
            visible_modal: false,
            disabled: true,
            value: '',
            queryParam: {},
        })
    }

    render(){
        // console.log(this.state.timeList);
        return(
            <Row style={{width:'100%'}}>
                <Button type='primary' onClick={() => this.openLogCalendar()}>巡路月历</Button>
                <Modal
                    title="巡路月历"
                    visible={this.state.visible_modal}
                    centered
                    width='900px'
                    footer={null}
                    destroyOnClose
                    onCancel={() => this.closeLogCalendar()}
                    bodyStyle={{padding:'5px'}}
                    >
                    <div className='calendar-content'>
                        <Row gutter={16} className='calendar-search'>
                            {
                                this.state.roleId === 9
                                ?
                                <Col span={9}>
                                    <span>所属地区：</span>
                                    <Select
                                        loading
                                        style={{width: '75%'}}
                                        onChange={(value,option) => this.handleRegionChange(value,option)} getPopupContainer={triggerNode => triggerNode.parentNode}
                                        >
                                        {
                                            this.state.regionList.map(item => <Option key={item.regionId}>{item.regionName}</Option>)
                                        }
                                    </Select>
                                </Col>
                                : null
                            }
                            <Col span={9}>
                                <span>选择人员：</span>
                                <Select 
                                    disabled={this.state.disabled} 
                                    loading 
                                    value={this.state.value} 
                                    style={{width: '75%'}} 
                                    onChange={(value,option) => this.handleChange(value,option)} 
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    >
                                    {
                                        this.state.userList.map(item => <Option key={item.user_id}>{item.real_name}</Option>)
                                    }   
                                </Select>
                            </Col> 
                            <Col span={2} style={{float:'right'}}>
                                <Button onClick={() => this.showDrawer()}>详情</Button>
                                <Drawer
                                    title={`${this.state.value} ` + `${this.state.nowYear}` + "年 " + `${this.state.nowMonth}` +"月份巡路详情"}
                                    placement="right"
                                    width={300}
                                    closable={false}
                                    onClose={() => this.onCloseDrawer()}
                                    visible={this.state.visible}
                                    >
                                        {
                                            this.state.list.length == 0 ? <Alert message="未巡路" type="info" /> :null
                                        }
                                        {
                                            this.state.drawer.map( (item,index) => <Alert className='alert-detail' key={index} message={this.state.nowYear + "-" + this.state.nowMonth + "-" + item.a + " 巡路次数：" + item.b} type="info" />)
                                        }
                                </Drawer>
                            </Col>                    
                        </Row>

                        <LocaleProvider locale={zhCN}>
                            <Calendar fullscreen={false}
                                onPanelChange={(date) => this.onCalendarChange(date)} 
                                onSelect={(date) => this.onCalendarChange(date)}
                                dateCellRender={(date) => this.dateCellRender(date)} />
                        </LocaleProvider>
                    </div>
                </Modal>
            </Row> 
        );
    }
}

export default LogCalendar;
