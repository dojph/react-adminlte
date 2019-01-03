import React from 'react';
import Box from "doj-react-adminlte/Box";

class SimpleBox extends React.Component {
    render() {
        const {theme, title, message} = this.props;

        return (
            <div className="col-xs-4">
                <Box collapsible={true} theme={theme}>
                    <Box.Header title={title}/>
                    <Box.Body>
                        {message}
                    </Box.Body>
                </Box>
            </div>
        );
    }
}

export default class ExampleBox extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='row'>
                    <SimpleBox theme="box-default" title="Default"
                               message="Default"/>
                    <SimpleBox theme="box-primary" title="Primary"
                               message="Primary"/>
                    <SimpleBox theme="box-info" title="Info"
                               message="Info"/>
                    <SimpleBox theme="box-warning" title="Warning"
                               message="Warning"/>
                    <SimpleBox theme="box-success" title="Success"
                               message="Success"/>
                    <SimpleBox theme="box-danger" title="Danger"
                               message="Danger"/>
                    <SimpleBox theme="box-solid box-default" title="Default"
                               message="Solid Default"/>
                    <SimpleBox theme="box-solid box-primary" title="Primary"
                               message="Solid Primary"/>
                    <SimpleBox theme="box-solid box-info" title="Info"
                               message="Solid Info"/>
                    <SimpleBox theme="box-solid box-warning" title="Warning"
                               message="Solid Warning"/>
                    <SimpleBox theme="box-solid box-success" title="Success"
                               message="Solid Success"/>
                    <SimpleBox theme="box-solid box-danger" title="Danger"
                               message="Solid Danger"/>
                </div>
            </React.Fragment>
        );
    }
}