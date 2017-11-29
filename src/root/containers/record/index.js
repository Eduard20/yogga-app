import React, { Component } from 'react';
import SingleRecord from '../../components/single-record';
import { GetSingleRecord } from '../../../api/Record';

export default class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            record: {}
        };
        // this.updateData();
    }

    updateData = () => {
        this.props.match.params.id && GetSingleRecord(this.props.match.params.id)
            .then(result => {
                this.setState({ record: result.payload });
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