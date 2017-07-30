
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class TopNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone_number: "+13069546328"
    }
  }

  formatPhoneNumber(num) {
    let start = 0;
    if(num.charAt(0) === '+') {
      num = num.substring(0 , 2) // +a
            + ' (' + num.substring(2 , 5) + ') ' // _(bbb)_
            + num.substring(5 , 8) + '-' // ccc-
            + num.substring(8 , 12) // dddd
            // num = +a (bbb) ccc-dddd
    }
    return num;
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
            { ' ' + this.formatPhoneNumber(this.state.phone_number) }
          </NavItem>

        </Nav>
      </Navbar>

    );
  }

}

export default TopNavbar;
