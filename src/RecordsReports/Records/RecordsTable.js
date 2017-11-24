import React, { Component } from 'react'

import { Table, Icon } from 'antd';
import '../table.css'


const { Column } = Table;

const data = [{
    key: '1',
    date: '08.08.2017',
    dist: 1000,
    time: '00:05:27',
    speed: '11.01',
}, {
    key: '2',
    date: '09.08.2017',
    dist: 1000,
    time: '00:05:11',
    speed: '11.57',
}, {
    key: '3',
    date: '10.08.2017',
    dist: 1000,
    time: '00:04:44',
    speed: '12.68',
}, {
    key: '4',
    date: '11.08.2017',
    dist: 2000,
    time: '00:09:50',
    speed: '12.20',
}];

class RecordsTable extends Component {
    sorter = (a, b) => {
        return new Date(a.date) - new Date(b.date)
    };
    render() {
        return(
            <div className="table">
                <div className="menu">
                    <a href="/">Records</a>
                    <a href="/reports">Reports</a>
                </div>
                {/*<Table columns={columns} dataSource={data} />*/}
                <Table dataSource={data}>
                    <Column
                        title="Date"
                        dataIndex="date"
                        key="Date"
                        sorter={this.sorter}
                    />
                    <Column
                        title="Distance(Metres)"
                        dataIndex="dist"
                        key="Distance(Metres)"
                    />
                    <Column
                        title="Time"
                        dataIndex="time"
                        key="Time"
                    />
                    <Column
                        title="Average speed (Km/hr)"
                        dataIndex="speed"
                        key="Average speed (Km/hr)"
                    />

                    <Column
                        title="Edit"
                        key="edit"
                        render={(text, record) => (
                            <span>
                              <a href="records"><Icon type="edit" style={{ fontSize: 16, color: '#08c' }} /></a>
                            </span>
                        )}
                    />
                    <Column
                        title="Delete"
                        key="del"
                        render={(text, record) => (
                            <span>
                              <a><Icon type="delete" style={{ fontSize: 16, color: '#08c' }} /></a>
                            </span>
                        )}
                    />
                </Table>

            </div>
        )
    }
}

export default RecordsTable