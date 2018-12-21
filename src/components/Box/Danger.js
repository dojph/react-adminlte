import React from 'react';

import Box from 'doj-react-adminlte/Box';
import ValueButton from 'doj-react-adminlte/ValueButton';

export default class Danger extends React.Component{
    render () {
        return (
            <Box collapsible={true} theme="box box-solid box-danger">
                <Box.Header title="Danger"/>
                <Box.Body>
                    Danger!
                </Box.Body>
                <Box.Footer>
                    <ValueButton className="btn btn-danger pull-right">
                        Submit
                    </ValueButton>
                </Box.Footer>
            </Box>
        );
    }
}