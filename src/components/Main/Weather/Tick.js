import React, {Component} from 'react';
import {Button, Typography} from "@material-ui/core";
import TickInput from "./TickInput";
import Toast from "antd-mobile/lib/toast";


class Tick extends Component {
    state = {
        inputArray: [1]
    };
    render() {
        // console.log(this.props.underlyingUnit);
        return (
            <Typography color={"primary"} component={"div"}>
                <p>期间{this.props.keyId + 1}</p>

                {this.state.inputArray.map((item, index) =>
                    <TickInput
                        key={index}
                        keyId={this.props.keyId}
                        subkeyId={index}
                        underlyingUnit={this.props.underlyingUnit}
                        onChangeTicks={this.props.onChangeTicks}
                        onChangeTriggers={this.props.onChangeTriggers}
                    />)
                }

                <Button color={"primary"}
                        variant={"contained"}
                        style={{marginRight: '4px', left: 0}}
                        onClick={() => this.addTick()}>增加</Button>
                <Button color={"primary"}
                        variant={"contained"}
                    // style={{marginRight: '4px', right: 5, position: "absolute"}}
                        onClick={() => this.delTick()}>删除</Button>
            </Typography>
        );
    }

    addTick = () => {

        let arr = [...this.state.inputArray];
        arr.push(1);
        this.setState({
            inputArray: arr
        })
    };

    delTick = () => {

        let arr = [...this.state.inputArray];
        if (arr.length !== 1) {
            arr.pop();
            this.setState({
                inputArray: arr
            })
        } else {
            Toast.fail("不能删除最后一个")
        }
    };
}

export default Tick;
