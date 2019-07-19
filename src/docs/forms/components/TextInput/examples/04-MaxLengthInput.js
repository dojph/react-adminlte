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
                                       placeholder="Username - Max Length 10"
                                       maxLength={10}/>
                        </div>
                        <div className="col-xs-6">
                            <TextInput name="password"
                                       value={password}
                                       placeholder="Password - Max Length 7"
                                       label="Password"
                                       type="password"
                                       maxLength={7}/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}