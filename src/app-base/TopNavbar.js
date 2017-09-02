
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { formatPhoneNumber } from '../util/string_format';
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
            <LinkContainer to='/'className="navbar-brand" >
              <div>Natural Fresh Grocery & Meat</div>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className="pull-right">
          <NavItem eventKey={1} href={ "tel:" + this.state.phone_number}>
            <Glyphicon glyph="earphone"/>
            { ' ' + formatPhoneNumber(this.state.phone_number) }
          </NavItem>
          {
            this.props.signedIn()
            ? (<LinkContainer to='/'>
                 <NavItem onClick={this.props.signOut}>Sign out</NavItem>
               </LinkContainer>)
            : (<LinkContainer to='/signin'>
                 <NavItem>Sign in</NavItem>
               </LinkContainer>)
          }
        </Nav>
      </Navbar>
    );
  }

}

export default TopNavbar;
