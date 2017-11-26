import React, { Component } from 'react'
import './form.css'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import { Form, Input, Button,DatePicker,TimePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const dateFormat = 'DD/MM/YYYY';

class RegistrationForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
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
            <div className="createform">
                <h2>{this.props.id ? 'Edit' : 'Add'} Record</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        hasFeedback
                    >

                        <LocaleProvider locale={enUS}>
                            <DatePicker defaultValue={moment('08/08/2017', dateFormat)} format={dateFormat} placeholder='Date'/>
                        </LocaleProvider>

                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        hasFeedback
                    >
                        {getFieldDecorator('Distance', {
                            rules: [{ required: true, message: 'Please input distance!', whitespace: true }],
                        })(
                            <Input placeholder="Distance"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        hasFeedback
                    >
                        <TimePicker defaultValue={moment('00:00:00', 'hh:mm:ss')} placeholder='Time'/>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">{this.props.id ? 'Save' : 'Add'}</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const AddRecord = Form.create()(RegistrationForm);

export default AddRecord