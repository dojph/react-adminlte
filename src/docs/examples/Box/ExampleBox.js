import React from 'react';
import Box from "doj-react-adminlte/Box";

export default class ExampleBox extends React.Component {
    render() {
        return (
            <Box>
                <Box.Header title="Test Title"/>
                <Box.Body>
                    Test Body
                </Box.Body>
                <Box.Footer>
                    Test Footer
                </Box.Footer>
            </Box>
        );
    }
}