import React, {Component} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import Main from "../Main/Main";



class RouterIndex extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={() => (//exact是用于精准匹配，这里是定义了路由重定向，意思是当我们进入"/"时会重定向到“/index”
                        <Redirect to='/main'/>
                    )}/>
                    <Route exact path='/main' component={Main}/>
                    <Route exact path='/list' component={Main}/>
                    <Route exact path='/mine' component={Main}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouterIndex
