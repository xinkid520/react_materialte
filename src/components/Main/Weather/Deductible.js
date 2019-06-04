import React, {Component} from 'react';
import {Radio, Typography} from "@material-ui/core";
import Input from "@material-ui/core/es/Input/Input";

class Deductible extends Component {

    state = {
        checkValue: "0",
        deductible_status: "amount",
    };

    render() {

        return (
            <Typography color={"primary"} component={"div"}>
                <Radio color={"primary"}
                       checked={this.state.checkValue === "0"}
                       onChange={this.checkChange("amount")}
                       value="0"
                       name="radio-button-demo"
                       aria-label="B"
                /> 免赔额 ：
                <Input
                    disabled={this.state.deductible_status === "radio"}
                    onChange={this.props.onChangeState("deductible_amount")}
                    value={this.props.deductible_amount}/>
                <br/>
                <Radio color={"primary"}
                       checked={this.state.checkValue === "1"}
                       onChange={this.checkChange("radio")}
                       value="1"
                       name="radio-button-demo"
                       aria-label="B"
                /> 免赔率 ：
                <Input
                    disabled={this.state.deductible_status === "amount"}
                    onChange={this.props.onChangeState("deductible_radio")}
                    value={this.props.deductible_ratio}/>

            </Typography>
        );
    }

    checkChange = status => e => {
        this.setState({
            checkValue: e.target.value,
            deductible_status: status
        });
        // eslint-disable-next-line default-case
        switch (status) {
            case "amount":
                this.props.onChangeState("deductible_radio")({target:{value:""}} );
                this.props.onChangeState("deductible_type")({target:{value:"0"}});

                break;
            case "radio":
                this.props.onChangeState("deductible_amount")({target:{value:""}});
                this.props.onChangeState("deductible_type")({target:{value:"1"}});
                break;

        }
    };


}

export default Deductible;
