import React from 'react';
import { Select } from 'antd';
class State extends React.Component{
    render(){
        return(
            <div > 
               <Select mode="multiple"
                placeholder="Please select"
                className="test"
               />
                 <Select mode="multiple"
                placeholder="Please select"
                className="app"
                />
            </div>
        );
    }
}

export default State;