import React, { Component } from 'react';
import ReportsPage from '../../components/reports-page';

export default class Reports extends Component {
    render() {
        return (
            <ReportsPage
                list={this.props.list}
            />
        )
    }
}
