import React, { Component } from 'react';
import RecordsPage from '../../components/records-page/index';

const data = [
    {
        _id: 1,
        "dist": "450",
        "date": "2017-11-09T07:37:45.353Z",
        "time": "2017-11-29T07:40:33.000Z",
    },
    {
        _id: 2,
        "dist": "450",
        "date": "2017-11-09T07:37:45.353Z",
        "time": "2017-11-29T07:40:33.000Z",
    }
];

export default class Records extends Component {
    render() {
        return (
            <RecordsPage
                list={this.props.list}
            />
        )
    }
}
