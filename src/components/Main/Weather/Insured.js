import React, {Component} from 'react';
import {TextField, Typography} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";


const styles={text:{marginBottom:10}};

class Insured extends Component {

    render() {
        return (
            <Typography component="div" color={"primary"}>
                <TextField
                    // label="被保险人"
                    style={styles.text}
                    onChange={this.props.onChangeState("insured_name")}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start" style={{width: 75}}>被保险人：</InputAdornment>,
                        // endAdornment: <InputAdornment position="end"> % </InputAdornment>,
                    }}
                />
                <TextField
                    // label="投保地点"
                    style={styles.text}
                    onChange={this.props.onChangeState("insured_place")}
                    // variant="filled"
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start" style={{width: 75}}>投保地点：</InputAdornment>,
                        // endAdornment: <InputAdornment position="end"> % </InputAdornment>,
                    }}
                />
                <TextField
                    // label="保险标的"
                    style={styles.text}
                    onChange={this.props.onChangeState("subject")}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start" style={{width: 75}}>保险标的：</InputAdornment>,
                        // endAdornment: <InputAdornment position="end"> % </InputAdornment>,
                    }}
                />
            </Typography>
        );
    }
}

export default Insured;
