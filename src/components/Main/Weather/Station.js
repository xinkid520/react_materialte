import React, {Component} from 'react';
import {Select, Typography} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {STATIONS} from "./Stations";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Zoom from "@material-ui/core/Zoom";


class Station extends Component {

    stations = [];

    constructor(props) {
        super(props);
        this.state = {
            provincesPosition: "0",
            stationsPosition: "0",
            weight: 0
        };
    }


    render() {
        this.stations = STATIONS[this.state.provincesPosition].sub;
        return (
            <Zoom in={true}>
            <Typography style={{marginBottom: 10}} component={"div"}>
                <Select
                    value={this.state.provincesPosition}
                    onChange={this.changeProvinces}>
                    {STATIONS.map((item, index) =>
                        <MenuItem key={index} value={index}>{item.name}</MenuItem>
                    )
                    }}
                </Select>

                <Select
                    style={{marginLeft: 10, marginRight: 10}}
                    value={this.state.stationsPosition}
                    onChange={this.changeStation}>
                    {this.stations.map((item, index) =>
                        <MenuItem key={index} value={index}>{item.name}</MenuItem>
                    )
                    }}
                </Select>
                <TextField
                    // label="With normal TextField"
                    value={this.state.weight}
                    id="simple-start-adornment"
                    type={"number"}
                    onChange={this.weightsChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" style={{width: 55}}>权重：</InputAdornment>,
                        endAdornment: <InputAdornment position="end"> % </InputAdornment>,
                    }}
                />

            </Typography>
            </Zoom>
        );
    }

    changeProvinces = e => {
        this.setState({
            provincesPosition: e.target.value,
            stationsPosition:0
        });
        console.log(e.target.value);
        console.log(STATIONS[e.target.value].name);
        this.props.setProvinces(this.props.keyId, STATIONS[e.target.value].name);
        this.props.setStations(this.props.keyId, STATIONS[e.target.value].sub[0].name);
    };

    changeStation = e => {
        this.setState({
            stationsPosition: e.target.value
        });
        this.props.setStations(this.props.keyId, this.stations[e.target.value].name);
        this.props.setWmo_ids(this.props.keyId, this.stations[e.target.value].value);

    };

    weightsChange = e => {
        if (e.target.value <= 100) {
            this.setState({
                weight: e.target.value
            });
            this.props.setWeights(this.keyId, e.target.value)
        } else {
            console.log("单个站点权重不能大于100");
        }

    }
}

export default Station;
