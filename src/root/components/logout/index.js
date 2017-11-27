import React, { Component } from 'react';
import { eraseCookie } from "../../helpers/cookie";
import PropTypes from 'prop-types';

export default class Logout extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleSubmit = () => {
        eraseCookie('token');
        this.context.router.history.push(`/`);
    };
    render() {
        return(
            <span style={{
                padding: '10px',
                cursor: 'pointer'
            }} onClick={this.handleSubmit}>Logout</span>
        )
    }
}