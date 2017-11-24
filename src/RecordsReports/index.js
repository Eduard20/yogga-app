import React, { Component } from 'react'
import Records from './Records/index'
import AddRecord from './recordForm'
import Reports from './Reports/index'

class RecordsRout extends Component {
    render() {
        return (
            <div>
               <Records />
                <AddRecord />
            </div>
        )
    }
}

export default RecordsRout
