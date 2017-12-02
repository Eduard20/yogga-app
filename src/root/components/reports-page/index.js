import React, { Component } from 'react';
import Table from '../table';
let resultArr = [];
export default class ReportsPage extends Component {
    constructor(props) {
        super(props);
        this.headerColumns = [
            {
                Name: 'Week',
                DataKey: 'index',
                Width: 250
            },
            {
                Name: 'Average distance',
                DataKey: 'dist',
                Width: 250
            },
            {
                Name: 'Average speed',
                DataKey: 'speed',
                Width: 250
            }
        ];
        resultArr = [];
        let byWeek={};
        function groupWeek(value) {
            let d = new Date(value.date);
            d = Math.floor(d.getTime()/(1000*60*60*24*7));
            byWeek[d]=byWeek[d]||[];
            byWeek[d].push(value);
        }
        this.props.list.map(groupWeek);
        let i = 0;
        for (const key in byWeek) {
            if (byWeek.hasOwnProperty(key)) {
                const data = byWeek[key];
                let dist = 0, speed = 0;
                data.forEach(item => {
                    dist += parseInt(item.dist);
                    speed += parseInt(item.speed)
                });
                const avgDistance = dist / data.length;
                const avgSpeed = speed / data.length;
                resultArr.push({
                    index: ++i,
                    dist: avgDistance,
                    speed: avgSpeed
                })
            }
        }
    }

    render() {
        return (
            <Table
                headerColumns={this.headerColumns}
                list={resultArr}
            />
        )
    }
}