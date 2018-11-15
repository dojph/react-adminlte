import React from 'react';
import Box from "doj-react-adminlte/Box";

import Form, {
    TextInput
} from 'doj-react-adminlte/Form';
import ValueButton from "doj-react-adminlte/ValueButton";

export default class ExampleBox extends React.Component {

    handleFormChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {

        return (
                <Form>
                    <div className='row'>
                        <div className='col-xs-4'>
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
                    </div>
                        <div className='col-xs-4'>
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
                        </div>
                        <div className='col-xs-4'>
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
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-4'>
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
                        </div>
                        <div className='col-xs-4'>
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
                        </div>
                        <div className='col-xs-4'>
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
                        </div>
                    </div>
                </Form>
        );
    }
}