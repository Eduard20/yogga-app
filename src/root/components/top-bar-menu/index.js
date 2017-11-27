import React, { Component } from 'react';
import MainForm from './main-form';
import { getCookie } from '../../helpers';
import Logout from '../logout';
import './styles.css';

export default class TopBarMenu extends Component {
    render() {
        const token = getCookie('token');

        return (
            <div className="root">
                <header>
                    <h2>Jogging app</h2>
                    <div className="form">
                        {
                            !token ? <MainForm /> : <Logout />
                        }
                    </div>
                </header>
            </div>
        )
    }
}