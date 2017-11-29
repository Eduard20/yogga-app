import React, { Component } from 'react';
import RecordsPage from '../../components/records-page/index';

export default class Records extends Component {
    render() {
        return (
            <RecordsPage
                updateTable={this.props.updateTable}
                list={this.props.list}
            />
        )
    }
}
