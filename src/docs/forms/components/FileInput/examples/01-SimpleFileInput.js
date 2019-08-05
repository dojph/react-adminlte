import React from 'react'
import Form, {
    FileInput
} from 'doj-react-adminlte/Form';

export default class SimpleFileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    render() {
        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-6">
                        <FileInput name="file" label="File Upload"/>
                    </div>
                </div>
            </Form>
        );
    }
}