import React, {Component} from 'react';

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {Grid} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/es/Button";
import Dialog from "@material-ui/core/Dialog";

// const styles = theme => ({
//     pager: {
//         ...theme.mixins.gutters(),
//         paddingTop: theme.spacing.unit * 2,
//         paddingBottom: theme.spacing.unit * 2,
//     },
// });

class Underlying extends Component {

    state = {
        underlying: 'TempMax',
        trigger_type: "0",
        name: 'hai',
        labelWidth: 0,
        selectedValue: '0',
        dialogValue: "0",
        open: false
    };


    render() {
        // const {classes} = styles();
        return (
            <Typography component="div" color={"primary"}>
                <Grid container>
                    指数：
                    <Grid item>
                        <Select
                            value={this.state.underlying}
                            onChange={this.underlyingChange}>
                            <MenuItem value={"TempMax"}>最高气温</MenuItem>
                            <MenuItem value={"TempMin"}>最低气温</MenuItem>
                            <MenuItem value={"TempAverage"}>平均气温</MenuItem>
                            <MenuItem value={"WindSpeedMax"}>最大风速</MenuItem>
                            <MenuItem value={"WindSpeedGust"}>极大风速</MenuItem>
                            <MenuItem value={"WindSpeedAverage"}>平均风速</MenuItem>
                            <MenuItem value={"Precipitation"}>降雨量</MenuItem>
                            <MenuItem value={"SunshineHour"}>日照时数</MenuItem>
                            <MenuItem value={"Pressure"}>气压</MenuItem>
                            <MenuItem value={"SnowDepth"}>积雪深度</MenuItem>
                            <MenuItem value={"Visibility"}>能见度</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid container>
                    类型：
                    <Grid item>
                        <Radio
                            checked={this.state.selectedValue === '0'}
                            onChange={this.underlyingTypeChange}
                            value="0"
                            name="radio-button-demo"
                            aria-label="A"
                            color={"primary"}
                        />
                        累计
                    </Grid>
                    <Grid item>
                        <Radio
                            checked={this.state.selectedValue === '1'}
                            onChange={this.underlyingTypeChange}
                            value="1"
                            name="radio-button-demo"
                            aria-label="B"
                            color={"primary"}
                        />
                        单日
                    </Grid>
                    <Grid item style={{textAlign: "center"}}>
                        <Radio
                            checked={this.state.selectedValue === '2'}
                            onChange={this.underlyingTypeChange}
                            onClick={() => {
                                this.dialogStatus()
                            }}
                            value="2"
                            name="radio-button-demo"
                            aria-label="C"
                            color={"primary"}
                        />
                        特定累计
                    </Grid>
                </Grid>

                <Dialog
                    open={this.state.open}
                    onClose={this.dialogStatus}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        {/*<DialogContentText>*/}
                        {/*    To subscribe to this website, please enter your email address here. We will send*/}
                        {/*    updates occasionally.*/}
                        {/*</DialogContentText>*/}
                        <Radio
                            checked={this.state.dialogValue === '0'}
                            onChange={this.dialogChange}
                            value="0"
                            name="radio-button-demo"
                            aria-label="B"
                            color={"primary"}
                        />
                        <Radio
                            checked={this.state.dialogValue === '1'}
                            onChange={this.dialogChange}
                            value="1"
                            name="radio-button-demo"
                            aria-label="B"
                            color={"primary"}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="yu"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.dialogStatus} color="primary">
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid container>
                    <Grid item> 触发：</Grid>
                    <Grid item>
                        <Select
                            value={this.state.trigger_type}
                            onChange={(e) => {
                                this.setState({
                                    trigger_type: e.target.value
                                });
                                this.props.onChangeState("trigger_type")(e);
                            }}

                        >
                            <MenuItem value={0}>高于阈值值后按单位赔款</MenuItem>
                            <MenuItem value={1}>高于阈值值后按区间赔款</MenuItem>
                            <MenuItem value={2}>低于阈值值后按单位赔款</MenuItem>
                            <MenuItem value={3}>高于阈值值后按区间赔款</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Typography>
        );
    }

    underlyingTypeChange = event => {
        this.setState({selectedValue: event.target.value});
        this.props.onChangeState("underlying_type")(event);
    };
    underlyingChange = event => {
        this.setState({underlying: event.target.value});
        this.props.onChangeUnderlying(event);
    };

    dialogChange = event => {
        this.setState({dialogValue: event.target.value});
    };

    dialogStatus = () => {
        this.setState({open: !this.state.open});
    };
}

export default Underlying;
