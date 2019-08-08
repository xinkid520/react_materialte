import React from "react";
import ReactDOM from 'react-dom';
import {createMuiTheme, withStyles} from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import {Button, Typography} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import logo from "../../statics/images/logo.png";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import {TENSOREN_BULE} from "../Const";
import Cookies from "react-cookies";
import App from "../../App";
import Zoom from "@material-ui/core/Zoom";
import {_API_Login} from "../../server/APInterface";
import {RavenStatic as Raven} from "raven-js";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        margin: "0 auto",
        width: "55%"
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            dialogStatus: false,
            dialogText: "",
        };
    }

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


    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={this.theme}>
                <Zoom in={true}>
                    <Typography component={"form"}>

                        <img
                            src={logo}
                            alt={"天韧科技"}
                            className={classes.textField}
                            style={{
                                display: "flex",
                                marginTop: 50,
                                padding: 10,
                                width: "50%"
                            }}
                        />
                        <div
                            className={classes.container}
                            style={{marginTop: 15}}
                        >
                            <TextField
                                id="username"
                                label="用户名"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange("username")}
                                error={this.state.username === ""}
                                margin="normal"
                                variant="filled"
                                fullWidth
                            />

                            <TextField
                                id="password"
                                label="密码"
                                autoComplete={""}
                                onChange={this.handleChange("password")}
                                type={"password"}
                                className={classes.textField}
                                margin="normal"
                                variant="filled"
                                value={this.state.password}
                                style={{marginTop: 5}}
                                error={this.state.password === ""}
                                fullWidth
                            />
                        </div>
                        <div className={classes.textField} style={{marginTop: 10}}>
                            <Button color={"primary"}>忘记密码</Button>
                            <Button
                                color={"primary"}
                                style={{right: "20%", position: "absolute"}}
                            >
                                注册
                            </Button>
                        </div>
                        <div className={classes.container}>
                            <Button
                                className={classes.textField}
                                variant="contained"
                                color={"primary"}
                                fullWidth
                                onClick={this.login.bind(this)}
                            >
                                登录
                            </Button>
                        </div>

                        <Dialog
                            open={this.state.dialogStatus}
                            onClose={this.handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"异常"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {this.state.dialogText}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>

                                <Button onClick={this.handleClose} color="primary" autoFocus>
                                    确认
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Typography>
                </Zoom>
            </MuiThemeProvider>
        );
    }

    componentDidCatch(error, errorInfo) {
        Raven.captureException(error, {extra: errorInfo});
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };


    handleClose = () => {
        if (!this.isControlled) {
            this.setState({
                dialogStatus: false
            });
        }
    };


    async login() {

        if (this.state.username !== "" && this.state.password !== "") {
            // let data = {"user_name": this.state.username, "password": this.state.password};
            let data = "user_name=" + this.state.username + "&password=" + this.state.password;
            try {
                const res = await _API_Login(data);
                console.log(res);
                data = res.data;
                if (data.value === true) {
                    this.setState({
                        company_name: data.company_name,
                        email: data.email,
                        full_name: data.full_name
                    });

                    // document.form1.submit();

                    Cookies.save(
                        "user",
                        this.state.username +
                        ";" +
                        //   md5
                        this.state.password,
                        {
                            // domain: "139.196.77.225",
                            // domain: "localhost",
                            path: "/",
                            maxAge: 259200
                        }
                    );
                    window.sessionStorage.setItem("isLogin", "1");
                    ReactDOM.render(<App/>, document.getElementById('root'));
                } else {
                    this.setState({
                        dialogStatus: true,
                        dialogText: "状态码：" + data.errno + "，错误信息：" + data.errmsg
                    });
                    // message.error("状态码：" + data.errno + "，错误信息：" + data.errmsg);
                }

            } catch (e) {
                console.error(e);
            }

            // alert(data);
            // server.post("/passport/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            //     },
            //     body: data,
            //     // JSON.stringify({
            //     // user_name: this.state.username,
            //     // password: this.state.password
            //     // }),
            //     mode: "cors", // 避免cors攻击
            //     credentials: "include"
            // })
            //     .then(res => res.json())


        } else {
            this.setState({
                dialogStatus: true,
                dialogText: "请检查您的输入"
            });

        }
    };
}

export default withStyles(styles)(Login);
