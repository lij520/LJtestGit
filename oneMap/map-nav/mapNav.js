import React, { Component } from 'react'
import './mapNav.scss'
import './mapNav.less'
// import $ from 'jquery'
import { Button, Icon, Tree } from 'antd'
import { Select, Cascader } from 'antd'
import { DatePicker } from 'antd';
import PatroolLoop from './PatroolLoop.jsx';
import { reqLocation, reqEventReport } from '../../../ajax-lj/index.jsx';

const Option = Select.Option

//read the directories of all the landmark icons needed into an array 
const requireContext = require.context("./landmarks-highlight", false, /^\.\/.*\.png$/);
const navIcons = requireContext.keys().map(requireContext);

//create data for tree menu
const TreeNode = Tree.TreeNode;
const treeData = [{
    title: <div ><img src={navIcons[0]} alt='road-icon' height="16" width='16' /> 各级道路</div>,
    key: '0',
    children: [
        { title: <div ><img src={navIcons[0]} alt='Groad-icon' height="16" width='16' /> 国道</div>, key: 'nationalRoad' },
        { title: <div ><img src={navIcons[1]} alt='Sroad-icon' height="16" width='16' /> 省道</div>, key: 'provincialRoad' },
        { title: <div ><img src={navIcons[2]} alt='Xroad-icon' height="16" width='16' /> 县道</div>, key: 'countyRoad' },
        { title: <div ><img src={navIcons[3]} alt='Yroad-icon' height="16" width='16' /> 乡道</div>, key: 'countryRoad' },
        { title: <div ><img src={navIcons[4]} alt='Croad-icon' height="16" width='16' /> 村道</div>, key: 'villageRoad' },
    ],
}, {
    title: <div ><img src={navIcons[5]} alt='monitor-icon' height="16" width='16' /> 实时监测</div>,
    key: '1',
    children: [
        // { title: <div ><img src={require('./landmarks/Bridge1.png')} alt='bridge-icon' height="16" width='16'/> 桥梁</div>, key: '0-0-0' },
        { title: <div ><img src={navIcons[6]} alt='bridge-icon' height="16" width='16' /> 桥梁</div>, key: 'bridge' },
        { title: <div ><img src={navIcons[7]} alt='manager-icon' height="16" width='16' /> 路管员</div>, key: 'manager' },
        { title: <div ><img src={navIcons[8]} alt='culvert-icon' height="16" width='16' /> 涵洞</div>, key: 'culvert' },
        { title: <div ><img src={navIcons[9]} alt='tech-icon' height="16" width='16' /> 县道技术状况</div>, key: 'tech' },
        { title: <div ><img src={navIcons[10]} alt='tunnel-icon' height="16" width='16' /> 隧道</div>, key: 'tunnel' },

    ],
}, {
    title: <div ><img src={navIcons[11]} alt='submit-icon' height="16" width='16' /> 事件上报</div>,
    key: 'GG003',
},
{
    title: <div ><img src={navIcons[20]} alt='monitor-icon' height="16" width='16' /> 巡路视频</div>,
    key: 'videos',
}];

//create data for city selector
var options = ["建宁县"]
var countiesOfCity = []
var timer = []

