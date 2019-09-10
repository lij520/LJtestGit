import React,{Component} from 'react';
import RoadBuilding from './roadBuilding.jsx';

class RoadbuildShow extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
 			<div>
                <div><span style={{fontSize:'18px',color:'#666666'}}>当前：道路建设 > </span><span style={{fontSize:'18px',color:'#666666'}}>在建项目</span></div>
                <div style={{marginTop:'30px'}}>
                    <RoadBuilding/>
                </div>
            </div>
        )
    }

}

export default RoadbuildShow;