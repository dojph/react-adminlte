import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../Form/TextInput';
import Form from "../Form";

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    componentDidMount() {
        this.setState({
            username: "",
            password: ""
        });
    }

    handleFormChange = (name, value) => {
        this.setState({[name]: value});
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.username, this.state.password);
        if(this.props.clearPasswordOnSubmit || this.props.clearUsernameOnSubmit) {
            this.setState({
                ...this.props.clearPasswordOnSubmit && {password: ""},
                ...this.props.clearUsernameOnSubmit && {username: ""}
            });
        }
    };

    render() {
        return (
            <div className="login-box">
                <div className="login-logo">
                    {this.props.title}
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <Form onChange={this.handleFormChange} onEnterKey={this.handleSubmit}>
                        <TextInput name="username" value={this.state.username}
                                   feedbackIconClass="fa fa-user" placeholder={this.props.usernamePlaceholder}/>
                        <TextInput name="password" value={this.state.password} type="password"
                                   feedbackIconClass="fa fa-lock" placeholder={this.props.passwordPlaceholder}/>
                        <button type="button" onClick={this.handleSubmit}
                                className="btn btn-block btn-flat btn-primary">
                            Log In <i className="fa fa-sign-in"/>
                        </button>
                    </Form>
                </div>
            </div>
        );
    }
}

LoginBox.defaultProps = {
    clearUsernameOnSubmit: false,
    clearPasswordOnSubmit: false,
    onSubmit: () => {},
    passwordPlaceholder: "Password",
    usernamePlaceholder: "Username"
};

LoginBox.propTypes = {
    clearUsernameOnSubmit: PropTypes.bool,
    clearPasswordOnSubmit: PropTypes.bool,
    onSubmit: PropTypes.func,
    passwordPlaceholder: PropTypes.string,
    title: PropTypes.node.isRequired,
    usernamePlaceholder: PropTypes.string
};

export default LoginBox;