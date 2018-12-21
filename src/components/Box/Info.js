import React from 'react';

import Box from 'doj-react-adminlte/Box';
import ValueButton from 'doj-react-adminlte/ValueButton';

export default class Info extends React.Component{
    render () {
        return (
            <Box collapsible={true} theme="box box-solid box-info">
                <Box.Header title="Info"/>
                <Box.Body>
                    Info!
                </Box.Body>
                <Box.Footer>
                    <ValueButton className="btn btn-info pull-right">
                        Submit
                    </ValueButton>
                </Box.Footer>
            </Box>
        );
    }
}