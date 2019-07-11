import React,{Component} from 'react';
import {Row,Col} from 'antd';

class RoadbuildShow extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div style={{height:'100%'}}>
                <div style={{width:'100%',float:'left',backgroundColor:'red'}}>当前：道路建设 > <div style={{color:'blue'}}>在建项目</div></div>
                <div style={{height:'100%',}}>
                    <Row style={{height:''}}>

                    </Row>
                    <Row style={{height:''}}>

                    </Row>
                </div>
            </div>
        )
    }

}

export default RoadbuildShow;