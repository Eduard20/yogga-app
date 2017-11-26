import React, { Component } from 'react';
import ReportsPage from '../../components/reports-page';

const data = [
    {
        _id: 1,
        date: '08.07.2015',
        avg_dist: 100,
        avg_speed: 110,
    },
    {
        _id: 2,
        date: '04.07.2017',
        avg_dist: 100,
        avg_speed: 110,
    },
    {
        _id: 3,
        date: '08.07.2015',
        avg_dist: 100,
        avg_speed: 110,
    },
    {
        _id: 4,
        date: '03.07.2018',
        avg_dist: 100,
        avg_speed: 110,
    },
    {
        _id: 5,
        date: '09.07.2015',
        avg_dist: 100,
        avg_speed: 110,
    },
];

export default class Reports extends Component {
    render() {
        return (
            <ReportsPage
                list={data}
            />
        )
    }
}
