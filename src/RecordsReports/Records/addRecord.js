import React, { Component } from 'react'
import '../table.css'
import { Link } from 'react-router-dom';

class AddRecord extends Component {
    render() {
        return(
            <div className="addRec">
                <h2>Add New Record</h2>
                <a>
                    <Link to={'/record'}>+</Link>
                </a>
            </div>
        )
    }
}

export default AddRecord