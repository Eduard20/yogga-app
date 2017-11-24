import React, { Component } from 'react'

import { Table, Icon } from 'antd';

import '../table.css'

const columns = [{
    title: 'Week',
    dataIndex: 'week',
    sorter: (a, b) => a.week - b.week,
}, {
    title: 'Average distance(Metres)',
    dataIndex: 'dist',
}, {
    title: 'Average speed (Km/hr)',
    dataIndex: 'speed',
}];

const data = [{
    key: '1',
    week: '1',
    dist: 1000,
    speed: '11.01',
}, {
    key: '2',
    week: '2',
    dist: 1500,
    speed: '11.57',
}, {
    key: '3',
    week: '3',
    dist: 1333,
    speed: '12.68',
}, {
    key: '4',
    week: '4',
    dist: 2000,
    speed: '12.20',
}];

class ReportsTable extends Component {
    render() {
        return(
            <div className="tableRep">
                <div className="menu">
                    <a href="/">Records</a>
                    <a href="/reports">Reports</a>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default ReportsTable