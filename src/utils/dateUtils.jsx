
//获取本地时间
export function formateDate(time) {
    if (!time) return '';
    let date = new Date(time);
    let dateGetHours, dateGetMinutes, dateGetSeconds;

    dateGetHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    dateGetMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    dateGetSeconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + dateGetHours + ':' + dateGetMinutes + ':' + dateGetSeconds;
}

//时间戳与日期的转换
export function TranFormatDate(nowtime) {
    if(!nowtime) return '';
    let now = new Date(nowtime);
    // return now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();

    var year = now.getFullYear();
    var month = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1);
    var date = (now.getDate() < 10 ? '0' + now.getDate() : now.getDate());
    var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}