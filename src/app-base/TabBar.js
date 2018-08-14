/**
 * Created by tayabsoomro on 2017-07-07.
 */
import React from 'react';
import { Nav, NavItem, Col, Row } from 'react-bootstrap/lib/';
import Home from '../tabs/home/Home';
import Products from '../tabs/products/Products';
import Contact from '../tabs/contact/Contact';
import Admin from '../admin/Admin';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap/lib';

class TabBar extends React.Component {
    renderProducts() {
      return (<Products itemButtons={[]}
                        categoryButtons={[]}/>);
    }

    render() {
        return (
          <div className="col-lg-12 text-content">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <Row>
                <Col sm={12}>
                  <Nav className="tabs" bsStyle="pills">
                    <LinkContainer to='/home'>
                      <NavItem>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/products'>
                      <NavItem>Products</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/contact'>
                      <NavItem>Contact</NavItem>
                    </LinkContainer>
                    { this.props.user()
                        ? (<LinkContainer to='/admin'>
                            <NavItem>Admin</NavItem>
                          </LinkContainer>)
                        : null
                    }
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Route path='/home' component={Home}/>
                  <Route path='/products' component={this.renderProducts}/>
                  <Route path='/contact' component={Contact}/>
                  { this.props.user()
                      ? (<Route path='/admin' component={Admin}/>)
                      : null
                  }
                </Col>
              </Row>
            </div>
            <div className="col-lg-1"></div>
          </div>
        );
    }
}
export default TabBar;
