import React from 'react';

import Box from 'doj-react-adminlte/Box';
import ValueButton from 'doj-react-adminlte/ValueButton';

export default class Primary extends React.Component{
    render () {
        return (
            <Box collapsible={true} theme="box box-solid box-primary">
                <Box.Header title="Primary"/>
                <Box.Body>
                    Primary!
                </Box.Body>
                <Box.Footer>
                    <ValueButton className="btn btn-primary pull-right">
                        Submit
                    </ValueButton>
                </Box.Footer>
            </Box>
        );
    }
}