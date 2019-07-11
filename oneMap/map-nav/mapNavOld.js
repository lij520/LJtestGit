import React, { Component } from 'react'
import './mapNav.scss'
import './mapNav.less'
import $ from 'jquery'
import { Button,Icon,Tree} from 'antd'
import { Select,Cascader } from 'antd'
const Option = Select.Option

//read the directories of all the landmark icons needed into an array 
const requireContext = require.context("./landmarks-highlight",false, /^\.\/.*\.png$/);
const navIcons = requireContext.keys().map(requireContext);

//create data for tree menu
const TreeNode = Tree.TreeNode;
const treeData = [{title:<div ><img src={navIcons[10]} alt='road-icon' height="16" width='16'/> 各级道路</div>,
   key:'0',
   children: [
    { title: <div ><img src={navIcons[10]} alt='Groad-icon' height="16" width='16'/> 国道</div>, key: 'nationalRoad' },
    { title: <div ><img src={navIcons[14]} alt='Sroad-icon' height="16" width='16'/> 省道</div>, key: 'provincialRoad' },
    { title: <div ><img src={navIcons[11]} alt='Xroad-icon' height="16" width='16'/> 县道</div>, key: 'countyRoad' },
    { title: <div ><img src={navIcons[12]} alt='Yroad-icon' height="16" width='16'/> 乡道</div>, key: 'countryRoad' },
    { title: <div ><img src={navIcons[13]} alt='Croad-icon' height="16" width='16'/> 村道</div>, key: 'villageRoad' },
  ],
}, {
  title: <div ><img src={navIcons[0]} alt='monitor-icon' height="16" width='16'/> 实时监测</div>,
  key: '1',
  children: [
    // { title: <div ><img src={require('./landmarks/Bridge1.png')} alt='bridge-icon' height="16" width='16'/> 桥梁</div>, key: '0-0-0' },
    { title: <div ><img src={navIcons[1]} alt='bridge-icon' height="16" width='16'/> 桥梁</div>, key: 'bridge' },
    { title: <div ><img src={navIcons[2]} alt='manager-icon' height="16" width='16'/> 路管员</div>, key: 'manager' },
    { title: <div ><img src={navIcons[3]} alt='culvert-icon' height="16" width='16'/> 涵洞</div>, key: 'culvert' },
    { title: <div ><img src={navIcons[4]} alt='tech-icon' height="16" width='16'/> 县道技术状况</div>, key: 'tech' },
    { title: <div ><img src={navIcons[5]} alt='tunnel-icon' height="16" width='16'/> 隧道</div>, key: 'tunnel' },

  ],
}, {
  title: <div ><img src={navIcons[6]} alt='submit-icon' height="16" width='16'/> 事件上报</div>,
  key: '2',
  children: [
    // { title: <div ><img src={navIcons[7]} alt='right-icon' height="16" width='16'/> 路产路权问题</div>, 
    //   key: '2-1' ,
    //   children:[
    //       {title:'破坏公路',key:'0101'},
    //       {title:'违章搭建',key:'0102'},
    //       {title:'乱堆乱放',key:'0103'},
    //   ]
    // },
    // { title: <div ><img src={navIcons[8]} alt='quality-icon' height="16" width='16'/> 养护质量问题</div>,
    //   key: '2-2' ,
    //   children:[
    //     {title:'养护工人未上岗',key:'0201'},
    //     {title:'道路养护质量差',key:'0202'}
    //   ]
    // },
    // { title: <div ><img src={navIcons[9]} alt='roadBridge-icon' height="16" width='16'/> 公路桥梁损毁</div>, 
    //   key: '2-3' ,
    //   children:[
    //     {title:'路基损毁',key:'0301'},
    //     {title:'路面损毁',key:'0302'},
    //     {title:'排水沟损毁',key:'0303'},
    //     {title:'涵洞损毁',key:'0304'},
    //     {title:'桥梁损毁',key:'0305'},
    //     {title:'边坡损毁',key:'0306'},
    //     {title:'安防设施损毁',key:'0307'},
    //     {title:'隧道损毁',key:'0308'}
    //   ]
    // },
    { title: <div ><img src={navIcons[9]} alt='right-icon' height="16" width='16'/> 路政类</div>, 
      key: '2-1' ,
      children:[
          {title:'违规占道',key:'1001'},
          {title:'违章搭建',key:'1002'},
          {title:'侵占公路设施',key:'1003'},
          {title:'非法营运',key:'1004'},
          {title:'超载超高',key:'1005'},
          {title:'其他',key:'1088'},
      ]
    },
    { title: <div ><img src={navIcons[7]} alt='right-icon' height="16" width='16'/> 路基</div>, 
      key: '2-2' ,
      children:[
          {title:'路基坍塌',key:'2001'},
          {title:'边坡损毁',key:'2002'},
          {title:'栏墙坍塌',key:'2003'},
          {title:'路肩杂草',key:'2004'},
          {title:'路肩堆放杂物',key:'2005'},
          {title:'边坡杂草',key:'2006'},
          {title:'边坡落石',key:'2007'},
      ]
    },
    { title: <div ><img src={navIcons[8]} alt='quality-icon' height="16" width='16'/> 路面</div>,
      key: '2-3' ,
      children:[
        {title:'路面脏污',key:'2101'},
        {title:'路面破损',key:'2102'},
        {title:'路面堆放杂物',key:'2103'},
        {title:'接缝填料缺失',key:'2104'}
      ]
    },
    { title: <div ><img src={navIcons[9]} alt='roadBridge-icon' height="16" width='16'/> 桥梁</div>, 
      key: '2-4' ,
      children:[
        {title:'附属设施损坏',key:'2201'},
        {title:'桥梁基础损坏',key:'2202'},
        {title:'桥梁下部结构损坏',key:'2203'},
        {title:'桥梁冲毁',key:'2204'},
      ]
    },
    { title: <div ><img src={navIcons[7]} alt='right-icon' height="16" width='16'/> 隧道</div>, 
      key: '2-5' ,
      children:[
          {title:'衬砌裂缝',key:'2301'},
          {title:'衬砌漏水',key:'2302'},
          {title:'隧道附属设施损坏',key:'2303'},
          {title:'其他',key:'2388'},
      ]
    },
    { title: <div ><img src={navIcons[8]} alt='quality-icon' height="16" width='16'/> 水沟涵洞</div>,
      key: '2-6' ,
      children:[
        {title:'排水堵塞',key:'2401'},
        {title:'倒塌破损',key:'2402'}
      ]
    },
    { title: <div ><img src={navIcons[9]} alt='roadBridge-icon' height="16" width='16'/> 设施、标志牌</div>, 
      key: '2-7' ,
      children:[
        {title:'标志牌损坏',key:'2501'},
        {title:'护栏损坏',key:'2502'},
        {title:'警示柱损坏',key:'2503'},
        {title:'广角镜损坏',key:'2504'},
        {title:'标线脱落',key:'2505'},
        {title:'其他',key:'2588'},
      ]
    },
  ],
}];

