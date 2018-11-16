import React from 'react';
import InfoBox from "doj-react-adminlte/InfoBox";

export default class ExampleInfoBox extends React.Component {
    render() {
        return (
            <div className="row">
                <InfoBox label="Camera" colorClass="bg-aqua"
                         iconClass="fa fa-camera">Camera</InfoBox>
                <InfoBox label="Database" colorClass="bg-red"
                         iconClass="fa fa-database">Database</InfoBox>
                <InfoBox label="Music" colorClass="bg-green"
                         iconClass="fa fa-music">Music</InfoBox>
                <InfoBox label="Wifi" colorClass="bg-yellow"
                         iconClass="fa fa-wifi">Wifi</InfoBox>
            </div>
        );
    }
}