import React, { Component } from 'react';
import RecordsPage from '../../components/records-page/index';

const data = [
    {
        _id: 1,
        date: '08.07.2015',
        distance: 100,
        time: 110,
        speed: 116,
    },
    {
        _id: 2,
        date: '04.07.2017',
        distance: 100,
        time: 110,
        speed: 116,
    },
    {
        _id: 3,
        date: '08.07.2015',
        distance: 100,
        time: 110,
        speed: 116,
    },
    {
        _id: 4,
        date: '03.07.2018',
        distance: 100,
        time: 110,
        speed: 116,
    },
    {
        _id: 5,
        date: '09.07.2015',
        distance: 100,
        time: 110,
        speed: 116,
    },
];

export default class Records extends Component {
    render() {
        return (
            <RecordsPage
                list={data}
            />
        )
    }
}
