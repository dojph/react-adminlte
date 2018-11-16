import React from 'react';

import DataTable from 'doj-react-adminlte/DataTable';
import Box from 'doj-react-adminlte/Box';

const columnDefs = [
    {
        header: 'ID',
        renderValue: 'id'
    },
    {
        header: 'First Name',
        renderValue: 'fname'
    },
    {
        header:'Last Name',
        renderValue: 'lname'
    }
];

const data = [
    {
        id: '01',
        fname: 'Russel',
        lname: 'Balboa'
    },
    {
        id: '02',
        fname: 'JL',
        lname: 'Cotto'
    },
    {
        id: '03',
        fname: 'John',
        lname: 'Pacquiao'
    },

    {
        id: '04',
        fname: 'Pia',
        lname: 'Ayala'
    },
    {
        id: '05',
        fname: 'Jose',
        lname: 'Manalo'
    },
];

export default class DataTables extends React.Component{
    render(){

        return (
        <div>
            <Box>
                <Box.Header title="Sample Data"/>
                <Box.Body>
                    <DataTable columnDefs={columnDefs} data={data}/>
                </Box.Body>
            </Box>
        </div>
        );
    }
}