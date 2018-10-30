import React from 'react';

import DataTable from 'doj-react-adminlte/DataTable';

const columnDefs = [
    {
        header: 'ID',
        renderValue: 'id'
    },
    {
        header: 'Employee Name',
        renderValue: 'name'
    },
    {
        header:'Salary',
        renderValue: 'salary'
    }
];

export default class DataTables extends React.Component{
    render(){

        const {data} = this.props;
        return (
            <DataTable columnDefs={columnDefs} data={data}/>
        );
    }
}