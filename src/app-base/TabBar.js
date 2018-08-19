/**
 * Created by tayabsoomro on 2017-07-07.
 */
import React from 'react';
import { Nav, NavItem, Navbar, MenuItem, NavDropdown, Col, Row } from 'react-bootstrap/lib/';
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
          <Row>
            <Col md={12} className="container">
              <Navbar style={{ marginBottom: '0'}}>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#home">Natural Fresh Grocery & Meat</a>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav className="pull-right">
                  <LinkContainer to='/home'>
                    <NavItem>Home</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/products'>
                    <NavItem>Products</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/contact'>
                    <NavItem>Contact</NavItem>
                  </LinkContainer>
                  { this.props.user() &&
                    <LinkContainer to='/admin'>
                      <NavItem>Admin</NavItem>
                    </LinkContainer>
                  }
                </Nav>
              </Navbar>
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
          /*

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


          <div className="col-lg-12 text-content">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <Row>
                <Col sm={12}>
                  <Navbar>
                    <Navbar.Header>
                      <Navbar.Brand>
                        <a href="#home">React-Bootstrap</a>
                      </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                      <NavItem eventKey={1} href="#">
                        Link
                      </NavItem>
                      <NavItem eventKey={2} href="#">
                        Link
                      </NavItem>
                      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                        { this.props.user() &&
                          <MenuItem eventKey={3.4}>Separated link</MenuItem>
                        }
                      </NavDropdown>
                    </Nav>
                  </Navbar>
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
          </div> */
        );
    }
}
export default TabBar;
