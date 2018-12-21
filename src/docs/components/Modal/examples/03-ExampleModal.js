import React from 'react';

import InfoModal from "doj-react-adminlte/Modal/InfoModal";
import DangerModal from "doj-react-adminlte/Modal/DangerModal";
import WarningModal from "doj-react-adminlte/Modal/WarningModal";
import SuccessModal from "doj-react-adminlte/Modal/SuccessModal";
import DefaultModal from "doj-react-adminlte/Modal/DefaultModal";

export default class ExampleModal extends React.Component {
    render () {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-1">
                        <InfoModal/>
                    </div>
                    <div className="col-sm-1">
                        <DangerModal/>
                    </div>
                    <div className="col-sm-1">
                        <WarningModal/>
                    </div>
                    <div className="col-sm-1">
                        <SuccessModal/>
                    </div>
                    <div className="col-sm-1">
                        <DefaultModal/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}