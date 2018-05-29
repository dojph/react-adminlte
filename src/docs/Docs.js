import React from 'react';
// eslint-disable-next-line
import ComponentPage from './ComponentPage';
import componentData from '../../componentData';

import Layout from 'doj-react-adminlte/Layout';
import SidebarTree from "doj-react-adminlte/Layout/SidebarTree";
import SidebarItem from "doj-react-adminlte/Layout/SidebarItem";
import SidebarHeader from "doj-react-adminlte/Layout/SidebarHeader";

import {Redirect} from 'react-router-dom';

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

    render() {
        const componentName = toCamelCase(this.props.match.params.component);
        const component = componentData.find(component => component.name === componentName);

        if(!component) {
            return <Redirect to="/components/alert"/>
        }

        return (
            <Layout>
                <Layout.Sidebar>
                    <SidebarHeader label="Main Navigation"/>
                    <SidebarTree iconClass="fa fa-wrench" label="Components">
                        {
                            componentData.map(c => {
                                const linkName = toParamCase(c.name);
                                return (
                                    <SidebarItem path={`/components/${linkName}`} key={c.name} id={c.name}
                                                 iconClass="fa fa-circle-o" label={c.name}
                                                 onClick={this.handleComponentClick} active={componentName === c.name} />
                                );
                            })

                        }
                    </SidebarTree>
                </Layout.Sidebar>
                <Layout.Body>
                    <ComponentPage component={component}/>
                </Layout.Body>
                <Layout.Footer>
                    <strong>Copyright &copy; 2018 <a href="">Department of Justice</a>.</strong> All rights reserved.
                </Layout.Footer>
            </Layout>
        );
    }
}