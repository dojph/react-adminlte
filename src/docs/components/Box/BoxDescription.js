import React from "react";
import Box from "doj-react-adminlte/Box";

export default class BoxDescription extends React.Component {
    render() {
        return (
            <Box>
                <Box.Body>
                    Box component is used to keep things more organized and attractive. It is recommended to use BoxHeader, BoxBody, and BoxFooter in a Box.
                </Box.Body>
            </Box>
        );
    }
}