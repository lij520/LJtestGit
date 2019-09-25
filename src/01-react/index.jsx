import React ,{Component} from 'react';
import { Select, Button} from 'antd';
import './index.scss';

const Option = Select.Option;

export default class ReduxT extends Component{
    constructor(props){
        super(props);
        this.state={
            count : 0,
            selectValue : "1"
        }
        this.number = this.state.selectValue * 1;
    }
    handleChange=(value)=>{
        // console.log(`selected ${value}`);
        this.setState({
            selectValue:value
        },()=>this.number=this.state.selectValue*1)
    }

    Increment=()=>{
        this.setState(state=>({count : state.count + this.number}))
    }

    Decrement=()=>{
        this.setState(state=>({count : state.count - this.number}))
    }

    incrementifOdd=()=>{
        if(this.state.count % 2===1){
            this.setState(state=>({count : state.count + this.number}))
        }
    }

    incrementAsync=()=>{
        setTimeout(()=>{
            this.setState(state=>({count : state.count + this.number}))
        },1000)
    }
    render(){
        const {count,selectValue} = this.state;

        return(
            <div className="redux">
                <p>click {count} times</p>
                <div>
                    <Select defaultValue={selectValue} style={{margin:'0px 15px'}} onChange={this.handleChange}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                    </Select>
                    <Button type="primary" onClick={this.Increment}>+</Button>
                    <Button type="primary" onClick={this.Decrement}>-</Button>
                    <Button type="primary" onClick={this.incrementifOdd}>Increment if odd</Button>
                    <Button type="primary" onClick={this.incrementAsync}>Increment aysnc</Button>
                </div>
            </div>
        )
    }
}