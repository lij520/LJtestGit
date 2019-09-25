import React, { Component } from 'react';
import { Select, Button } from 'antd';
import './index.scss';
import PropTypes from 'prop-types';
const Option = Select.Option;

//UI组件：主要做显示与用户交互，代码中没有任何redux相关代码
export default class Counter extends Component {

    static propTypes = {
        count :PropTypes.number.isRequired,
        increment : PropTypes.func.isRequired,
        decrement : PropTypes.func.isRequired,
        incrementAsync : PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue: "1"
        }
        this.number = this.state.selectValue*1;
    }
    handleChange = (value) => {
        this.setState({ 
            selectValue: value 
        },()=>this.number=this.state.selectValue*1)
    }

    Increment = () => {
        console.log(this.number)
        this.props.increment(this.number);
    }

    Decrement = () => {
        this.props.decrement(this.number);
    }

    incrementifOdd = () => {
        if (this.props.count % 2 === 1) {
            this.props.increment(this.number);
        }
    }

    incrementAsync = () => {
        // setTimeout(() => {
        //     this.props.increment(this.number);
        // }, 1000)

        //在action中进行异步操作
        this.props.incrementAsync(this.number);
    }


    render() {
        const { selectValue} = this.state;
        const count = this.props.count;
        return (
            <div id='redux' className="redux">
                <p>click {count} times</p>
                <div>
                    <Select defaultValue={selectValue} style={{ margin: '0px 15px' }} onChange={this.handleChange}>
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