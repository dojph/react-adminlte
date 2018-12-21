import React from 'react';

import Box from 'doj-react-adminlte/Box';
import ValueButton from 'doj-react-adminlte/ValueButton';

export default class Warning extends React.Component{
    render () {
        return (
            <Box collapsible={true} theme="box box-solid box-warning">
                <Box.Header title="Warning"/>
                <Box.Body>
                    Warning!
                </Box.Body>
                <Box.Footer>
                    <ValueButton className="btn btn-warning pull-right">
                        Submit
                    </ValueButton>
                </Box.Footer>
            </Box>
        );
    }
}