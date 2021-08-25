import React from 'react';
import Avatar from 'doj-react-adminlte/Avatar';

export default class ExampleAlert extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-2">
                        <Avatar
                            firstName='Chelzy'
                            lastName='Baldovino'
                            round={true}/>
                        <h5>Rounded Avatar</h5>
                    </div>
                    <div className='col-md-2'>
                        <Avatar
                            firstName='Chelzy'
                            lastName='Baldovino'/>
                        <h5>Not Rounded Avatar</h5>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}