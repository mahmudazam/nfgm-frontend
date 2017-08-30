
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { formatPhoneNumber } from '../util/string_format';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap/lib';

class TopNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone_number: "+13069546328"
    }
  }

  render() {
    return (
      <Navbar id="top-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" className="navbar-brand" >Natural Fresh Grocery & Meat</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className="pull-right">
          <NavItem eventKey={1} href={ "tel:" + this.state.phone_number}>
            <Glyphicon glyph="earphone"/>
            { ' ' + formatPhoneNumber(this.state.phone_number) }
          </NavItem>
          <LinkContainer to='/signin'>
            <NavItem>Login</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }

}

export default TopNavbar;
