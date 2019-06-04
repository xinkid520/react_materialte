import React, {Component} from 'react';
import {Typography} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/es/Input/Input";

class Limit extends Component {

    render() {
        return (
            <Typography component={"div"} color={"primary"}>
                事件次数：
                <Select
                    value={this.props.limitNo}
                    onChange={this.props.onChangeState("event_number_covered")}>
                    <MenuItem value={0}>所有</MenuItem>
                    <MenuItem value={1}>最大1次</MenuItem>
                    <MenuItem value={2}>前面1次</MenuItem>
                    <MenuItem value={3}>前面2次</MenuItem>
                    <MenuItem value={4}>前面3次</MenuItem>

                </Select>
                <br/>
                保单限额：<Input onChange={this.props.onChangeState("limit")}/>元
            </Typography>
        );
    }
}

export default Limit;
