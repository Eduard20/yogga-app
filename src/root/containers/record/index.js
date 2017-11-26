import React, { Component } from 'react';
import SingleRecord from '../../components/single-record';

export default class Record extends Component {
    render() {
        return (
            <SingleRecord
                id={this.props.match.params.id}
            />
        )
    }
}