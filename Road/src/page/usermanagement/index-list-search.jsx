/*
* @Author: Rosen
* @Date:   2018-01-31 20:54:10
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 21:46:52
*/
import React        from 'react';
import { Input , Select,Button,Icon} from 'antd';
import './index.less';

const InputGroup = Input.Group;
const Option = Select.Option;
class ListSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchType      : 'userId', //productId / productName
            searchKeyword   : ''
        }
    }
    // 数据变化的时候
    onValueChange(e){
        let name    = e. target.name,
            value   = e.target.value.trim();
      
        this.setState({
            [name] : value
        });
        console.log(name,value)
    }
    // 点击搜索按钮的时候
    onSearch(){
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }
    // 输入关键字后按回车，自动提交
    onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-24">
                    <div className="form-inline">
                            <Input style={{ width:'60%'}} type="text" placeholder="按用户编号查询"
                                name="searchKeyword"
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                onChange={(e) => this.onValueChange(e)}/>
                     
                      
                        <Button type="primary"  onClick={(e) => this.onSearch()}><Icon type="search" theme="outlined" />搜索</Button> 
                    </div>
                </div>
            </div>
        )
    }
}
export default ListSearch;