
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class TopNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone_number: "(306) 764-5467"
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
          <NavItem eventKey={1} href="#"><Glyphicon glyph="earphone"/> { this.state.phone_number }</NavItem>

        </Nav>
      </Navbar>

    );
  }

}

export default TopNavbar;
