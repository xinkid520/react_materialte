import  axios from "axios";
// import  qs from "qs";

// axios.defaults.baseURL = 'http://139.196.77.225';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


let server={
    // get:"",
    post:""
};

server.post=function (api,date) {
    let params=date;
    console.log(params);
    return new Promise(resolve=>{
            axios.post(api,params).then((res)=>{
                resolve(res)
            })


    } )
};


// server.get=function (api,date) {
//     let params=qs.stringify(date);
//     return new Promise(resolve=>{
//         axios.get(api,params).then((res)=>{
//             resolve(res)
//         })
//     } )
// };


export default server;
