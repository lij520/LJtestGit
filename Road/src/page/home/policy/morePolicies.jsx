import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import { Card, Col, Row, Button, Carousel, Modal, Icon, Collapse, notification,message,Statistic} from 'antd';

import PolicyTabs from './policyTabs.jsx';
import moment from 'moment';
import MUtil        from 'util/mm.jsx';
import $ from 'jquery';
const _mm   = new MUtil();

class MorePolicies extends Component{
    constructor(props){
        super(props);
        this.state = { 
            visible: false 
        };
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

    render() {

        return (
            <div>
                <div className="policyMore">
                    <span className="txt" onClick={() =>this.showModal()} style={{background: 'transparent',color:'#E14D04',marginTop:'4px'}}>
                        <span style={{fontSize:'15px',fontWeight:'bold'}}>更多<Icon type="double-right" theme="outlined" style={{fontSize: '15px',color:'#E14D04'}}/></span>
                    </span>
                    <Modal
                    title="当前：政策法规"
                    className="policyStyle"
                    visible={this.state.visible}
                    onOk={() => this.handleClick()}
                    onCancel={() => this.handleClick()}
                    style={{top:'110px'}}
                    >
                        <PolicyTabs/>
                    </Modal>
                </div>

            </div>
        );
    }
}


export default MorePolicies;