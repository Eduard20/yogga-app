import React, { Component } from 'react';
import Table from '../table';

export default class ReportsPage extends Component {
    constructor(props) {
        super(props);
        this.headerColumns = [
            {
                Name: 'Creation Date',
                DataKey: 'date',
                Width: 250
            },
            {
                Name: 'Average distance',
                DataKey: 'avg_dist',
                Width: 250
            },
            {
                Name: 'Average Speed',
                DataKey: 'avg_speed',
                Width: 250
            }
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