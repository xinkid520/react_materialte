import React from "react";

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import RouterIndex from "./components/Router/RouterIndex";
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/ViewList';
import MineIcon from '@material-ui/icons/AccountBox'
import {TENSOREN_BULE} from "./components/Const";
import Slide from "@material-ui/core/Slide";
import {Typography} from "@material-ui/core";


const styles = {
    head: {
        width: "100%", position: "fixed", top: 0,
    },
    footer: {
        width: "100%", height: 56, position: "fixed", bottom: 0,
    },
};


class App extends React.Component {
    theme = createMuiTheme({
        typography: {
            useNextVariants: true,
        },
        palette: {
            primary: {
                main: TENSOREN_BULE
            }
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            value: 'main',
        };
    }


    handleChange = (event, value) => {
        this.setState({value,});
        console.log(value)
    };

    render() {
        const {value} = this.state;
        return (
            <MuiThemeProvider theme={this.theme}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Typography component={"div"}>
                        <header style={styles.head}>
                            头部 头部
                            头部 头部
                            头部 头部
                        </header>
                        <div style={{marginTop: 50, marginBottom: 60, position: "fixed"}}>
                            <RouterIndex/>
                        </div>


                    </Typography>
                </Slide>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <footer style={styles.footer}>
                    <BottomNavigation value={value} onChange={this.handleChange.bind(this)}>
                        <BottomNavigationAction label="主页" value="main" icon={<HomeIcon/>}/>
                        <BottomNavigationAction label="列表" value="list" icon={<ListIcon/>}/>
                        {/*<BottomNavigationAction label="Nearby" value="nearby" icon={<Icon>home</Icon>}/>*/}
                        <BottomNavigationAction label="我的" value="mine" icon={<MineIcon/>}/>
                    </BottomNavigation>
                </footer>
                </Slide>
            </MuiThemeProvider>
        );
    }
}

export default App;
