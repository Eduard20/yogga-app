import React from 'react';
import ReactDOM from 'react-dom';
import App from './MainPage/App';
import RecordsRout from './RecordsReports/index';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <RecordsRout />
    </BrowserRouter>, document.getElementById('root'));
