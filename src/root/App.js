import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TopBar from './containers/top-bar';
import Registration from './containers/registration';

class App extends Component {
    render() {
        return (
            <div>
                <TopBar />
                <Switch>
                    <Route exact path='/' component={Registration}></Route>
                </Switch>
            </div>
        )
    }
}

export default App;