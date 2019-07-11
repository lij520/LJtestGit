import React from 'react';
import './stylemotion.scss';
import $ from 'jquery';

class BackMotion extends React.Component{
    componentDidMount(){

        $(function(){
            let count=0;
            for(let i=0;i<300;i++){
                ++count;
                var t=$("#points0").after("<div id = 'points"+count+"' class='circle-container'>"+"</div>");
                var vridate='#points'+count;
                $(vridate).append("<div class='circle'>"+"</div>");
            }
        });

    }
            
    render(){
        
        return(
			<div id="points0" className="circle-container">
                <div className="circle"></div>
            </div>
            
        )
    }
}

export default BackMotion;