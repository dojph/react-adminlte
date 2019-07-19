import React from 'react'
import Form, {
    TextInput
} from 'doj-react-adminlte/Form';

export default class SimpleTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    render() {
        const {text} = this.state;
        const errors = {
            comments: ['Empty Field']
        };
        return (
            <div>
                <Form onChange={this.handleChange} errors={errors}>
                    <div className="row">
                        <div className="col-xs-12">
                            <TextInput name="text"
                                       type="text"
                                       label="Text"
                                       value={text}
                                       placeholder="Type = Text"/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}