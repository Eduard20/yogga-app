import React, { Component } from 'react'
import RecordsTable from './RecordsTable'
import Header from '../header'
import AddRecord from './addRecord'
import './table.css'

class Records extends Component {
    render() {
        return(
            <div>
                <Header/>
                <div className="records">
                    <div className="left">
                        <RecordsTable />
                    </div>
                    <div className="right">
                        <AddRecord />
                    </div>
                </div>
            </div>
        )
    }
}

export default Records