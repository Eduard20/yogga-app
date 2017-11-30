import React, { Component } from 'react'
import './form.css'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { AddRecord, EditRecord } from '../../../api/Record';
import { Form, Input, Button, DatePicker,TimePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEqual from 'lodash/isEqual'

const FormItem = Form.Item;
const dateFormat = 'DD/MM/YYYY';

class RegistrationForm extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            key: 0,
            record: props.record,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.record, this.props.record)) {
            this.setState({
                record: nextProps.record,
                key: this.state.key + 1
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const Data = {
                    dist: values.Distance,
                    date: values['date-picker']._d,
                    time: values.Time._d
                };
                if (this.props.id) {
                    EditRecord(this.props.id, Data)
                } else {
                    AddRecord(Data)
                }
                this.props.updateTable && this.props.updateTable();
                setTimeout(() => {
                    this.context.router.history.push(`/main`);
                }, 100);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 0,
                },
            },
        };

        return (
            <div key={this.state.key} className="createform">
                <h2>{this.props.id ? 'Edit' : 'Add'} Record</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('date-picker', {
                            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                        })(
                            <DatePicker placeholder='Date'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        hasFeedback
                    >
                        {getFieldDecorator('Distance', {
                            rules: [{ required: true, message: 'Please input distance!', whitespace: true }]
                        })(
                            <Input placeholder="Distance"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        hasFeedback
                    >
                        {getFieldDecorator('Time', {
                            rules: [{ required: true, message: 'Please input time!' }]
                        })(
                            <TimePicker placeholder='Time'/>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >{this.props.id ? 'Save' : 'Add'}</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const AddRecordForm = Form.create()(RegistrationForm);

export default AddRecordForm