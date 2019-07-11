import React, { Component } from 'react'
import './mapNav.scss'
import './mapNav.less'
import $ from 'jquery'
import { Button, Icon, Tree, message } from 'antd'
import { Select, Cascader } from 'antd'
import menuList from './menuConfig.jsx';
import { reqgetCity, reqgetCountry, reqgetCounty } from '../api/index.jsx';

const Option = Select.Option
const { TreeNode } = Tree;

//create data for city selector
var options = []
var countiesOfCity = []

export class MapNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            checkedKeys: [],
            selectedKeys: [],

            //Cascade
            location: '',

            //selector
            city: '',
            county: '',

        };
        this.onExpand = this.onExpand.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.renderTreeNodes = this.renderTreeNodes.bind(this);
        //cascade
        this.onChange = this.onChange.bind(this);
        this.displayRender = this.displayRender.bind(this);
        //selector
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountyChange = this.handleCountyChange.bind(this);
        this.renderSelectorOptions = this.renderSelectorOptions.bind(this);
        this.getCity = this.getCity.bind(this);
    }

    //Tree component
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        this.setState({
            expandedKeys,
            autoExpandParent: false,
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
    onChange(value) {
        console.log(value[value.length - 1]);
        this.setState({ location: value[value.length - 1] });
        this.props.changeLocation(value[value.length - 1])
    }
    // cascade:Just show the latest item.
    displayRender(label) {
        return label[label.length - 1];
    }

    //selector
    handleCityChange = async (value) => {
        this.setState({
            city: value,
            county: ''
        });

        const result = await reqgetCounty(value);
        if (result) {
            countiesOfCity = result;
        } else {
            message.error('获取数据失败');
        }

        this.props.changeCity(value);
        this.props.changeCounty('');
        alert('请选择区县，如果不需要选择，请选择“无”');
    }
    handleCountyChange = (value) => {
        this.setState({
            county: value,
        });
        this.props.changeCounty(value)
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

    getCity = async () => {
        let rId = this.props.roleId;
        let rgId = this.props.regionId;
        // console.log(rId, rgId);

        let that = this;
        const result = await reqgetCity(rId, rgId);
        if (result) {
            if (that.props.cityOrCounty === 'city') {
                options = result[0].label;
                const county = await reqgetCountry('country', rgId);
                if (county) {
                    countiesOfCity = county;
                } else {
                    message.error('数据获取失败');
                }
            } else if (that.props.cityOrCounty === 'county') {
                countiesOfCity = result[0].label;
                that.props.changeCounty(result[0].value);
                const citys = await reqgetCity('10', result[0].parentId);
                if (citys) {
                    options = citys[0].label;
                    that.props.changeCity(citys[0].value);
                } else {
                    message.error('数据获取失败');
                }
            }
        } else {
            message.error('数据获取失败');
        }
    }

    //组件即将渲染之前发送“城市”菜单数据请求
    componentWillMount() {
        this.getCity();
    }

    render() {
        let countySelect = null;
        let citySelect = null;
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

            countySelect = (<Select className='mapSelector' placeholder="请选择区县" value={countiesOfCity} style={{ width: '70%' }} onChange={this.handleCountyChange} disabled>
            </Select>)
        }
        return (
            <div id='MapNav' style={{ right: this.props.right }}>
                <div id='navBar' style={{ right: this.props.right }}>
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
                        {this.renderTreeNodes(menuList)}
                    </Tree>
                    <br />
                    <br />
                    <br />
                </div>

            </div>
        )
    }
}