export class MapNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //collapsed:'none',
            //IconName:"double-left",
            //right:'-20.4%',
            //Tree menu
            expandedKeys: [],
            checkedKeys: [],
            selectedKeys: [],

            //Cascade
            location: '',

            //selector
            city: '',
            county: '',
            countiesOfCitys: [],
            //date
            startValue: null,
            endValue: null,
            endOpen: false,

            options: [],
        };
        //this.handleClick = this.handleClick.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.renderTreeNodes = this.renderTreeNodes.bind(this);
        //cascade
        this.onChange = this.onChange.bind(this);
        this.displayRender = this.displayRender.bind(this);
        //selector

        this.renderSelectorOptions = this.renderSelectorOptions.bind(this);

        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.onChanges = this.onChanges.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.handleStartOpenChange = this.handleStartOpenChange.bind(this);
        this.handleEndOpenChange = this.handleEndOpenChange.bind(this);
        this.onTransfor = this.onTransfor.bind(this);
    }


    //Tree component
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        }, () => { 
            const {expandedKeys}=this.state
            if(expandedKeys.length!==0){
                this.loadData(expandedKeys) 
            }
        });
    }

    //get the key of selected/checked features
    onCheck = (checkedKeys, e) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
        this.props.changeFeatures(checkedKeys)
    }

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', selectedKeys, info);
        this.setState({ selectedKeys });
    }

    //cascade
    onChange = (value) => {
        console.log(value[value.length - 1]);
        this.setState({ location: value[value.length - 1] });
        this.props.changeLocation(value[value.length - 1])
    }
    // cascade:Just show the latest item.
    displayRender = (label) => {
        return label[label.length - 1];
    }


    //date
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChanges = (field, value) => {
        this.setState({
            [field]: value,
        });
        timer.push(value);
        if (timer.length === 2) {
            this.props.handleChangeTimer(timer);
            console.log('field,value', timer);
        } else {
            console.log('11111');
        }
        // console.log('field,value',timer);
    }

    onStartChange = (value) => {
        this.onChanges('startValue', value);
    }

    onEndChange = (value) => {
        this.onChanges('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    //巡路轨迹
    onTransfor = (chafes) => {
        this.setState({
            currentfes: chafes
        })
        this.props.handleChangeRoad(chafes);
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                if ((this.props.Groad === false && item.key === 'nationalRoad') || (this.props.Sroad === false && item.key === 'provincialRoad') || (this.props.Xroad === false && item.key === 'countyRoad') || (this.props.Yroad === false && item.key === 'countryRoad') || (this.props.Croad === false && item.key === 'villageRoad')) {
                    return (
                        <TreeNode title={item.title} key={item.key} dataRef={item} disabled>
                            {this.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                } else {
                    return (
                        <TreeNode title={item.title} key={item.key} dataRef={item}>
                            {this.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }

            } else {
                if ((this.props.Groad === false && item.key === 'nationalRoad') || (this.props.Sroad === false && item.key === 'provincialRoad') || (this.props.Xroad === false && item.key === 'countyRoad') || (this.props.Yroad === false && item.key === 'countryRoad') || (this.props.Croad === false && item.key === 'villageRoad')) {
                    return <TreeNode {...item} disabled />
                } else {
                    return <TreeNode {...item} />;
                }
            };
        });
    }
    renderSelectorOptions = (data) => {
        return data.map((item) =>
            <Option value={item.value} key={item.value}>{item.label}</Option>)
    }

    componentDidMount() {
        //获取登陆者的区域
        this.getRegion();
        this.getFormTree(treeData[2].key);
    }

    //建立第二层树
    initOptions = async (categorys) => {
        const options = categorys.map((item, index) => ({
            title: <div ><img src={navIcons[12 + index]} alt='right-icon' height="16" width='16' /> {item.scodename}</div>,
            key: item.keyno,
            isLeaf: false,
        }));

        this.setState({
            options
        }, () => treeData[2].children = this.state.options);
    }

    //建立第三、四层树
    loadData = (item) => {
        // console.log(item[item.length - 1])
        const {options} = this.state;
        var targetOption;

        if(item[item.length - 1].length===11){ //第四层树
            const promise = this.getFormTree(item[item.length - 1]);
            // console.log(promise);
            promise.then(response => {
                if(response!==undefined){
                    const childrenOptions = response.map(items => ({
                        title: items.scodename,
                        key: items.keyno,
                        isLeaf: true,
                    }))
                    // console.log('this.state.options',options)
                    targetOption = options[0].children.find(option=>option.key===item[item.length - 1]);
                    targetOption.children = childrenOptions;
                }else{
                    targetOption = options[0].children.find(option=>option.key===item[item.length - 1]);
                    targetOption.isLeaf = true;
                }
                this.setState({option:[...this.state.options]});
            })
        }else if(item[item.length - 1]!=="GG003"&&item[item.length - 1].length!==1){ //第三层树
            const cate = this.getFormTree(item[item.length - 1]);
            // console.log('cate', cate);
            cate.then(response => {
                const childrenOption = response.map((items, index) => ({
                    title: items.keyno.slice(0,8) === "GG003001" ? <div ><img src={navIcons[15 + index]} alt='right-icon' height="16" width='16' /> {items.scodename}</div> : items.scodename,
                    key: items.keyno,
                    isLeaf: items.keyno.slice(0,8) === "GG003001" ? false : true,
                }))
                // console.log('this.state.options',options)
                targetOption = options.find(option=>option.key===item[item.length - 1]);
                targetOption.children = childrenOption;
                this.setState({option:[...this.state.options]});
            })
        }else {
            console.log('HREHER');
        }
    }

    //获取事件上报树
    getFormTree = async (expandkey) => {
        const result = await reqEventReport(expandkey);
        // console.log('result',result);
        if (result.msg === "请求成功" && result.data.length !== 0) {
            const categorys = result.data;
            if (expandkey === 'GG003') {
                this.initOptions(categorys); //构建第二层树
            } else {
                return categorys; //再下层
            }
        } else {
            console.log(result.msg)
        }
    }

    //获取所在区域
    getRegion = async () => {
        let token = this.props.token;
        const result = await reqLocation(token);
        console.log('tredfs', result)
        if (result.msg === "请求成功") {
            const countiesOfCitys = result.data[0].scodeName;
            this.setState({ countiesOfCitys });
        }
    }

    componentDidUpdate() {
        // console.log(navIcons);
        console.log('collapse!!!!!!!', this.props.collapse);
        if (this.props.collapse === "none") {
            document.getElementById("MapNav").style.display = "none";
            document.getElementById("navBar").style.display = "none";

        } else {
            document.getElementById("MapNav").style.display = "block";
            document.getElementById("navBar").style.display = "block";
        }

    }
    render() {
        let countySelect = null;
        let citySelect = null;

        const { startValue, endValue, endOpen, countiesOfCitys } = this.state;

        console.log('countiesOfCitys', countiesOfCitys);

        if (this.props.cityOrCounty === 'city') {
            citySelect = (<Select placeholder="请选择城市" value={options} style={{ width: '70%' }} onChange={this.handleCityChange} disabled>
            </Select>)

            countySelect = (<Select className='mapSelector' placeholder="请选择区县" style={{ width: '70%' }} onChange={this.handleCountyChange}>
                <Option value='0' key='0'>无</Option>
                {this.renderSelectorOptions(countiesOfCity)}
            </Select>)
        } else if (this.props.cityOrCounty === 'county') {
            citySelect = (<Select placeholder="请选择城市" value={options} style={{ width: '70%' }} onChange={this.handleCityChange} disabled>
            </Select>)

            countySelect = (<Select className='mapSelector' placeholder="请选择区县" value={countiesOfCitys} style={{ width: '70%' }} onChange={this.handleCountyChange} disabled>
            </Select>)
        }
        return (
            <div id='MapNav' /* style={{right:this.props.right}} */ style={{ right: '0px', display: 'none' }}>
                {/* <div id='navBar'style={{display:this.state.collapsed}}> */}
                <div id='navBar' /* style={{right:this.props.right}} */>
                    <h2>地市选择</h2>
                    <span id='mapSelector'>
                        城市：{citySelect}
                    </span>
                    <br />
                    <br />
                    <span id='mapSelector'>
                        区县：{countySelect}
                    </span>

                    <br />
                    <br />
                    <h2>地物选择</h2>
                    <Tree
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={false}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                    >
                        {this.renderTreeNodes(treeData)}
                    </Tree>
                    <br />

                    {/* <h2>巡路轨迹</h2>
                    <div calss="patrollRoad">
                        开始时间：
                        <DatePicker
                        disabledDate={this.disabledStartDate}
                        format="YYYY-MM-DD"
                        value={startValue}
                        placeholder="请选择日期"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                        />
                        <br/>
                        结束时间：
                        <DatePicker
                        disabledDate={this.disabledEndDate}
                        format="YYYY-MM-DD"
                        value={endValue}
                        placeholder="请选择日期"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                        />
                    </div>
                    <PatroolLoop  onTransfor={this.onTransfor} /> */}
                    <br />
                </div>

            </div>
        )
    }
}