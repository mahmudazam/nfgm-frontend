
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class TopNavbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar id="top-navbar">
      <Navbar.Header>
      <Navbar.Brand>
      <a href="#">Natural Fresh Grocery & Meat</a>
      </Navbar.Brand>
      </Navbar.Header>
      <Nav>
      <NavItem eventKey={1} href="#">Link</NavItem>
      <NavItem eventKey={2} href="#">Link</NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Action</MenuItem>
      <MenuItem eventKey={3.2}>Another action</MenuItem>
      <MenuItem eventKey={3.3}>Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>
      </Nav>
      </Navbar>

    );
  }

}

export default TopNavbar;
