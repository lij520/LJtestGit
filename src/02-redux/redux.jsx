import React, { Component } from 'react';
import { Select, Button } from 'antd';
import './index.scss';
import PropTypes from 'prop-types';

import { increment, decrement } from './actions'


const Option = Select.Option;

export default class ReduxTS extends Component {

    static propTypes = {
        store : PropTypes.object.isRequired,
        newRender : PropTypes.func.isRequired,
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
        this.props.store.dispatch(increment(this.number));
        this.props.newRender();
    }

    Decrement = () => {
        this.props.store.dispatch(decrement(this.number));
        this.props.newRender();
    }

    incrementifOdd = () => {
        const count = this.props.store.getState().count;
        if (count % 2 === 1) {
            this.props.store.dispatch(increment(this.number));
            this.props.newRender();
        }
    }

    incrementAsync = () => {
        setTimeout(() => {
            this.props.store.dispatch(increment(this.number));
            this.props.newRender();
        }, 1000)
    }

    componentWillMount(){
        this.props.newRender();
    }

    render() {
        const { selectValue} = this.state;
        const count = this.props.store.getState().count;
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

