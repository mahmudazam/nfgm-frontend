/**
 * Created by tayabsoomro on 2017-07-07.
 */
import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import Home from './tabs/home/Home'
import Products from './tabs/products/Products'



class TabBar extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
        };
    }

    render() {
        return (
            <Tabs bsStyle="pills" defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Home"><Home/></Tab>
                <Tab eventKey={2} title="Products"><Products/></Tab>
                <Tab eventKey={3} title="Order & Delivery">Order and Del</Tab>
                <Tab eventKey={4} title="Contact">Contact</Tab>
            </Tabs>
        );
    }
}
export default TabBar;
