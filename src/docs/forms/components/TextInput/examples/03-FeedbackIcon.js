import React from 'react'
import Form, {
    TextInput
} from 'doj-react-adminlte/Form';

export default class FeedbackIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            password:""
        };
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value});
    };

    render() {
        const {name,password} = this.state
        return (
            <div>
                <Form onChange={this.handleChange}>
                    <div className="row">
                        <div className="col-xs-6">
                            <TextInput name="name" label="Username" value={name}
                                       placeholder="Username"
                                       feedbackIconClass="fa fa-user login-feedback"
                                       feedbackIconLeft/>
                        </div>
                        <div className="col-xs-6">
                            <TextInput name="password"
                                       value={password}
                                       placeholder="Password"
                                       feedbackIconClass="fa fa-lock login-feedback"
                                       label="Password"
                                       type="password"
                                       feedbackIconLeft/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}