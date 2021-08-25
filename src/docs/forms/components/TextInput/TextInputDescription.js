import React from 'react';

export default class TextInputDescription extends React.Component {
    render() {
        return (
            <div>
                <p>
                    Text Inputs are mainly used for enabling the users to input text information that will be used by the program.
                    <br/>There are 2 Types of TextInput:
                </p>
                <ul>
                    <li>
                        Text
                    </li>
                    <li>
                        Password
                    </li>
                </ul>
            </div>
        );
    }
}