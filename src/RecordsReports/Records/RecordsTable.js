import React, { Component } from 'react'

import { Table, Icon } from 'antd';

import './table.css'

const columns = [{
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
}, {
    title: 'Distance(Metres)',
    dataIndex: 'dist',
}, {
    title: 'Time',
    dataIndex: 'time',
}, {
    title: 'Average speed (Km/hr)',
    dataIndex: 'speed',
},{
    title: 'Edit',
    dataIndex: 'edit',
},{
    title: 'Delete',
    dataIndex: 'del',
}];

const data = [{
    key: '1',
    date: '08.08.2017',
    dist: 1000,
    time: '00:05:27',
    speed: '11.01',
    edit: <Icon type="edit" style={{ fontSize: 16, color: '#08c' }} />,
    del: <Icon type="delete" style={{ fontSize: 16, color: '#08c' }} />
}, {
    key: '2',
    date: '09.08.2017',
    dist: 1000,
    time: '00:05:11',
    speed: '11.57',
    edit: <Icon type="edit" style={{ fontSize: 16, color: '#08c' }} />,
    del: <Icon type="delete" style={{ fontSize: 16, color: '#08c' }} />
}, {
    key: '3',
    date: '10.08.2017',
    dist: 1000,
    time: '00:04:44',
    speed: '12.68',
    edit: <Icon type="edit" style={{ fontSize: 16, color: '#08c' }} />,
    del: <Icon type="delete" style={{ fontSize: 16, color: '#08c' }} />
}, {
    key: '4',
    date: '11.08.2017',
    dist: 2000,
    time: '00:09:50',
    speed: '12.20',
    edit: <Icon type="edit" style={{ fontSize: 16, color: '#08c' }} />,
    del: <Icon type="delete" style={{ fontSize: 16, color: '#08c' }} />
}];

class RecordsTable extends Component {
    render() {
        return(
            <div className="table">
                <div className="menu">
                    <a href="/">Records</a>
                    <a href="/reports">Reports</a>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default RecordsTable