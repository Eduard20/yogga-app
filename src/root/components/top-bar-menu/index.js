import React, { Component } from 'react';
import MainForm from './main-form';
import './styles.css';

export default class TopBarMenu extends Component {
    render() {
        return (
            <div className="root">
                <header>
                    <h2>Jogging app</h2>
                    <div className="form">
                        <MainForm />
                    </div>
                </header>
            </div>
        )
    }
}