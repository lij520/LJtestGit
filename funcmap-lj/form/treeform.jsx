
import React from 'react';
import { Form, Input, Button, Modal, Tooltip } from 'antd';
import TreeFormTable from './treeformtable.jsx';

const FormItem = Form.Item;

export default class TreeForm extends React.Component {
    constructor(props) {
        super(props);
        const {formData,field} = this.props;
        this.state = {
            visible: false,
            value: formData[field],
            flags : 0,
        }
    };

    showDrawer() {
        this.setState({
            visible: true,
        });
    };

    onClose(selectedRows) {
        if (selectedRows) {
            //目前所有组件都只能显示一个，若以后可以再这里设置
            console.log('selectedRow',selectedRows)
            this.setState({
                value: selectedRows[0]
            },()=>{this.props.form.setFieldsValue({[this.props.field]:this.state.value},)})
            // console.log('youchuanruzhi',selectedRows)
        }
        
        // this.props.form.setFieldsValue({[this.props.field]:valueArray[0]},)
        this.setState({
            visible: false,
        });
    };
    
    componentWillReceiveProps(nextProps) {
        // console.log('nextProps',nextProps);
        if(nextProps.flag===1){
            this.props.form.resetFields();
            this.setState({value:''})
        }
    }
    //退出树modal
    onCloseModal=()=>{
        this.setState({
            visible: false,
        })
    }

    //根据新传入的formData来更新value状态
    componentWillReceiveProps(nextProps){  //组件接收新的属性时更新
        // console.log('componentWillReceiveProps',nextProps);
        const field = nextProps.field;
        const value = nextProps.formData[field];
        const flag = nextProps.flag;
        if(flag===0){
            if(this.state.value===undefined||this.state.value===''){
                this.setState({
                    value
                })
            }
        }else{
            this.setState({
                value:''
            })
        }
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {btnShow,formData,field} = this.props;
        // console.log('this.props.formData',formData)
        return (
            <FormItem
                {...this.props.formItemLayout}
                label={this.props.label}//Input显示的label
            >
                {getFieldDecorator(`${this.props.field}`, {//提交后的字段名
                    initialValue: formData[field],
                    rules: this.props.required ? [{ required: true, message: `请输入${this.props.label}!` }] : null,
                })(
                    <div>
                        <Input disabled={this.props.disabled} style={{ width: '80%' }} defaultValue={formData[field]} value={this.state.value}/>
                        <Button type="primary" shape="circle" icon="video-camera" onClick={() => this.showDrawer()} />
                        <Modal width={400}
                            destroyOnClose={true} mask={false}
                            onCancel={() => this.onClose()}
                            visible={this.state.visible}
                            style={{ bottom: 20 }}
                            footer={null}
                            title={this.props.label}
                        >
                            <div style={{ marginTop: '10px' }}>
                              {/* herhe */}
                                <TreeFormTable onClose={(e) => this.onClose(e)} btnShow = {btnShow} onCloseModal={this.onCloseModal}/>
                                {/* <SearchFormTable onClose={(e) => this.onClose(e)} btnShow = {btnShow} label={label} susertype={susertype}/> */}
                            </div>
                        </Modal>
                    </div>
                )}
            </FormItem>
        )
    }
}