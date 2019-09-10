import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
/*
用来指定商品详情的富文本编辑器组件
*/
export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        const { detail } = this.props;
        if (detail) {
            const contentBlock = htmlToDraft(detail);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }else{
            this.state = {
                editorState: EditorState.createEmpty(),
            };
        }
    }

    //接受父组件传过来的属性
    static propTypes = {
        detail: PropTypes.string
    }

    /*
    输入过程中实时回调
    */
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }

    /* 
    变换图片上传方式
    */
   uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText); //只要能获取到数据就能成功
          console.log('response',response);
          const url = response.data.url;
          resolve({data:{link:url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }


    /*
    返回输入文本的标签字符串
    */
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{ border: '1px solid black', minHeight: 200, paddingLeft: 10 }}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                      }}
                />
                {/* 显示编辑框内容的标签字符串 */}
                {/* <textarea disabled style={{ minWidth: '100%' }} value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}/> */}
            </div>
        );
    }
}

