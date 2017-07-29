/**
 * Created by tayabsoomro on 2017-07-07.
 */
import React from 'react';
import { Tab, Nav, NavItem, Col, Row } from 'react-bootstrap/lib/'
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
          <Tab.Container id="tab-container" defaultActiveKey="home">
            <Row>
              <Col sm={12}>
                <Nav className="tabs" bsStyle="tabs">
                  <NavItem eventKey="home">Home</NavItem>
                  <NavItem eventKey="products">Products</NavItem>
                  <NavItem eventKey="contact">Contact</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                    <Tab.Pane eventKey="home"><Home/></Tab.Pane>
                    <Tab.Pane eventKey="products"><Products/></Tab.Pane>
                    <Tab.Pane eventKey="contact">Contact</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        );
    }
}
export default TabBar;
