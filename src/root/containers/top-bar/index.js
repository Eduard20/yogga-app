import React, { Component } from 'react';
import TopBarMenu from '../../components/top-bar-menu';
import { GetRecords } from '../../../api/Record';

export default class TopBar extends Component {

    componentWillMount() {
        GetRecords()
            .then(r => console(r, 'this is sparta'));
    }

    render() {
        return (
            <TopBarMenu />
        )
    }
}