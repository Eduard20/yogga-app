import React, { Component } from 'react';
import SingleRecord from '../../components/single-record';
import moment from 'moment';
import { GetSingleRecord } from '../../../api/Record';

export default class Record extends Component {
    constructor(props) {
        super(props);
        const m = moment().utcOffset(0);
        m.set({hour:0,minute:0,second:0,millisecond:0});
        m.toISOString();
        m.format();
        this.state = {
            record: {
                date: moment(new Date()).format('YYYY-MM-DD'),
                dist: 0,
                time: m
            }
        };
        this.updateData();
    }

    updateData = () => {
        this.props.match.params.id && GetSingleRecord(this.props.match.params.id)
            .then(result => {
                this.setState({ record: {
                    ...result.payload,
                    time: moment(result.payload.time).utc()
                }});
            });
    };

    render() {
        return (
            <SingleRecord
                record={this.state.record}
                id={this.props.match.params.id}
            />
        )
    }
}