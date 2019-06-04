import React, {Component} from 'react';
import {Typography, Zoom} from "@material-ui/core";
import Input from "@material-ui/core/es/Input/Input";

class TickInput extends Component {
    render() {

        return (
            <Zoom in={true}>
                <Typography component={"div"} color={"primary"} style={{marginBottom: 10}}>

                    &nbsp;&nbsp;触发：( {this.props.underlyingUnit} ) &nbsp;
                    <Input style={{width: 60}}
                           onChange={date=>this.props.onChangeTriggers(this.props.keyId,this.props.subkeyId,date.target.value)}
                    />
                    &nbsp;&nbsp;赔款：( 元 ) &nbsp;
                    <Input style={{width: 60}}
                           onChange={date=>
                               this.props.onChangeTicks(this.props.keyId,this.props.subkeyId,date.target.value)
                           }
                    />
                </Typography>
            </Zoom>
        );
    }
}

export default TickInput;
