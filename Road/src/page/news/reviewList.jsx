/* 待审阅列表 */

import React from 'react';
import { Row, Button, message, Icon, List, Avatar, Popconfirm } from 'antd';
import { Link }     from 'react-router-dom';

import './index.scss';
import './index.less';

var str = window.location.href;//获取当前页面的完整路径信息
var imgBaseUrl = str.substring(0, str.indexOf('/',str.indexOf('/',str.indexOf('/')+ 1)+ 1) );

import $ from 'jquery';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class ReviewList extends React.Component{
    constructor(props){
      super(props);
      this.state={
        list : [],
      }
    }

    componentDidMount(){
      this.loadReviewList();
    }
    // 请求列表
    loadReviewList(){ 
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);   
              
        $.ajax({
          type        :  'post',
          url         :  '/news/approval',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            console.log('reviewList:',res);
            if(res.result === 1){
              this.setState({
                list:res.list
              });
            }else if(res.result === -1){
              message.error(res.message);
              window.location.href = '/';
            }
              
          },
          error       : err => {
              message.error(res.message);
          }
        });
    }

    onDeleteNews(newsId) {
      console.log(newsId);

      var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);   
        formData.append("newsId",newsId);  
              
        $.ajax({
          type        :  'post',
          url         :  '/news/delete',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
              console.log('deleteNews:',res);
              this.loadReviewList();
          },
          error       : err => {
              message.error(res.message);
          }
        });
    }
    cancel(e) {
      console.log(e);
    }


    delHtmlTag(str) {
      str = str.replace(/<[^>]+>/g,"");//去掉所有的html标记
      return str.replace(/&nbsp;/ig, "");//去掉所有的&nbsp;
    }

    render(){
      const listData = [];
      this.state.list.map(news => {
        listData.push({
          href: '/#/news/editNews',
          title: news.newsTitle,
          description: news.summary,
          content: news.newsBody,
          url: news.fountImgUrl,
          newsId: news.newsId,
          submitTime: news.submitTime,
        });
      })

      return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                className="news-list"
                style={{marginBottom:100}}
                // grid={{
                //   gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2,
                // }}
                pagination={{ onChange: (page) => {console.log(page);}, pageSize: 3}}
                dataSource={listData}
                renderItem={(item,index) => (
                <List.Item
                    className='news-listItem'
                    key={item.newsId}
                    actions={[
                    // <Popconfirm title="确认删除此新闻?" placement="rightBottom" onConfirm={() => this.onDeleteNews(`${item.newsId}`)} onCancel={(e) => this.cancel(e)} okText="确定" cancelText="取消"><a href="javascript:;"><Icon type="delete" style={{ marginRight: 8 }} />删除</a></Popconfirm>,

                              <Link to={ `/news/reviewNews/${item.newsId}`}><Icon type="edit" style={{ marginRight: 8 }} />审阅/编辑</Link>
                            ]}
                    // extra={<div className='news-img'><img alt="暂无图片" src={require('./2.jpg')} /></div>}
                    extra={<div className='news-img'><img alt="暂无图片" src={imgBaseUrl + item.url} /></div>}
                >
                  <List.Item.Meta className="news-listItemMeta"
                      // title={<a href={item.href} style={{color:'white'}}>{item.title}</a>}
                      title={<span style={{color:'white'}}>{item.title}</span>}
                      description={
                        <div>
                            <div className='news-description'>{item.description}</div>
                            <span className='news-time'>( {item.submitTime} )</span>
                        </div>
                      }
                      />
                  {/* <div dangerouslySetInnerHTML={{__html:item.content}}/> */}
                  <div className="news-content">{this.delHtmlTag(item.content)}</div>
                </List.Item>
                )}
            />
        </div>
      );
    }
  }

  export default ReviewList;