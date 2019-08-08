import React, {Component} from 'react';
import logo from "../../statics/images/logo.png";
import {Button} from "@material-ui/core";
import ReactDOM from "react-dom";
import Login from "../User/Login";
import Weather from "./Weather/Weather";

import Cookies from "react-cookies"
import withStyles from "@material-ui/core/styles/withStyles";
import {_API_Create_typhoon} from "../../server/APInterface";


const styles = theme => ({
    button: {
        width: "50%",
        fontSize: "20px"
    }, byttonContent: {
        margin: 10
    }
});


class Main extends Component {


    render() {
        const classes = styles();
        return (
            <div>
                <img
                    src={logo}
                    alt={"天韧科技"}
                    style={{
                        margin: "0 auto",
                        display: "flex",
                        marginTop: 50,
                        padding: 20,
                        width: "50%"
                    }}/>
                <div style={classes.byttonContent}>
                    <Button color={"primary"} style={classes.button} onClick={this.weatherClick}>天气</Button>
                    <Button color={"primary"} style={classes.button} onClick={this.typhoonClick}>台风</Button>
                </div>
                <div style={classes.byttonContent}>
                    <Button color={"primary"} style={classes.button} disabled>保险+期货</Button>
                    <Button color={"primary"} style={classes.button} disabled>洪涝</Button>
                </div>
                <div style={classes.byttonContent}>
                    <Button color={"primary"} style={classes.button} disabled>径流</Button>
                    <Button color={"primary"} style={classes.button} disabled>植被</Button>
                </div>
                <div style={classes.byttonContent}>
                    <Button color={"primary"} style={classes.button} disabled>产量</Button>
                    <Button color={"primary"} style={classes.button} disabled>收入</Button>
                </div>
                <div style={classes.byttonContent}>
                    <Button color={"primary"} style={classes.button} disabled>比例分保</Button>
                    <Button color={"primary"} style={classes.button} disabled>超额分保</Button>
                </div>

            </div>
        );
    }

    weatherClick = () => {
        let orderNo = (Cookies.load('user')).indexOf(";");
        let username = Cookies.load("user").substr(0, orderNo);
        let data = {
            user_name: username,
            submission_id: 0,
            underlying: "TempMax",
            underlying_upper_threshold: 9999.9999,
            underlying_lower_threshold: 0.0,
            underlying_type: 0,
            trigger_type: 0,
            deductible_type: 0,
            deductible_amount: 0.0,
            deductible_ratio: 0.0,
            limit: 9999.9999,
            event_number_covered: 0,

        };
        const res = _API_Create_typhoon(data);
        if (res.value !== "")
            ReactDOM.render(<Weather/>, document.getElementById('root'));
    };

    typhoonClick = () => {
        ReactDOM.render(<Login/>, document.getElementById('root'));
    };
}


export default withStyles(styles)(Main);
