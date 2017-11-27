import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TopBar from './containers/top-bar';
import { getCookie } from './helpers';
import PropTypes from 'prop-types';
import Registration from './containers/registration';
import MainRouter from './containers/main-page/routes';

class App extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount() {
        if (getCookie('token')) {
            this.context.router.history.push(`/main`);
        } else {
            this.context.router.history.push(`/`);
        }
    }
    render() {
        return (
            <div>
                <TopBar />
                <Switch>
                    <Route exact path='/' component={Registration} />
                    <Route path='/main' component={MainRouter} />
                </Switch>
            </div>
        )
    }
}

export default App;