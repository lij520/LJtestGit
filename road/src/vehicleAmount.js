import React, {Component} from 'react';
import './vehicleAmount.scss';
import largeTransport from './vehicleIcons/luyun.png';
import smallTransport from './vehicleIcons/xiaoxin.png';
import miniTransport from './vehicleIcons/weixin.png'

class VehicleAmount extends Component{
    componentDidMount(){

    }
    render(){
        return(
            <div style={{width:'100%'}}>
                <div className='title'>
                    <div className='col-1 title-col '> 汽车类型</div>
                    <div className='col-2 title-col '>客运数</div>
                    <div className='col-3 title-col '>货运数</div>
                </div>
                
                <div className='large-transport'>
                    <div id='edge-dot' style={{top:'-3px',left:'-3px'}}></div>
                    <div id='edge-dot' style={{top:'-3px',right:'-3px'}}></div>
                    <div id='edge-dot' style={{bottom:'-3px',right:'-3px'}}></div>
                    <div id='edge-dot' style={{bottom:'-3px',left:'-3px'}}></div>
                    <div className='col-1 large-col '>
                        <div className='img' style={{flex:'1'}}><img src={largeTransport} width={40}></img></div> 
                        <div style={{flex:'2'}}>大中型</div>
                    </div>
                    <div className='col-2 large-col col-frame'>
                        <div className='small-box small-box-left'>58 278 辆
                            <div id='edge-left' style={{top:'0',left:'0',borderStyle:'solid none none solid'}}></div>
                            <div id='edge-left' style={{top:'0',right:'0',borderStyle:'solid solid none none'}}></div>
                            <div id='edge-left' style={{bottom:'0',right:'0',borderStyle:'none solid solid none'}}></div>
                            <div id='edge-left' style={{bottom:'0',left:'0',borderStyle:'none none solid solid'}}></div>
                        </div>
                    </div>
                    <div className='col-3 large-col col-frame'>
                        <div className='small-box small-box-right'>136 379 辆
                            <div id='edge-right' style={{top:'0',left:'0',borderStyle:'solid none none solid'}}></div>
                            <div id='edge-right' style={{top:'0',right:'0',borderStyle:'solid solid none none'}}></div>
                            <div id='edge-right' style={{bottom:'0',right:'0',borderStyle:'none solid solid none'}}></div>
                            <div id='edge-right' style={{bottom:'0',left:'0',borderStyle:'none none solid solid'}}></div>
                        </div>
                    </div>
                </div>
                
                <div className='small-transport'>
                    <div id='edge-dot' style={{top:'-3px',left:'-3px'}}></div>
                    <div id='edge-dot' style={{top:'-3px',right:'-3px'}}></div>
                    <div id='edge-dot' style={{bottom:'-3px',right:'-3px'}}></div>
                    <div id='edge-dot' style={{bottom:'-3px',left:'-3px'}}></div>
                    <div className='col-1 small-col '>
                        <div className='img' style={{flex:'1'}}><img src={smallTransport} width={40}></img></div> 
                        <div style={{flex:'2'}}>小型</div>
                    </div>
                    <div className='col-2 small-col col-frame'>
                        <div className='small-box small-box-left'>4 767 594 辆
                            <div id='edge-left' style={{top:'0',left:'0',borderStyle:'solid none none solid'}}></div>
                            <div id='edge-left' style={{top:'0',right:'0',borderStyle:'solid solid none none'}}></div>
                            <div id='edge-left' style={{bottom:'0',right:'0',borderStyle:'none solid solid none'}}></div>
                            <div id='edge-left' style={{bottom:'0',left:'0',borderStyle:'none none solid solid'}}></div>
                        </div>
                    </div>
                    <div className='col-3 small-col col-frame'>
                        <div className='small-box small-box-right'>21 236 辆
                            <div id='edge-right' style={{top:'0',left:'0',borderStyle:'solid none none solid'}}></div>
                            <div id='edge-right' style={{top:'0',right:'0',borderStyle:'solid solid none none'}}></div>
                            <div id='edge-right' style={{bottom:'0',right:'0',borderStyle:'none solid solid none'}}></div>
                            <div id='edge-right' style={{bottom:'0',left:'0',borderStyle:'none none solid solid'}}></div>
                        </div>
                    </div>
                </div>
                
                <div className='mini-transport'>
                    <div id='edge-dot' style={{top:'-3px',left:'-3px'}}></div>
                    <div id='edge-dot' style={{top:'-3px',right:'-3px'}}></div>
                    <div id='edge-dot' style={{bottom:'-3px',right:'-3px'}}></div>
                    <div id='edge-dot' style={{bottom:'-3px',left:'-3px'}}></div>
                    <div className='col-1 mini-col '>
                        <div className='img' style={{flex:'1'}}><img src={miniTransport} width={40}></img></div> 
                        <div style={{flex:'2'}}>微型</div>
                    </div>
                    <div className='col-2 mini-col col-frame'>
                        <div className='small-box small-box-left'>38 753 辆
                            <div id='edge-left' style={{top:'0',left:'0',borderStyle:'solid none none solid'}}></div>
                            <div id='edge-left' style={{top:'0',right:'0',borderStyle:'solid solid none none'}}></div>
                            <div id='edge-left' style={{bottom:'0',right:'0',borderStyle:'none solid solid none'}}></div>
                            <div id='edge-left' style={{bottom:'0',left:'0',borderStyle:'none none solid solid'}}></div>
                        </div>
                    </div>
                    <div className='col-3 mini-col col-frame'>
                        <div className='small-box small-box-right'>2 353 辆
                            <div id='edge-right' style={{top:'0',left:'0',borderStyle:'solid none none solid'}}></div>
                            <div id='edge-right' style={{top:'0',right:'0',borderStyle:'solid solid none none'}}></div>
                            <div id='edge-right' style={{bottom:'0',right:'0',borderStyle:'none solid solid none'}}></div>
                            <div id='edge-right' style={{bottom:'0',left:'0',borderStyle:'none none solid solid'}}></div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default VehicleAmount;