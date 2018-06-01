import React from 'react';
import PropTypes from 'prop-types';
import DataTable from "../components/DataTable/DataTable";
import Box from "../components/Box/Box";

const columnDefs = [
    {
        header: 'Name',
        renderValue: 'name'
    },
    {
        header: 'Description',
        renderValue: 'description'
    },
    {
        header: 'Type',
        renderValue: prop => prop.type.name
    },
    {
        header: 'Default',
        renderValue: prop => prop.defaultValue && prop.defaultValue.value
    },
    {
        header: 'Required',
        renderValue: prop => prop.required && <span>&#9679;</span>
    }
];

const Props = ({props}) => {
    const propsArray = Object.keys(props).map(key => ({
        name: key,
        ...props[key]
    }));
    return (
        <Box>
            <Box.Body>
                <DataTable data={propsArray} columnDefs={columnDefs}/>
            </Box.Body>
        </Box>
    );
};

Props.propTypes = {
    props: PropTypes.object.isRequired
};

export default Props;