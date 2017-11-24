import React, { Component } from 'react'
import Header from '../header'
import ReportsTable from './ReportsTable'

class Reports extends Component {
    render() {
        return(
            <div>
                <Header/>
                <ReportsTable/>
            </div>
        )
    }
}

export default Reports