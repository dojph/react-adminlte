import React from 'react';
import PropTypes from 'prop-types';
import LoginBox from "./LoginBox";

class Login extends React.Component {
    render() {
        return (
            <div className="hold-transition login-page">
                <LoginBox title={this.props.title}
                          onSubmit={this.props.onSubmit}
                          clearUsernameOnSubmit={this.props.clearUsernameOnSubmit}
                          clearPasswordOnSubmit={this.props.clearPasswordOnSubmit}
                />
            </div>
        );
    }
}

Login.defaultProps = {
    clearPasswordOnSubmit: false,
    clearUsernameOnSubmit: false,
    onSubmit: () => {}
};

Login.propTypes = {
    clearPasswordOnSubmit: PropTypes.bool,
    clearUsernameOnSubmit: PropTypes.bool,
    onSubmit: PropTypes.func,
    title: PropTypes.node.isRequired
};

export default Login;