//create data for city selector
var options = []
var countiesOfCity=[]
// const url='http://36.250.234.57:13077'
const url = 'http://36.250.234.160:13077'
// const url = 'http://10.19.1.159:13077'
// const url=''

export class MapNav extends Component{ 
    constructor(props){
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
            location:'',
            
            //selector
            city:'',
            county:'',
            
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
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountyChange = this.handleCountyChange.bind(this);
        this.renderSelectorOptions = this.renderSelectorOptions.bind(this);
    }

    // handleClick = () =>{
    //     if(this.state.collapsed=="block"){
    //         this.setState({collapsed: 'none',IconName:'double-left',right:'-20.4%'}); 
    //         this.props.setMapCenter("none")   
    //     }else{
    //         this.setState({collapsed: 'block',IconName:'double-right',right:'0'});
    //         this.props.setMapCenter("block") 
    //     }   
        
    // }

    //Tree component
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      }
    //get the key of selected/checked features
    onCheck = (checkedKeys,e) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
        this.props.changeFeatures(checkedKeys)
    }

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', selectedKeys,info);
        this.setState({ selectedKeys });
    }

    //cascade
    onChange(value) {
        console.log(value[value.length-1]);
        this.setState({location:value[value.length-1]});
        this.props.changeLocation(value[value.length-1])
      }
    // cascade:Just show the latest item.
     displayRender(label) {
        return label[label.length - 1];
    }
    
    //selector
    handleCityChange = (value) => {
        this.setState({
          city: value,
          county:''
        });
        
        $.ajax({
            type:"get", 
            url:url+'country&cityId='+value,
            dataType:'json',
            success:
                function(data){ 
                    countiesOfCity = data 
                }, 
            error: function (e) { 
                console.log("Request error"); 
            } 
        });
        
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
            if((this.props.Groad===false&&item.key==='nationalRoad')||(this.props.Sroad===false&&item.key==='provincialRoad')||(this.props.Xroad===false&&item.key==='countyRoad')||(this.props.Yroad===false&&item.key==='countryRoad')||(this.props.Croad===false&&item.key==='villageRoad')){
                return (
                    <TreeNode  title={item.title} key={item.key} dataRef={item} disabled>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }else{
                return (
                    <TreeNode  title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
                
          }else{
            if((this.props.Groad===false&&item.key==='nationalRoad')||(this.props.Sroad===false&&item.key==='provincialRoad')||(this.props.Xroad===false&&item.key==='countyRoad')||(this.props.Yroad===false&&item.key==='countryRoad')||(this.props.Croad===false&&item.key==='villageRoad')){
                return <TreeNode {...item} disabled/>
            }else{
                return <TreeNode {...item} />;
            }
          };
        });
      }
    renderSelectorOptions = (data) =>{
        return data.map((item) => 
               <Option value={item.value} key={item.value}>{item.label}</Option>)
    }
    
    //组件即将渲染之前发送“城市”菜单数据请求
    componentWillMount(){
        let rId = this.props.roleId;
        let rgId = this.props.regionId;
        console.log(rId,rgId)
        
        let that=this;

        $.ajax({
            type:"get", 
            //url:url+'city',
            url:url+'/City/searchByUser',
            data:{roleId:rId,regionId:rgId},
            dataType:'json',
            success:
                function(data){ 
                    if(that.props.cityOrCounty==='city'){
                        options = data[0].label;

                        $.ajax({
                            type:"get", 
                            url:url+'/City/showCity',
                            data:{title:'country',cityId:rgId},
                            dataType:'json',
                            success:
                                function(res){
                                    countiesOfCity = res;
                                }, 
                            error: function () { 
                                console.log("Request error"); 
                            } 
                        });
                    }else if(that.props.cityOrCounty==='county'){//如果是大队发送实际的roleId和regionId返回的是县级的数据
                        console.log('!!!',data)
                        countiesOfCity = data[0].label;//对应县级的label
                        that.props.changeCounty(data[0].value);//对应县级的value

                        $.ajax({
                            type:"get", 
                            url:url+'/City/searchByUser',
                            data:{roleId:10,regionId:data[0].parentId},
                            dataType:'json',
                            success:
                                function(res){
                                    console.log('????',res)
                                    options=res[0].label;
                                    that.props.changeCity(res[0].value)
                                }, 
                            error: function () { 
                                console.log("Request error"); 
                            } 
                        });

                    }
        
                }, 
            error: function () { 
                console.log("Request error"); 
            } 
        });
        
        
    }

    render(){
        let countySelect=null;
        let citySelect=null;
        if(this.props.cityOrCounty==='city'){
            citySelect=(<Select placeholder="请选择城市" value={options} style={{width:'70%'}} onChange={this.handleCityChange} disabled>
                        </Select>)

            countySelect=(<Select className='mapSelector' placeholder="请选择区县" style={{width:'70%'}} onChange={this.handleCountyChange}>
                            <Option value='0' key='0'>无</Option>
                            {this.renderSelectorOptions(countiesOfCity)}
                        </Select>)
        }else if(this.props.cityOrCounty==='county'){
            citySelect=(<Select placeholder="请选择城市" value={options} style={{width:'70%'}} onChange={this.handleCityChange} disabled>
                        </Select>)

            countySelect=(<Select className='mapSelector' placeholder="请选择区县" value={countiesOfCity} style={{width:'70%'}} onChange={this.handleCountyChange} disabled>
                        </Select>)
        }
        return(
            <div id='MapNav'style={{right:this.props.right}}>
                {/* <div id='navBar'style={{display:this.state.collapsed}}> */}
                <div id='navBar'style={{right:this.props.right}}>
                    <h2>地市选择</h2>
                    {/* <Cascader
                        options={options}
                        onChange={this.onChange}
                        placeholder="请选择县市："
                        displayRender={this.displayRender}
                        defaultValue={['fuzhou','350823110001']}
                    /> */}
                    <span id='mapSelector'>
                        城市：{citySelect}
                        {/* <Select placeholder="请选择城市" defaultValue='龙岩市' style={{width:'70%'}} onChange={this.handleCityChange} disabled>
                            {this.renderSelectorOptions(options)}
                        </Select> */}
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
                    <br />
                    <br />
                </div>
                {/* <div id='buttonDiv'>
                    <Button id="navButton" type="button" onClick={this.handleClick}>
                        图层控制<Icon type={this.state.IconName} theme="outlined" />
                    </Button> 
                </div> */}
                
            </div>
        )
    }
}