import server from "../Util/server";
import qs from "qs"
import axios from "axios";


export const START_TIME = new Date(new Date().setDate(new Date().getDate() + 1));
export const ENDTIME = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

export const TENSOREN_BULE = "#015080";
export const _API_Create_typhoon = async function (data) {
    form();
    return await server.post("/weather/save_termsheet_weather", data, JSON);
};

export const _API_Login =  function (data) {
    json();
    return  server.post("/passport/login", data, qs);
};


function json() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
}

function form() {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
}
