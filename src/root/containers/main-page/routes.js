import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './index';
import Record from '../record';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/main' component={MainPage}/>
                <Route exact path='/main/record/:id?' component={Record}/>
            </Switch>
        )
    }
}