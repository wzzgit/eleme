export function urlParse(){
    var url = window.location.search;
    let obj = {};
    let reg= /[?&][^?&]+=[^?&]+/g;
    let arr=url.match(reg);
    if(arr){
        arr.forEach(element => {
            let temparr=element.substring(1).split('=');
            let key= decodeURIComponent(temparr[0]);
            let val = decodeURIComponent(temparr[1]);
            obj[key] = val;
        });
    }
    return obj;
}