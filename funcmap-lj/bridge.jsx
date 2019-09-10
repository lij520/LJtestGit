import React, { Component } from 'react';
import MapCommon from './mapcommon.jsx';
import './stylemaps.scss';
/**
 * 使用表格
 * 引用绝对路径 @table 文件夹下 
 */
import { message, Button } from 'antd';
import $ from 'jquery';
import NewTable from '@table/table.jsx';
import TopRowSearch from '@table/search-lj.jsx';
import { columns, bridge } from '@table/common-lj.js';
//引入接口
import { reqBridgeList } from '../../../ajax-lj/index.jsx';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const userAera = _mm.getStorage('user');

export default class Bridges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1, //当前页码
            pageSize: 40, //每页条数
            total: 100,  //总条数

            data: [],  //表格数据
            spinning: false,   // 加载中
            userRegion_id: userAera.sadminarea,  //登陆者所在区域ID
            selectRow: {},  //选中的某行
            flag: 0, //单击变为1
            up_down: 'up',
        }
    }

    componentWillMount() {
        this.constParams = {
            sValue: this.state.userRegion_id.slice(0, 6),
            cValue: 1,
            rValue: '',
            iValue: '',
        }
    }

    componentDidMount() {
        const { pageNo, pageSize } = this.state;
        this.queryData(pageNo, pageSize, this.constParams);  //前端分页请求数据
    }
    queryData = async (pageNo, pageSize, params) => {
        this.setState({ spinning: true });
        console.log('pageNo, pageSize, params', pageNo, pageSize, params)
        let lower, result;
        if (params.cValue === 1) {
            lower = true;
        } else {
            lower = false;
        }

        const region_id = params.sValue, Condition = params.rValue === '' ? 'whole' : params.rValue, queryValue = params.iValue, currentPage = pageNo;
        // message.success(region_id.slice(0,6));
        result = await reqBridgeList(region_id.slice(0, 6), lower, Condition, queryValue, currentPage, pageSize);
        console.log('result!!!!!!!!!!!!!!!', result)

        if (result.msg === "请求成功") {
            var data = [];
            result.data.glBridgeList.map((item, index) => {
                data.push({
                    key: index + 1,
                    keyno: item.keyno,
                    ...item,
                })
            })
            const total = result.data.total;

            this.setState({ data, total, spinning: false });

            // 当获取数据长度不为0，再一条
            if (data.length !== 0) {
                this.setState({
                    selectRow: data[0],
                    flag: 0,
                }
                // ,
                //     () => {
                //         this.onClick(this.state.selectRow);
                //     }
                    );
            }
        } else {
            console.log(result.msg)
        }
    }

    onDetailTables = () => {
        const { selectRow } = this.state;
        var href = window.location.href;
        var index = href.lastIndexOf("#");
        var url = href.substring(0, index);
        const w = window.open('about:blank');
        w.location.href = `${url}#/detail/bridgedetail/${selectRow.sbridgecode}`;
    }
    onDoubleClick = (row) => {
        console.log("双击", row);
        this.onDetailTables();
    }
    onClick = (row) => {
        console.log("单击", row);
        this.setState({
            selectRow: row,
            flag: 1
        })
    }
    //操作按钮（单击选中行，再点击相应操作按钮，每行数据在row中获取）
    action = (action) => {
        message.info(action, .5);

        //新建、删除、编辑后需要重新请求接口数据
        //如果删除时，最后一页只有一条数据，页码需要减一
        //或者操作完都回到第一页
    }

    //当页码发生变化
    onPageChange = (page, pageSize) => {
        //重新请求
        this.queryData(page, pageSize, this.constParams);
        // console.log('当前页数',page);
        this.setState({ pageNo: page });
    }

    //当pageSize发生变化
    onPageSizeChange = (current, size) => {
        this.setState({ pageNo: 1, pageSize: size }, () => {
            //返回第一页，并重新请求
            this.queryData(1, size, this.constParams);
        })
    }


    //高级查询
    onSearchChange = (params) => {
        console.log("查询参数：", params);
        this.setState({ userRegion_id: params.sadminarea })
    }

    //点击查找按钮
    onSearchChangeButton = (params) => {
        console.log("查询参数1：", params);
        const { pageNo, pageSize } = this.state;
        this.queryData(pageNo, pageSize, params);
    }

    //地图：‘问题列表’ 显示地图表格伸缩
    listUpDown = () => {
        console.log(this.state.up_down)
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
        const { pageNo, pageSize, total, spinning, userRegion_id, selectRow, flag } = this.state;
        const type = 'map';  //表格类型（list、map）
        return (
            <div>
                <TopRowSearch
                    type={type}  //顶部高级查询样式
                    onSearchChange={(params) => this.onSearchChange(params)}
                />
                <div>
                    <div className="tributton">
                        <Button type="primary" style={{ marginRight: '5px' }} onClick={this.onDetailTables}>详细</Button>
                        <Button type="primary" style={{ marginRight: '5px' }} onClick={this.listUpDown}>桥梁列表</Button>
                    </div>
                    <MapCommon userRegion_id={userRegion_id} selectRow={selectRow} flag={flag} />
                </div>
                <NewTable
                    type={type} //表格类型
                    spinning={spinning}  //加载中
                    columns={bridge}  //表头
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
            </div>

        );
    }
}

