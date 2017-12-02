import React, { Component } from 'react'
import './form.css'
import { AddRecord, EditRecord } from '../../../api/Record';
import 'rc-time-picker/assets/index.css';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import isEqual from 'lodash/isEqual'

class SignleRecord extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            key: 0,
            record: props.record,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.record, this.props.record)) {
            this.setState({
                record: nextProps.record,
                key: this.state.key + 1
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { record } = this.state;
        const Data = {
            dist: record.dist,
            date: record.date,
            time: record.time._d
        };
        if (this.props.id) {
            EditRecord(this.props.id, Data)
                .then(doc => {
                    this.props.updateTable && this.props.updateTable();
                    this.context.router.history.push(`/main`);
                })
        } else {
            AddRecord(Data)
                .then(doc => {
                    this.props.updateTable && this.props.updateTable();
                    this.context.router.history.push(`/main`);
                })
        }
    };

    handleInputChange = e => {
        e.persist();
        this.setState(prevState => ({
            record: {
                ...prevState.record,
                [e.target.name]: e.target.value,
            }
        }));
    };

    handleTimePicker = value => {
        this.setState(prevState => ({
            record: {
                ...prevState.record,
                time: value,
            }
        }));
    };

    render() {
        return (
            <div key={this.state.key} className="createform">
                <h2>{this.props.id ? 'Edit' : 'Add'} Record</h2>
                <form onSubmit={this.handleSubmit} noValidate>
                    <input
                        style={styles.inputStyle}
                        name="date"
                        type="date"
                        value={this.state.record.date}
                        onChange={this.handleInputChange} />
                    <input
                        style={styles.inputStyle}
                        name="dist"
                        type="number"
                        value={this.state.record.dist}
                        onChange={this.handleInputChange}
                    />
                    <TimePicker
                        name='time'
                        value={this.state.record.time}
                        onChange={this.handleTimePicker}
                    />
                    <input
                        style={styles.submitStyle}
                        type="submit" value={this.props.id ? 'Save' : 'Add'} />
                </form>
            </div>
        );
    }
}

const styles = {
    inputStyle: {
        margin: '5px 0',
        display: 'block'
    },
    submitStyle: {
        margin: '5px 0',
        display: 'block',
        padding: '3px 6px',
        cursor: 'pointer'
    }
};

export default SignleRecord