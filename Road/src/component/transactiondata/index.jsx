// import React from 'react';
// import MUtil        from '../../util/mm.jsx';
// import  AppActivityService     from '../../service/appactivity-service';

// const _mm           = new MUtil();
// const _appactivityservice     = new AppActivityService();

// class TransactionData extends React.Component{
//     render(){

//         loadAppActivityData(){

//         }   
//         getAppActivityData(){

//                 _appactivityservice.getAppActivityData({
                   
//                 }).then(res => {
//                     _mm.successTips(res);
//                     this.loadAppActivityData();
//                 }, errMsg => {
//                     _mm.errorTips(errMsg);
//                 });
            
//         }
//         return(
//             <div > 
//                 <div className="panel panel-default">
//                     <div className="panel-heading">
//                     <h3 className="panel-title">Panel title</h3>
//                     </div>
//                     <div className="panel-body">
//                         Panel content
//                     </div>
//                 </div> 
//             </div>
//         );
//     }
// }

// export default TransactionData;