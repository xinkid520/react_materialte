import server from "./server";
import axios from "axios";

export const _API_Create_typhoon = async function (data) {
    json();
    return await server.post("/weather/save_termsheet_weather", data);
};

export const _API_Login = function (data) {
    form();
    return server.post("/passport/login", data);
};


function form() {
    // axios.defaults.proxy.auth="http://139.196.77.225";
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
}



function json() {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
}
