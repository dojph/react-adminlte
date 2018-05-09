import React from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';

import Layout from 'doj-react-adminlte/Layout';
import SidebarTree from "doj-react-adminlte/Layout/SidebarTree";
import SidebarItem from "doj-react-adminlte/Layout/SidebarItem";
import SidebarHeader from "doj-react-adminlte/Layout/SidebarHeader";

export default class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1)
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({route: window.location.hash.substr(1)})
        })
    }

    handleComponentClick = name => {
        window.location = `#${name}`;
    };

    render() {
        const {route} = this.state;
        const component = route ? componentData.filter( component => component.name === route)[0] : componentData[0];

        // return (
        //     <div>
        //         <Navigation components={componentData.map(component => component.name)} />
        //         <ComponentPage component={component} />
        //     </div>
        // )
        return (
            <Layout>
                <Layout.Sidebar>
                    <SidebarHeader label="Main Navigation"/>
                    <SidebarTree iconClass="fa fa-wrench" label="Components">
                        {
                            componentData.map(c =>
                                <SidebarItem key={c.name} id={c.name} iconClass="fa fa-circle-o" label={c.name}
                                             onClick={this.handleComponentClick} active={route === c.name} />)
                        }
                    </SidebarTree>
                </Layout.Sidebar>
                <Layout.Content>
                    Content
                </Layout.Content>
                <Layout.Footer>
                    <strong>Copyright &copy; 2018 <a href="">Department of Justice</a>.</strong> All rights reserved.
                </Layout.Footer>
            </Layout>
        );
    }
}