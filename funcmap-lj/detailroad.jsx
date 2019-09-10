/**
 * 使用表格
 * 引用绝对路径 @table 文件夹下 
 */
import React, { Component } from 'react';
import { message, Button, Modal } from 'antd';
import moment from 'moment';
import NewTable from '@table/table.jsx';
import TopRowSearch from '@table/search-lj.jsx';
import { columns, detailroad } from '@table/common-lj.js';
import $ from 'jquery';
//引入地图
import MapCommon from './mapcommon.jsx';
//引入接口
import { reqAddRoadTable , reqRoaderManager} from '../../../ajax-lj/index.jsx';
//引入查询和导出窗口
import SearchForm from './form/searchform.jsx';
import ExportForm from './form/exportform.jsx';
//引入样式
import './stylemaps.scss';


import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const userAera = _mm.getStorage('user');

export default class DetailRoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1, //当前页码
            pageSize: 40, //每页条数
            total: 0,  //总条数

            data: [],  //表格数据
            spinning: false,   // 加载中
            userRegion_id: userAera.sadminarea,  //登陆者所在区域ID
            selectRow: {},  //选中的某行
            type: 'map',
            action: '',
            showModal: 0,  //0隐藏1显示查询2显示导出
            closeModal: 1, //
            
            suserkeyno2:[],//乡路长
            suserkeyno:[],//村路长
            sofficeraccount:[],//专管员
            up_down: 'up',
        }
    }

    componentWillMount() {
        // window.location.reload(true);
        this.constParams = {
            sValue: this.state.userRegion_id,
            cValue: 1,
            rValue: '',
            iValue: '',
        }
        this.searchData = '';
    }
    componentDidMount() {
        const { pageNo, pageSize } = this.state;
        this.queryData(pageNo, pageSize, this.constParams,this.searchData);  //前端分页请求数据
        this.getManagermember();
    }

    queryData = async (pageNo, pageSize, params,searchData) => {
        this.setState({ spinning: true });
        console.log('pageNo, pageSize, params,searchData',pageNo, pageSize, params,searchData)
        let lower,result;
        if (params.cValue) {
            lower = 1;
        } else {
            lower = 0;
        }
        const region_id = params.sValue, Condition = params.rValue, queryValue = params.iValue, currentPage = pageNo;
        if(searchData===''||searchData===undefined){ //初始化
            result = await reqAddRoadTable(region_id, lower, Condition, queryValue, currentPage, pageSize);
        }else{  //查询
            result = searchData ;
        } 
        
        if (result.msg === "请求成功") {
            var data = [];
            result.data.roadlist.map((item, index) => {
                data.push({
                    key: index + 1,
                    ...item,
                    squadronway: '', //路政中队
                    keyno: item.keyno, //路线标识符
                    supervisearea : item.supervisearea, //监管部门
                })
            })
            const total = result.data.total;

            this.setState({ data, total, spinning: false });

            // 当获取数据长度不为0，再一条
            if (data.length !== 0) {
                this.setState({
                    selectRow: data[0],
                },
                    () => {
                        this.onClick(this.state.selectRow);
                    });
            }
        } else {
            console.log(result.msg)
        }
    }

    //获取村路长/乡路长/专管员数据,村路长007/乡路长006/专管员010
    getManagermember=async()=>{
        const { pageNo, pageSize ,userRegion_id} = this.state;
        const resultX = await reqRoaderManager(pageNo,pageSize,"006",userRegion_id);
        const resultC = await reqRoaderManager(pageNo,pageSize,"007",userRegion_id);
        const resultM = await reqRoaderManager(pageNo,pageSize,"010",userRegion_id);
        if(resultC.msg==="请求成功"&&resultX.msg==="请求成功"&&resultM.msg==="请求成功"){
            this.setState({
                suserkeyno:resultC.data.glUserList,
                suserkeyno2:resultX.data.glUserList,
                sofficeraccount:resultM.data.glUserList,
            })
        }
    }

    onDoubleClick(row) {
        console.log("双击", row);  //弹出详情窗口
        this.onDetailTables();
    }
    onClick(row) {
        console.log("单击", row);  //定位某一条县路
        this.setState({
            selectRow: row,
        });
        this.selectForm = row;
    }
    //操作按钮（单击选中行，再点击相应操作按钮，每行数据在row中获取）
    action(action) {
        // message.info(action, .5);
        const { selectRow, pageNo, pageSize } = this.state;
        var href=window.location.href;
        var index=href.lastIndexOf("#");
        var url=href.substring(0,index);
        
        this.setState({ action })
        if (action === 'add') {  //新增
            const w = window.open('about:blank');
            w.location.href=`${url}#/detailtable/map/${action}`;
            // this.props.history.push({ pathname: '/detailtable/map', state: { action } })
        } else if (action === 'edit' || action === 'detail') { //修改、详情
            const w = window.open('about:blank');
            // this.props.history.push({ pathname: '/detailtable/map', state: { action, selectRow } })
            w.location.href=`${url}#/detailtable/map/${action}/${selectRow.keyno}`;
        } else if (action === 'search') { //查询
            this.setState({
                showModal: 1,
            })
        } else if (action === 'export') {  //导出
            this.setState({
                showModal: 2,
            })
        } else {  //刷新
            this.queryData(pageNo, pageSize, this.constParams,this.searchData);
        }
        //新建、删除、编辑后需要重新请求接口数据
        //如果删除时，最后一页只有一条数据，页码需要减一
        //或者操作完都回到第一页
    }

    onDetailTables=()=>{
        const { selectRow } = this.state;
        var href=window.location.href;
        var index=href.lastIndexOf("#");
        var url=href.substring(0,index);
        const w = window.open('about:blank');
        w.location.href=`${url}#/detailtable/map/detail/${selectRow.keyno}`;
    }

    //当页码发生变化
    onPageChange(page, pageSize) {
        //重新请求
        this.queryData(page, pageSize, this.constParams,this.searchData);
        // console.log('当前页数',page);
        this.setState({ pageNo: page });
    }

    //当pageSize发生变化
    onPageSizeChange(current, size) {
        this.setState({ pageNo: 1, pageSize: size }, () => {
            //返回第一页，并重新请求
            this.queryData(1, size, this.constParams,this.searchData);
        })
    }

    //高级查询
    onSearchChange(params) {
        console.log("查询参数：", params);
        this.setState({ userRegion_id: params.sadminarea })
    }

    //点击查找按钮
    onSearchChangeButton(params) {
        console.log("查询参数1：", params);
        const { pageNo, pageSize } = this.state;
        this.queryData(pageNo, pageSize, params);
    }

    //管理模式
    manageModel = () => {
        this.setState({
            type: 'list'
        });
    }
    //exportform和searchform的关闭、退出、取消按钮传值
    changeShowVisible = (shows) => {
        this.setState({
            closeModal: shows
        },()=>this.setState({showModal :0}))
    }

    //查找
    onSearchTable = () => {
        let that = this;
        const {pageSize,pageNo} = this.state;
        //进行表单验证，只有通过了才处理
        this.form.validateFields((err, values) => {
            if (!err) {
                //关闭modal
                this.setState({showModal :0})
                console.log('datayyyooyoyo',values);
                values['dcreatedateStart']=moment(values['dcreatedateStart']).format('YYYY-MM-DD HH:mm:ss');
                values['dcreatedateEnd']=moment(values['dcreatedateEnd']).format('YYYY-MM-DD HH:mm:ss');
                this.form.resetFields();
                $.ajax({
                    type: "post",
                    url: '/api/common/gl-road/queryRoad?current=1&pageSize=40',
                    data: values,
                    success:
                        function (data) {
                            // console.log('data',data);
                            that.queryData(pageNo,pageSize,that.constParams,data)
                        },
                    error: function (data) {
                        console.log(data.msg);
                    }
                });
            }
        })
        
    }
    //导出
    exportFormTable=()=>{
        //进行表单验证，只有通过了才处理
        let that = this,lower;
        if (that.constParams.cValue) {
            lower = 1;
        } else {
            lower = 0;
        }
       
        this.form.validateFields((err, values) => {
            if (!err) {
                //关闭modal
                this.setState({showModal :0});
                // message.success('yoyoyo,here now,煎饼果子来一套');
                window.location.href='/api/common/gl-road/exportRoad?region_id='+that.constParams.sValue+'&lower='+lower+'&Condition='+that.constParams.rValue+'&queryValue='+that.constParams.iValue
            }
        })
    }

    //地图：‘问题列表’ 显示地图表格伸缩
    listUpDown = () => {
        // console.log(this.state.up_down)
        if (this.state.up_down === 'up') {
            this.new_table.onTableUpOrDown('down')
            this.setState({
                up_down: 'down'
            })
        } else if (this.state.up_down === 'down') {
            this.new_table.onTableUpOrDown('up')
            this.setState({
                up_down: 'up'
            })
        }

    }
    //该函数在子组件didMount后被调用，父组件获取到new-table子组件的对象
    onRef = (ref) => {
        this.new_table = ref
    }
    
    render() {
        const { pageNo, pageSize, total, spinning, userRegion_id, selectRow, type, action, showModal,suserkeyno,suserkeyno2,sofficeraccount} = this.state;
        
        return (
            <div>
                <TopRowSearch
                    type={type}  //顶部高级查询样式
                    onSearchChange={(params) => this.onSearchChange(params)}
                    onSearchChangeButton={(params) => this.onSearchChangeButton(params)}
                />
                {
                    type === 'map' ? <div>
                        <div className="tributton">
                            <Button type="primary" style={{ marginRight: '5px' }} onClick={this.onDetailTables}>详细</Button>
                            <Button type="primary" style={{ marginRight: '5px' }} onClick={this.listUpDown}>路段列表</Button>
                            <Button type="primary" onClick={this.manageModel}>管理模式</Button>
                        </div>
                        <MapCommon userRegion_id={userRegion_id} selectRow={selectRow} suserkeyno={suserkeyno} suserkeyno2={suserkeyno2} sofficeraccount={sofficeraccount}/>
                    </div> : null
                }
                <NewTable
                    button={['add','edit','detail','search','export','refresh']}
                    type={type} //表格类型
                    spinning={spinning}  //加载中
                    columns={detailroad}  //表头
                    data={this.state.data}  //数据
                    pageNo={pageNo} //当前页码
                    pageSize={pageSize}  //每页条数
                    total={total}  //总数
                    onDoubleClick={(row) => this.onDoubleClick(row)}  //双击
                    onClick={(row) => this.onClick(row)}  //单击
                    action={(action) => this.action(action)}  //操作按钮
                    onPageChange={(page, pageSize) => this.onPageChange(page, pageSize)}  //页码发生变化
                    onPageSizeChange={(page, pageSize) => this.onPageSizeChange(page, pageSize)}  //每页条数发生变化
                    onRef={this.onRef}
                />
                {
                    action === 'search' ? <Modal
                        title="查询"
                        visible={showModal === 1}
                        onOk={() => this.setState({ showModal: 0 })}
                        onCancel={() => this.setState({ showModal: 0 })}
                        footer={null}
                    >
                        <SearchForm
                            setForm={(form) => { this.form = form }}
                            changeShowVisible={this.changeShowVisible}
                            onSearchTable={this.onSearchTable}
                        />
                    </Modal> : null
                }
                {
                    action === 'export' ? <Modal
                        title="导出"
                        visible={showModal === 2}
                        onOk={() => this.setState({ showModal: 0 })}
                        onCancel={() => this.setState({ showModal: 0 })}
                        footer={null}
                        width='350px'
                        style={{ height: 500 }}
                        bodyStyle={{ padding: '12px' }}
                    >
                        <ExportForm
                            setForm={(form) => { this.form = form }}
                            changeShowVisible={this.changeShowVisible}
                            exportFormTable={this.exportFormTable}
                        />
                    </Modal> : null
                }
            </div>

        );
    }
}