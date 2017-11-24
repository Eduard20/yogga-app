import React, { Component } from 'react'
import MainForm from './form'
import './mainHeader.css'

class MainHeader extends  Component {
    render() {
        return(
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

export default MainHeader