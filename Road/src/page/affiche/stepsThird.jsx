//完成发布
import React from 'react';
import './index.scss'

class StepsThird extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isSubmit: this.props.isSubmit,
        }
    }

    render(){
        console.log(this.state.isSubmit);
        return(
          	<div className='steps-third-tip'>
            {
                this.state.isSubmit == 1
                ?  <h1 style={{textAlign:'center'}}>通知已发布!</h1>
                :  <h1 style={{textAlign:'center'}}>通知发布失败!</h1>
            }
            {
                this.state.isSubmit == 1
                ?  <h2>如需发布新通知，请点击“继续发布”。</h2>
                : ''
            }
               
                 
            </div>   
        );
    }
}

export default StepsThird;
