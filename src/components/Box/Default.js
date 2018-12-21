import React from 'react';
import Box from 'doj-react-adminlte/Box';
import ValueButton from 'doj-react-adminlte/ValueButton';

export default class Default extends React.Component{
    render () {
        return (
            <Box collapsible={true} theme="box box-solid box-default">
                <Box.Header title="Default"/>
                <Box.Body>
                    Default!
                </Box.Body>
                <Box.Footer>
                    <ValueButton className="btn btn-default pull-right">
                        Submit
                    </ValueButton>
                </Box.Footer>
            </Box>
        );
    }
}