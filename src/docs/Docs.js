import React from 'react';
import ComponentDocs from "./ComponentDocs";

import componentData from '../componentData';
import formData from '../formData';

import Layout from 'doj-react-adminlte/Layout';
import SidebarTree from "doj-react-adminlte/Layout/SidebarTree";
import SidebarItem from "doj-react-adminlte/Layout/SidebarItem";

import SidebarHeader from "doj-react-adminlte/Layout/SidebarHeader";
import {Switch, Route} from 'react-router-dom';
import FormDocs from "./FormDocs";

const toCamelCase = (string) => {
    return string.replace(/(-\w)/g, function(m){return m[1].toUpperCase();})
        .replace(/^\w/, c => c.toUpperCase());
};

const toParamCase = (string) => {
    return string.split(/(?=[A-Z])/g).map(function(value){ return value.charAt(0).toLowerCase()+ value.substring(1)})
        .join("-")
};

export default class Docs extends React.Component {
    handleComponentClick = name => {
        const paramName = toParamCase(name);
        this.props.history.push(`/components/${paramName}`);
    };

    handleFormClick = name => {
        const paramName = toParamCase(name);
        this.props.history.push(`/forms/${paramName}`);
    };

    render() {
        const sub = this.props.match.params.sub;
        const subName = sub && toCamelCase(sub);

        return (
            <Layout>
                <Layout.Sidebar>
                    <SidebarHeader label="Main Navigation"/>
                    <SidebarTree iconClass="fa fa-wrench" label="Components">
                        {
                            componentData.map(c => {
                                const linkName = toParamCase(c.name);
                                return (
                                    <SidebarItem path={`${process.env.PUBLIC_URL}/components/${linkName}`} key={c.name}
                                                 id={c.name} iconClass="fa fa-circle-o" label={c.name}
                                                 onClick={this.handleComponentClick} active={subName === c.name} />
                                );
                            })
                        }
                    </SidebarTree>
                    <SidebarTree iconClass="fa fa-check-square-o" label="Forms">
                        <SidebarItem path={`${process.env.PUBLIC_URL}/forms/usage`} key="usage"
                                     id="usage" iconClass="fa fa-circle-o" label="Usage"
                                     onClick={this.handleFormClick} active={subName === "Usage"} />
                        {
                            formData.components.map(c => {
                                const linkName = toParamCase(c.name);
                                return (
                                    <SidebarItem path={`${process.env.PUBLIC_URL}/forms/${linkName}`} key={c.name}
                                                 id={c.name} iconClass="fa fa-circle-o" label={c.name}
                                                 onClick={this.handleFormClick} active={subName === c.name}/>
                                );
                            })
                        }
                    </SidebarTree>
                </Layout.Sidebar>
                <Layout.Body>
                    <Switch>
                        <Route exact path="/components/:component" component={ComponentDocs}/>
                        <Route exact path="/forms/:item" component={FormDocs} />
                    </Switch>
                </Layout.Body>
                <Layout.Footer>
                    <strong>Copyright &copy; 2018 - 2019 <a href="">Department of Justice</a>.</strong> All rights reserved.
                </Layout.Footer>
            </Layout>
        );
    }
}