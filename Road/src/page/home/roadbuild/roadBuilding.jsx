import React from 'react';
import { DatePicker, Cascader, Button, Upload, Icon, Input, Select, Collapse, Table,Tabs, Row, Col,message,Modal} from 'antd';
import $ from 'jquery';
import './index.scss';
import NewRoadBuild from './newRoadbuild.jsx';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

const TabPane=Tabs.TabPane;
const Option = Select.Option;
const Panel = Collapse.Panel;

class RoadBuilding extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId : _mm.getStorage('userInfo').userId,
            token  : _mm.getStorage('userInfo').token,
            list   :[],
            data_road:[],
            //order:'',
            teamName:'请选择区域',
            roadName:'请输入关键字',
            selectRoadName:[],
            selectTeamName:[],
            checked : false,
            visible : false,
            
        }
    }
    showModal(){
        this.setState({
          visible: true,
        });
    }
    handleClick() {
        this.setState({ 
            visible:false ,
        })
    } 
    componentDidMount(){
        this.loadEventList();
    }

    onCheckchange(e) {
        this.setState({
            checked: !this.state.checked
        })
        // console.log(`checked = ${e.target.checked}`);
    }

    loadEventList(){
        console.log(this.state.userId);
        this.setState({loading:true});
        
        $.ajax({
            //type      :  'post',
            url       :  '/getRoadlistByUserId',
            type      : "GET",
            async: false,
            data      :{user_id:this.state.userId,token:this.state.token},
            success     : res => {
            
                console.log(res);
                if(res.result==-1){
                    message.error(res.message);
                    window.location.href = '/';
                }
                if(res.result==1){
                    this.setState({
                        list:res.bs
                    })
                    console.log(this.state.data_road);
                }
            },
            error : err => {
                message.error('道路建设情况请求失败!');
                    this.setState({
                        list : []
                    });
            }
        });
    }

    showConfirm(){
        return new Promise((resolve, reject) => {
            Modal.confirm({
                title: '确认删除此任务？',
                onOk() {
                    return resolve(true)
                },
                onCancel() {
                    return reject(false)
                },
            })
        })  
    }

    delete(e,record){
        console.log('userid',this.state.userId);
        this.showConfirm().then(res => {
            $.ajax({
                url: "/delete",
                type: "GET",
                data: {
                    user_id:this.state.userId,
                    road_construction_id:record.roadconstructionid,
                    token:this.state.token
                },
                success: function (res) {
                    console.log(res);
                    if(res.result==-1){
                        message.error(res.message);
                        window.location.href = '/';
                    }
                    if(res.result==1){
                        message.success("删除成功");
                        this.loadEventList();
                    }
                
                },
                error: function () {
                    message.error("删除失败");
                }
                }) 
            })
        .catch(reject => console.log('cancel'))
    }

    onExport(e){
        var jsontoXlsData=[];
        $.ajax({
            //type      :  'post',
            url       :  '/getRoadlistByUserId',
            type      : "GET",
            async: false,
            data      :{user_id:this.state.userId,token:this.state.token},
            success     : res => {
            
                console.log('res',res);
                if(res.result==-1){
                    message.error(res.message);
                    window.location.href = '/';
                }
                if(res.result==1){
                    this.setState({
                        list:res.bs
                    })
                    // console.log(this.state.data_road);
                    // var tes=[];
                    // console.log('reshdn',res.bs);
                    // localStorage.setItem("name",res.bs)
                }
            },
            error : err => {
                message.error('道路建设情况请求失败!');
                    this.setState({
                        list : []
                    });
            }
        });
        //列标题，逗号隔开，每一个逗号就是隔开一个单元格
        let str = `路段名称,负责单位,行政区域,状态,开始日期,开始时间,截止日期,截止时间, 编辑日期,编辑时间,计划时长,负责人,项目编码,项目名称,路段编码,道路图片,roadImage,roadName,roadProblem,roadShift,startPatrolTime,startTime,status,teamName,updateTime,usedDay,userName\n`;
        //增加\t为了不让表格显示科学计数法或者其他格式
        jsontoXlsData=this.state.list;
        console.log('jsondata',jsontoXlsData);
        for(let i = 0 ; i < jsontoXlsData.length ; i++ ){
            for(let item in jsontoXlsData[i]){
                str+=`${jsontoXlsData[i][item] + '\t'},`;     
            }
            str+='\n';
        }
        //encodeURIComponent解决中文乱码
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        //通过创建a标签实现
        let link = document.createElement("a");
        link.href = uri;
        //对下载的文件命名
        link.download =  "在建项目总表.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    onTeamNameValue(e){
        $.ajax({
            url       :  '/getAllTeam',
            type      : "GET",
            data      :{user_id:this.state.userId,token:this.state.token},
            success     : res => {
                //console.log(res);
                if(res.result == 1){
                console.log("mapList:",res.mapList);
                this.setState({
                    selectTeamName: res.mapList,
                });
                }
                //console.log(res);
                if(res.result==-1){
                window.location.href ='/';
                }
            },
            error       : err => {
            message.error('error!');
                this.setState({
                // team : []
                });
            }
        });
    }

    onRoadValue(e) {
        $.ajax({
            //type      :  'post',
            url       :  '/getAllRoad',
            type      : "GET",
            data      :{user_id:this.state.userId,token:this.state.token},
            success     : res => {
                //console.log(res);
                if(res.result == 1){
                //console.log("mapList:",res.mapList);
                this.setState({
                    selectRoadName: res.mapList,
                });
                }
                if(res.result == -1){
                window.location.href ='/';
                }
            },
            error       : err => {
            message.error('error!');
                this.setState({
                // team : []
                });
            }
        });
    }

    onTeamNameChange(e){
        console.log('23',e);
        this.setState({ teamName:e});
    }

    onRoadNameChange(e){
        console.log(e);
        this.setState({roadName:e});
    }

    resetting() {
        this.setState({
            teamName:'',
            roadName:'',
        });
        this.loadEventList();
    }

    onSearch() {
        $.ajax({
            url       :  '/CheckRegionAndRoad',
            type      : "GET",
            data      :{
                user_id:this.state.userId,
                token:this.state.token,
                region_id:this.state.teamName,
                road_id:this.state.roadName
            },
            success     : res => {
                if(res.result == 1){
                console.log("bs:",res.bs);
                this.setState({
                    list: res.bs,
                });
                }
                if(res.result == -1){
                window.location.href ='/';
                }
            },
            error       : err => {
            message.error('error!');
                this.setState({
                // team : []
                });
            }
        });

    }


    render() {
        const columns = [
            // {
            // title: '序号',
            // dataIndex: 'order',
            // key: 'order',
            // width:"8%",
            // render: (text, record, index) => {
            //     return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
            //     },
            // },
            {
            title: '行政区域',
            dataIndex: 'regionname',
            width: "10%",
            },
            {
            title: '路段编码',
            dataIndex: 'roadId',
            width: "10%",
            },
            {
            title: '路段名称',
            dataIndex: 'roadname',
            width: "10%",
            },{
            title: '项目名称',
            dataIndex: 'roadprojectname',
            width: "12%",
            },{
            title: '项目编码',
            dataIndex: 'roadconstructionid',
            width: "8%",
            },{
            title: '负责单位',
            dataIndex: 'team',
            width: "12%",
            },
            {
            title: '建设规模',
            dataIndex: 'roadmodal',
            width: "8%",
            },{
            title: '技术等级',
            dataIndex: 'roadlevel',
            width:"8%",
        },{
            title: '车道类型',
            dataIndex: 'roadstyle',
            width:"8%",
        },{
            title: '操作',
            dataIndex: 'operation',
            align:'center',
            render: (text, record, index) => (
            <div className="editButton">  
                <Button to= { `/roadbuild/countycheck/${record.roadId}`}>编辑 </Button>
                <Button onClick={(e)=>this.delete(e,record)}>删除 </Button>
            </div>
            ),
        }];

        const data_road=[];
            
        this.state.list.map((road,index)=>{
            let roadnames='';
            let roadLevel='';
            if((RegExp("（").test(road.roadName))||(RegExp("[\(]").test(road.roadName))){
                roadnames=road.roadName.slice(0,road.roadName.length-4);
                roadLevel=road.roadName.slice(road.roadName.length-3,road.roadName.length-1)
            }else{
                roadnames=road.roadName;
                roadLevel="道路"
            }
            data_road.push({
                key: `${index+1}`,
                regionname:road.regionName,  //行政区域
                roadname: roadnames,  //路段名称
                roadstyle:`${'四车道'}`,  //车道类型
                roadId:`${'C350823'+road.roadId}`,   //路段编码
                team:road.teamName,   //负责单位
                roadmodal:`${'中等'}`,    //建设规模
                roadlevel:`${'普通'}`,   //技术等级
                roadconstructionid:road.roadConstructionId,  //项目编码
                roadprojectname:`${'上杭县'+roadLevel+'建设'}`  //项目名称
            });            
        })
        return(
            <div>
                <Row style={{border:'1px solid #FFE9E7E8',height:'120px'}}>
                    <div style={{position:'absolute',marginTop:'15px'}} history={this.props.history}>
                        <div style={{position:'absolute',top:'0',left:'20px',width:'400px',fontSize:'17px'}} history={this.props.history}>
                            <label style={{ marginLeft:'15px' }}>行政区域</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Select placeholder="请选择区域" allowClear={true} style={{ width: 160, marginLeft:'5px' }}  value={this.state.teamName} onFocus={(e)=>this.onTeamNameValue(e)} onChange={(e)=>this.onTeamNameChange(e)} history={this.props.history}>
                                {this.state.selectTeamName.map(item=> <Option key={item.region_id}>{item.organization_name.slice(0,item.organization_name.length-3)}</Option>)}
                            </Select>
                        </div>  
                        <div style={{position:'absolute',top:'50px',left:'20px',width:'400px',fontSize:'17px'}}>
                            <label style={{ marginLeft:'15px' }}>关键字查询</label>&nbsp;&nbsp;
                            <Select  placeholder="请输入关键字" showSearch allowClear={true} style={{ width: 250, marginLeft:'5px' }} value={this.state.roadName} onFocus={(e)=>this.onRoadValue(e)}  onChange={(e)=>this.onRoadNameChange(e)}>
                                {this.state.selectRoadName.map(item=> <Option key={item.name}>{item.name}</Option>)}
                            </Select>
                        </div>
                    </div>
                    <div className="buttonCheck">
                        <Button type="primary" style={{ position:'absolute',top:'65px',left:'400px' }} onClick={()=>this.onSearch()}>查询</Button>
                        <Button type="primary" style={{ position:'absolute',top:'65px',left:'470px' }} onClick={()=> this.resetting()}>重置</Button>
                    </div>
                    <div className="buttonCheck" style={{position:'absolute',float:'right',right:'20px',marginTop:'65px'}}>
                        <div className="roadMore">
                            <span className="txt" onClick={() =>this.showModal()} style={{position:'absolute',background: 'transparent',color:'#fff',marginTop:'4px',fontSize:'15px',marginLeft:'12px'}}>
                            新&nbsp;增
                            </span>
                            <Modal
                            // title="当前：政策法规"
                            className="roadStyle"
                            visible={this.state.visible}
                            onOk={() => this.handleClick()}
                            onCancel={() => this.handleClick()}
                            style={{top:'170px'}}
                            >
                                <NewRoadBuild/>
                            </Modal>
                        </div>
                        <Button type="primary" style={{ marginLeft:'10px' }} onClick={(e)=>this.onExport(e)}>导出</Button>
                    </div>    
                </Row>
                <Row style={{marginTop:'10px',border:'1px solid #FFE9E7E8'}}>
                    <div className="tabelContent" style={{marginTop:'-10px',width:'100%',height:'94%',fontSize:'15px'}}>
                        <Table columns={columns} dataSource={data_road} bordered pagination={true} rowClassName={(record,index) => index % 2 === 0 ? "whiteRow" : "grayRow"}/>
                    </div>
                    
                </Row>
            </div>
        );
    }
}
export default RoadBuilding