import React from 'react';
import SmallModal from "doj-react-adminlte/Modal/SmallModal";
import LargeModal from "doj-react-adminlte/Modal/LargeModal";

export default class ExampleModal extends React.Component{

    render () {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-1">
                        <SmallModal/>
                    </div>
                    <div className="col-sm-1">
                        <LargeModal/>
                    </div>
                    <div className="col-sm-1">
                        <LargeModal/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}