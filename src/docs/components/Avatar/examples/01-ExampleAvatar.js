import React from 'react';
import Avatar from 'doj-react-adminlte/Avatar';

export default class ExampleAlert extends React.Component {
    render() {
        return (
            <Avatar firstName='Maynard'
                    lastName='Montefalcon'
                    round={true}>
            </Avatar>
        );
    }
}