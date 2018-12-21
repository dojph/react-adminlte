import React from 'react';

import Box from 'doj-react-adminlte/Box';
import ValueButton from 'doj-react-adminlte/ValueButton';

export default class Success extends React.Component{
    render () {
        return (
            <Box collapsible={true} theme="box box-solid box-success">
                <Box.Header title="Success"/>
                <Box.Body>
                    Success!
                </Box.Body>
                <Box.Footer>
                    <ValueButton className="btn btn-success pull-right">
                        Submit
                    </ValueButton>
                </Box.Footer>
            </Box>
        );
    }
}