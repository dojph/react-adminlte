import React from 'react';
import Box from 'doj-react-adminlte/Box';

export default class AlertDescription extends React.Component {
    render() {
        return (
            <Box>
            <Box.Body>
                Alert components are mainly used for displaying a contextual feedback messages based on the result of a particular action.
                Alert components have four default types, these are success, info, warning and danger alerts.
            </Box.Body>
            </Box>
        );
    }
}