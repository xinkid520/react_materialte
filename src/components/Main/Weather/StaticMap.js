import React from "react";
import {Map} from 'react-amap';


/*
 ps:{
    react-amap (api地址) : https://elemefe.github.io/react-amap/
 }
*/

export default class StaticMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapZoom: 10, //地图缩放等级 （zoom）
            // https://lbs.amap.com/api/javascript-api/guide/abc/prepare这里有介绍key怎么申请
            mapKey: 'dcc32493c11e4454acf738dd7f310afc',//Key
            status: {
                zoomEnable: true,
                dragEnable: true,
            },
            // mapCenter:[116.292329, 39.946996],//地图中心点
            // mapMake :[116.273961, 39.946338],//marker标记点
        };
    }

    componentDidMount() {

    }

    render() {
        let {
            mapCenter
            // , mapMake
            , mapZoom, mapKey, status
        } = this.state;
        return <div style={{width: '100%', height: '300px'}}>
            {/*地图创建必有参数 （key，中心点，zoom等级）*/}
            <Map amapkey={mapKey}
                 center={mapCenter}
                 zoom={mapZoom}
                 status={status}>
                {/*marker标记点创建必有参数 （position中心点）*/}
                {/*<Marker position={mapMake}/>*/}
            </Map>
        </div>
    }
}
