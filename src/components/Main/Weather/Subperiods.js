import React, {Component} from 'react';
// import DatePicker from "antd-mobile/lib/date-picker";
// import List from "antd-mobile/lib/list";
import {Typography, Zoom} from "@material-ui/core";
import {ENDTIME, START_TIME} from "../../Const";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const  styles={
    text:{
        marginLeft:3,
        marginRight:3
    }
};

class Subperiods extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subperiods_start: START_TIME,
            subperiods_end: ENDTIME,
        }
    }

    render() {

        return (
            <Zoom in={true}>
                <Typography component={"div"} style={{marginBottom: 10}}>
                    期间{this.props.keyId + 1}
                    {/*<List className="date-picker-list" style={{backgroundColor: 'white'}}>*/}


                    {/*    <DatePicker*/}
                    {/*        mode="date"*/}
                    {/*        title="开始日期"*/}
                    {/*        extra="选择"*/}
                    {/*        value={this.state.subperiods_start}*/}
                    {/*        // onChange={date => this.setState({startTime: date})}*/}
                    {/*        onChange={date => {*/}

                    {/*            this.props.allStartTime(this.props.keyId, date);*/}
                    {/*            this.setState({subperiods_start: date,})*/}
                    {/*        }}*/}
                    {/*        minDate={new Date(new Date().setDate(new Date().getDate() + 1))}*/}
                    {/*        maxDate={new Date(2049, 1, 1, 23, 59, 59)}>*/}
                    {/*        <List.Item arrow="horizontal">开始日期</List.Item>*/}
                    {/*    </DatePicker>*/}
                    {/*    <DatePicker*/}
                    {/*        mode="date"*/}
                    {/*        title="结束日期"*/}
                    {/*        extra="选择"*/}
                    {/*        value={this.state.subperiods_end}*/}
                    {/*        onChange={date => {*/}
                    {/*            this.props.allEndTime(this.props.keyId, date);*/}
                    {/*            this.setState({subperiods_end: date})*/}
                    {/*        }}*/}

                    {/*        minDate={new Date(new Date(this.state.subperiods_start.getTime()).setDate(this.state.subperiods_start.getDate() + 1))}*/}
                    {/*        maxDate={new Date(2049, 1, 1, 23, 59, 59)}>*/}
                    {/*        <List.Item arrow="horizontal">结束日期</List.Item>*/}
                    {/*    </DatePicker>*/}
                    {/*</List>*/}

                    <TextField
                        id="date"
                        label="开始日期"
                        type="date"

                        defaultValue="2017-05-24"
                        style={styles.text}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={date => {

                            this.props.allStartTime(this.props.keyId, date.target.value);
                            this.setState({subperiods_start: date.target.value,})
                        }}
                    />
                    <TextField
                        id="date"
                        label="结束日期"
                        type="date"
                        defaultValue="2017-05-24"
                        style={styles.text}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={date => {
                            this.props.allEndTime(this.props.keyId, date.target.value);
                            this.setState({subperiods_end: date.target.value})
                        }}
                    />
                </Typography>
            </Zoom>
        );
    }
}

export default withStyles(styles)(Subperiods);
