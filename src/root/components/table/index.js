import React, { Component } from 'react';
import { Column, Table, SortDirection } from 'react-virtualized';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import lodashSort from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import map from 'lodash/map';
import 'react-virtualized/styles.css';
import './styles.css';

export default class ReusableTable extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            sort: {
                sortBy: 'date',
                sortDirection: SortDirection.ASC
            }
        }
    }

    dataSorter = (data = []) => {
        const sortedData = 'date' === this.state.sort.sortBy
            ? this.dateSort(data)
            : lodashSort(data, [this.state.sort.sortBy]);
        return 'ASC' === this.state.sort.sortDirection
            ? sortedData
            : reverse(sortedData);
    };

    dateSort = (data = []) => data.sort((a, b) => moment(b.date, "DD.MM.YYYY").diff(moment(a.date, "DD.MM.YYYY")));

    sortHandler = sort => this.setState({ sort });

    editRecord = rowData => () => {
        this.context.router.history.push(`/main/record/${rowData._id}`);
    };

    deleteRecord = rowData => () => console.log(rowData);

    render() {
        const { sort } = this.state;
        const { headerColumns = [] } = this.props;
        const sortedList = this.dataSorter(this.props.list);
        return (
            <Table
                sortBy={sort.sortBy}
                sortDirection={sort.sortDirection}
                sort={this.sortHandler}
                width={800}
                height={300}
                headerHeight={20}
                rowHeight={30}
                rowCount={sortedList.length}
                rowGetter={({ index }) => sortedList[index]}
                className="virtualized-table"
            >
                {
                    map(headerColumns, ((column, index) => (
                        <Column
                            key={index}
                            disableSort={('edit' === column.DataKey || 'delete' === column.DataKey)}
                            cellRenderer={({rowData}) => {
                                if ('edit' === column.DataKey) {
                                    return <Icon
                                        onClick={this.editRecord(rowData)}
                                        type={'edit'}
                                        style={{ fontSize: 16, color: '#08c', cursor: 'pointer' }}
                                    />
                                }
                                if ('delete' === column.DataKey) {
                                    return <Icon
                                        onClick={this.deleteRecord(rowData)}
                                        type={'delete'}
                                        style={{ fontSize: 16, color: '#08c', cursor: 'pointer' }}
                                    />
                                }
                                return rowData[column.DataKey]
                            }}
                            label={column.Name}
                            dataKey={column.DataKey}
                            width={column.Width}
                        />
                    )))
                }
            </Table>
        )
    }
}
