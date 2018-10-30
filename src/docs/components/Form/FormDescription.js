import React from 'react';

export default class FormDescription extends React.Component {
    render() {
        return (
            <div>
            <p>Form component is used so that a user can input a data and send it to a server for processing.  </p>
                <p>Form elements: </p>
                <ul>
                    <li>TextInput</li>
                    <li>TextArea</li>
                    <li>ValueButton</li>
                    <li>SelectInput</li>
                    <li>RadioGroup</li>
                    <li>CheckBox</li>
                    <li>FileInput</li>
                </ul>
            </div>
        );
    }
}