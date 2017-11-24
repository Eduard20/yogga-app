import React, { Component } from 'react'
import 'antd/dist/antd.css';

import './header.css'

import { Button } from 'antd';


class Header extends Component {
    render() {
        return(
            <div className="header">
                <header>
                    <h2>Jogging app</h2>
                    <Button type="primary">Logout</Button>
                </header>
            </div>
        )
    }
}

export default Header