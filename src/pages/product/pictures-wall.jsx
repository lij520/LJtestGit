import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import {reqDeleteImg} from '../../api/index';
import PropTypes from 'prop-types';
/*
用于图片上传的组件
*/

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends Component {
    constructor(props){
        super(props);
        let fileList =[];
        //如果传入了imgs属性
        const {imgs} = this.props;
        console.log('imgshere',imgs);
        if(imgs&&imgs.length>0){
            fileList = imgs.map((img,index)=>({
                uid : -index,
                name: img,
                status: 'done',
                url: img
            }))
        }
        this.state = {
            previewVisible: false, //标识是否显示大图预览Modaldd
            previewImage: '',  //大图的url
            fileList,
        };
    }

    //#region 不指定初始化状态
    // state = {
    //     previewVisible: false, //标识是否显示大图预览Modaldd
    //     previewImage: '',  //大图的url
    //     fileList: [
    //         // {
    //         //     uid: '-1', //每个file都有一个唯一的id，建议设置为负数
    //         //     name: 'xxx.png', //文件名
    //         //     status: 'done',  //图片的状态：done(已上传)/uploading(正在上传中)/error(失败)/removed(已删除)
    //         //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',  //图片的地址
    //         // },
    //     ],
    // };
    //#endregion
    
    //接受父组件传过来的属性
    static propTypes = {
        imgs : PropTypes.array
    }

    //用来获取所有已上传图片文件名的数组
    getImgs =()=>{
        return this.state.fileList.map(file=>file.name);
    }


    //隐藏Modal(Modal用来预览大图)
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        console.log('handlePreview()',file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        //显示指定file对应得预览图
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,  
        });
    };

    /*
    file：当前操作的图片文件（上传/删除）
    fileList:所有已上传图片文件对象的数组
    */
    handleChange =async ({file, fileList }) => {
        console.log('handleChange()',file.status,file,fileList.length)

        //一旦上传成功，将当前上传的file的信息进行修正（name，url）
        if(file.status==='done'){
            const result =  file.response ; //{status:0,data:{name:'xxx.jpg',url:'图片地址'}}
            if(result.status===0){
                message.success('图片上传成功');
                const {name,url} = result.data;
                file = fileList[fileList.length-1] 
                file.name = name;
                file.url =url;
            }else{
                message.error('图片上传失败');
            }
        }else if(file.status==='removed'){  //删除图片
            const result = await reqDeleteImg(file.name);
            if(result.status===0){
                message.success('删除图片成功')
            }else{
                message.error('删除图片失败')
            }
        }

        //在操作（上传/删除）过程中更新fileList的状态
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload"   //上传图片的接口地址
                    accept="image/*"  //只接收图片格式
                    listType="picture-card"  //上传列表的样式“text，picture，picture-card”
                    name='image' //请求参数名
                    fileList={fileList} //所有已上传图片文件对象的数组
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall;


/*
1、子组件调用父组件的方法：将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
2、父组件调用子组件的方法：
    1)再父组件中通过ref得到子组件标签对象（也就是组件对象），调用其方法(过时的方法)
    2)
*/