import React from 'react';
import Login from "doj-react-adminlte/Login";

export default class ExampleLoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        }
    }

    handleSubmit = (username, password) => {
        console.log(username, password);

        if(username) {
            this.setState({username, password, loggedIn: true});
        }
    };

    handleLogout = () => {
        this.setState({username: "", password: "", loggedIn: false});
    };

    renderLoggedIn = () => {
        return (
            <div>
                <p>You are logged in as [{this.state.username}] (using PASSWORD: {this.state.password || "NO"})</p>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    };

    renderLoggedOut = () => {
        return (
            <Login title={<React.Fragment><strong>Admin</strong>LTE</React.Fragment>}
                   onSubmit={this.handleSubmit}
                   clearUsernameOnSubmit
                   clearPasswordOnSubmit
            />
        );
    };

    render() {
        return this.state.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}