import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Reports from '../reports';
import Records from '../records';
import { GetRecords } from '../../../api/Record';
import './styles.css';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReports: true,
            records: []
        }
    }

    componentWillMount(){
        GetRecords()
            .then(doc => {
                this.setState({ records: doc.payload })
            }, err => console.error(err));
    }

    showReports = () => this.setState({ showReports: true });

    showRecords = () => this.setState({ showReports: false });

    render() {
        return (
            <div>
                <div style={{
                    display: 'inline-block',
                    verticalAlign: 'top'
                }}>
                    <div>
                        <span className="buttonStyles" onClick={this.showReports}>Reports</span>
                        <span className="buttonStyles" onClick={this.showRecords}>Records</span>
                    </div>
                    <div>
                        { this.state.showReports
                            ? <Reports list={this.state.records} />
                            : <Records list={this.state.records} />
                        }
                    </div>
                </div>
                <div style={{
                    display: 'inline-block',
                    verticalAlign: 'top'
                }}>
                    <span className="buttonStyles">
                        <Link to={'/main/record'}>Add</Link>
                    </span>
                </div>
            </div>
        )
    }
}