import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './index';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/main' component={MainPage}/>
            </Switch>
        )
    }
}