import React from 'react';

import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import {Button} from "@material-ui/core";
import ExMoreIcon from '@material-ui/icons/ExpandMore'

import StaticMap from "./StaticMap";
import Subperiods from "./Subperiods";
import Toast from "antd-mobile/lib/toast";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Underlying from "./Underlying";
import Fab from "@material-ui/core/Fab";
import {ENDTIME, START_TIME, TENSOREN_BULE} from "../../Const";
import Insured from "./Insured";
import Tick from "./Tick";
import Deductible from "./Deductible";
import Limit from "./Limit";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Station from "./Station";
import {RavenStatic as Raven} from "raven-js";
import Zoom from "@material-ui/core/Zoom";



function Transition(props) {
    return <Zoom direction="up" {...props} />;
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },


    bottomNv: {
        width: "100%", position: "fixed", bottom: 0,
    },
    bottomNv_b: {
        width: "33.33%", height: 56, backgroundColor: "#fff"
    },
    bottomPlus: {
        position: "fixed", bottom: 60, right: 5, zIndex: 99
    }, rootPlus: {
        width: "100%",
        height: document.documentElement.clientHeight,
        zIndex: 1,
        top: 0,
        position: "fixed",
        textAlign: "right",
        opacity: "0.8"
    }, buttonMargin: {
        margin: 2,
    },
});


class Weather extends React.Component {
    theme = createMuiTheme({
        typography: {
            useNextVariants: true
        },
        palette: {
            primary: {
                main: TENSOREN_BULE
            }
        }
    });

    provinces = ["安徽"];
    stations = ["砀山"];
    wmo_ids = ["58108"];
    subperiods_start = [START_TIME];
    subperiods_end = [ENDTIME];
    ticks = [[0]];
    triggers = [[0]];
    weights = [0];

    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            submissionId: "",
            underlying: "TempMax",
            trigger_type: "0",
            insured_name: "",
            subject: "",
            insured_place: "",
            underlying_type: "0",
            deductible_type: "0",
            deductible_amount: "",
            deductible_radio: "",
            limit: "",
            event_number_covered: "0",


            triggers: "",
            ticks: "",
            underlyingUnit: "℃",
            rootPlusStatus: false,
            stationArray: [0],
            subperiodsArray: [0],
            periodCount: [0],
            expanded: null,
            exportButton: true
        };

        this.subperiods_start[0] = START_TIME;
        this.subperiods_end[0] = ENDTIME;
    }


    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const {classes} = this.props;
        const {expanded} = this.state;
        return (
            <MuiThemeProvider theme={this.theme}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Typography component="div" color={"primary"} className={classes.root}>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                            <ExpansionPanelSummary expandIcon={<ExMoreIcon/>}>
                                <Typography color={"primary"} className={classes.heading}>基本信息</Typography>
                                {/*<Typography className={classes.secondaryHeading}>在此填写基本信息</Typography>*/}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails color={"primary"}>
                                <Insured onChangeState={this.onChangeState}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                            <ExpansionPanelSummary expandIcon={<ExMoreIcon/>}>
                                <Typography color={"primary"} className={classes.heading}>站点选择</Typography>
                                {/*<Typography className={classes.secondaryHeading}>*/}
                                {/*    You are currently not an owner*/}
                                {/*</Typography>*/}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography component="div" color={"primary"} style={{width: "100%"}}>
                                    {this.state.stationArray.map((item, index) =>
                                        <Station
                                            key={index}
                                            keyId={index}
                                            setStations={this.setStations}
                                            setWmo_ids={this.setWmo_ids}
                                            setProvinces={this.setProvinces}
                                            setWeights={this.setWeights}
                                        />)}
                                    <Button color={"primary"}
                                            variant={"contained"}
                                            style={{marginRight: '4px', left: 0}}
                                            onClick={this.addStations}>增加</Button>
                                    <Button color={"primary"}
                                            variant={"contained"}
                                        // style={{marginRight: '4px', right: 5, position: "absolute"}}
                                            onClick={this.delStations}>删除</Button>
                                    <StaticMap/>

                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                            <ExpansionPanelSummary expandIcon={<ExMoreIcon/>}>
                                <Typography color={"primary"} className={classes.heading}>保险期间</Typography>
                                {/*<Typography className={classes.secondaryHeading}>*/}
                                {/*    Filtering has been entirely disabled for whole web server*/}
                                {/*</Typography>*/}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography component="div" color={"primary"} style={{width: "100%"}}>

                                    {/*<MaterialUIPickers/>*/}
                                    {this.state.subperiodsArray.map((item, index) =>
                                        <Subperiods
                                            key={index}
                                            keyId={index}
                                            allEndTime={this.allEndTime}
                                            allStartTime={this.allStartTime}/>)}
                                    <Button
                                        color={"primary"}
                                        variant={"contained"}
                                        style={{marginRight: '4px', left: 0}}
                                        onClick={() => this.addSubperiod()}>增加</Button>

                                    <Button
                                        color={"primary"}
                                        variant={"contained"}
                                        style={{marginRight: '4px'}}
                                        onClick={() => this.delSubperiod()}>删除</Button>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                            <ExpansionPanelSummary expandIcon={<ExMoreIcon/>}>
                                <Typography color={"primary"} className={classes.heading}>指数定义</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography component="div" color={"primary"} style={{width: "100%"}}>
                                    <Underlying onChangeUnderlying={this.onChangeUnderlying}
                                                onChangeState={this.onChangeState}
                                    />
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                            <ExpansionPanelSummary expandIcon={<ExMoreIcon/>}>
                                <Typography color={"primary"} className={classes.heading}>赔偿标准</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography color={"primary"} component={"div"}>
                                    {this.state.periodCount.map((item, index) =>
                                        <Tick
                                            key={index}
                                            keyId={index}
                                            underlyingUnit={this.state.underlyingUnit}
                                            onChangeState={this.onChangeState}
                                            onChangeTriggers={this.onChangeTriggers}
                                            onChangeTicks={this.onChangeTicks}
                                        />)}

                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
                            <ExpansionPanelSummary expandIcon={<ExMoreIcon/>}>
                                <Typography className={classes.heading} color={"primary"}>免赔设置</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Deductible onChangeState={this.onChangeState}
                                            deductible_amount={this.state.deductible_amount}
                                            deductible_radio={this.state.deductible_radio}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
                            <ExpansionPanelSummary expandIcon={<ExMoreIcon/>}>
                                <Typography color={"primary"} className={classes.heading}>限额设置</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Limit
                                    limitNo={this.state.event_number_covered}
                                    onChangeState={this.onChangeState}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel8'} onChange={this.handleChange('panel8')}>
                            <ExpansionPanelSummary expandIcon={<ExMoreIcon/>}>
                                <Typography className={classes.heading} color={"primary"}>保费金额</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography color={"primary"}>
                                    保费金额 ：{this.state.provinces}
                                </Typography>
                            </ExpansionPanelDetails>

                            <ExpansionPanelActions>
                                <Button size="small" color="primary" disabled={this.state.exportButton}>
                                    导出
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                        <Dialog className={classes.rootPlus} open={this.state.rootPlusStatus}
                                TransitionComponent={Transition} onClick={this.clickButtonPlus}>
                            <Button color={"primary"} className={classes.buttonMargin} variant="contained"
                                    size="large">历史事件</Button>
                            <Button color={"primary"} className={classes.buttonMargin} variant="contained"
                                    size="large">历史赔款</Button>
                            <Button color={"primary"} className={classes.buttonMargin} variant="contained"
                                    size="large">预报预警</Button>
                            <Button color={"primary"} className={classes.buttonMargin} variant="contained"
                                    size="large">历史事件</Button>
                        </Dialog>
                    </Typography>
                </Slide>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Typography component="div" color={"primary"} className={classes.bottomNv}>
                        <Typography component="div" color={"primary"} className={classes.bottomPlus}>
                            <Fab color="primary" aria-label="Add" className={classes.fab}
                                 onClick={this.clickButtonPlus}>
                                <AddIcon/>
                            </Fab>
                        </Typography>
                        <Button color={"primary"} className={classes.bottomNv_b}
                                onClick={this.onClickSave}>保存</Button>
                        <Button color={"primary"} className={classes.bottomNv_b}>询价</Button>
                        <Button color={"primary"} className={classes.bottomNv_b}>另存</Button>
                    </Typography>
                </Slide>
            </MuiThemeProvider>
        );
    }

    componentDidCatch(error, errorInfo) {
        Raven.captureException(error, {extra: errorInfo});
    }

    onChangeState = name => event => {
        this.setState({
            [name]: event.target.value
        });
        console.log(event.target.value);
    };


    //region  站点选择
    setProvinces = (key, text) => {

        this.provinces[key] = text;

        console.log(this.provinces);

    };

    setStations = (key, text) => {

        this.stations[key] = text;

        console.log(this.stations);

    };

    setWmo_ids = (key, text) => {

        this.wmo_ids[key] = text;

        console.log(this.wmo_ids);

    };

    setWeights = (key, text) => {

        this.weights[key] = text;

        console.log(this.weights);

    };


    addStations = () => {

        let arr = [...this.state.stationArray];
        arr.push(1);
        this.weights[arr.length - 1] = 0;
        this.stations[arr.length - 1] = "砀山";
        this.provinces[arr.length - 1] = "安徽";
        this.wmo_ids[arr.length - 1] = "58108";
        this.setState({
            stationArray: arr
        })
    };

    delStations = () => {

        let arr = [...this.state.stationArray];
        if (arr.length !== 1) {
            arr.pop();

            this.setState({
                stationArray: arr
            });
            this.stations.pop();
        } else {
            Toast.fail("不能删除最后一个")
        }
    };


    //endregion

    //region 保险期间
    addSubperiod = () => {
        let arr = [...this.state.subperiodsArray];
        arr.push(1);
        this.ticks.push([]);
        this.triggers.push([]);
        this.setState({
            subperiodsArray: arr,
            periodCount: arr
        });
        this.subperiods_start[arr.length - 1] = START_TIME;
        this.subperiods_end[arr.length - 1] = ENDTIME;
    };

    delSubperiod = () => {
        let arr = [...this.state.subperiodsArray];
        if (arr.length !== 1) {
            arr.pop();
            this.ticks.pop();
            this.triggers.pop();
            this.setState({
                subperiodsArray: arr
            });
            this.subperiods_start.pop();
            this.subperiods_end.pop();
        } else {
            Toast.fail("不能删除最后一个")
        }
    };

    allStartTime = (key, date) => {
        this.subperiods_start[key] = date ;

        alert(this.subperiods_start)
    };
    allEndTime = (key, date) => {
        this.subperiods_end[key] = date ;

        alert(this.subperiods_end)
    };
    //endregion

    //region 指数定义


    //underlying
    onChangeUnderlying = e => {
        this.setState({
            underlying: e.target.value
        });
        // eslint-disable-next-line default-case
        switch (e.target.value) {
//            case "Tmax":
//                unit = ("℃");
//                break;
            case "TempMax":
                this.setState({
                    underlyingUnit: "℃"
                });
                break;
            case "TempMin":
                this.setState({
                    underlyingUnit: "℃"
                });
                break;
            case "TempAverage":
                this.setState({
                    underlyingUnit: "℃"
                });
                break;
            case "WindSpeedMax":

                this.setState({
                    underlyingUnit: "m/s"
                });

                break;
            case "WindSpeedGust":
                this.setState({
                    underlyingUnit: "m/s"
                });
                break;
            case "WindSpeedAverage":
                this.setState({
                    underlyingUnit: "m/s"
                });
                break;
            case "Precipitation":
                this.setState({
                    underlyingUnit: "mm"
                });
                break;
            case "SunshineHour":
                this.setState({
                    underlyingUnit: "H"
                });
                break;
//            case "RelativeHumidity":
//                unit .setText("RH");
//                break;
//            case "Pressure":
//                unit .setText("Pa");
//                break;
//            case "SnowDepth":
//                unit .setText("mm");
//                break;
//            case "Visibility":
//                unit .setText("m");
//                break;
        }

        alert(this.state.underlyingUnit);
    };


    //endregion
    //region 赔偿标准
    onChangeTriggers = (key, subkey, date) => {

        this.triggers[key][subkey] = date;
        console.log(this.triggers)
    };

    onChangeTicks = (key, subkey, date) => {

        this.ticks[key][subkey] = date;
        console.log(this.ticks)
    };

    //endregion


    clickButtonPlus = () => {
        this.setState({
            rootPlusStatus: !this.state.rootPlusStatus
        });
    };


    //region 底部按钮
    onClickSave = () => {
        console.log("allState" + JSON.stringify(this.state));
        console.log("startTimes" + JSON.stringify(this.subperiods_start));
        console.log("endTimes" + JSON.stringify(this.subperiods_end));
        console.log("provinces" + JSON.stringify(this.provinces));
        console.log("stations" + JSON.stringify(this.stations));
        console.log("wmo_ids" + JSON.stringify(this.wmo_ids));
        console.log("ticks" + JSON.stringify(this.ticks));
        console.log("triggers" + JSON.stringify(this.triggers));
        console.log("weights" + JSON.stringify(this.weights));
        // eslint-disable-next-line array-callback-return
        this.ticks.find(value => {
            if (value === undefined || value === "")
                console.log("ticks中有空")
        });
        // eslint-disable-next-line array-callback-return
        this.triggers.find(value => {
            if (value === undefined || value === "")
                console.log("trigger中有空")
        });
        console.log("allStations" + this.stations);

    };
    //endregion


}


export default withStyles(styles)(Weather);
