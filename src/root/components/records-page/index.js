import React, { Component } from 'react';
import Table from '../table';

export default class ReportsPage extends Component {
    constructor(props) {
        super(props);
        this.headerColumns = [
            {
                Name: 'Date',
                DataKey: 'date',
                Width: 250
            },
            {
                Name: 'Distance',
                DataKey: 'dist',
                Width: 250
            },
            {
                Name: 'Time',
                DataKey: 'time',
                Width: 250
            },
            {
                Name: 'Edt',
                DataKey: 'edit',
                Width: 50
            },
            {
                Name: 'Delete',
                DataKey: 'delete',
                Width: 80
            },
        ]
    }

    render() {
        return (
            <Table
                headerColumns={this.headerColumns}
                list={this.props.list}
            />
        )
    }
}