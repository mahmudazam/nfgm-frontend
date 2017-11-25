
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { formatPhoneNumber } from '../util/string_format';
import { LinkContainer } from 'react-router-bootstrap/lib';
import fire from '../util/fire';

class TopNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      phone_number: "+13069546328"
    }
  }

  componentDidMount() {
      fire.auth().onAuthStateChanged((user) => {
          this.setState({
              ...this.state,
              user
          });
      });
  }

  render() {
    return (
      <Navbar style={{borderRadius: "0px"}}>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/'className="navbar-brand" >
              <div>Natural Fresh Grocery & Meat</div>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href={ "tel:" + this.state.phone_number}>
              <Glyphicon glyph="earphone"/>
              { ' ' + formatPhoneNumber(this.state.phone_number) }
            </NavItem>
            <NavItem eventKey={2}
                href={"https://www.facebook.com/naturalfreshgroceryandmeat"}
                target={"_blank"}>
              <i className="fa fa-facebook-square"></i>
              acebook
            </NavItem>
            {
              this.state.user
              ? (<LinkContainer to='/'>
                   <NavItem eventKey={3} onClick={this.props.signOut}>
                     Sign out
                   </NavItem>
                 </LinkContainer>)
              : (<LinkContainer to='/signin'>
                   <NavItem eventKey={3}>Sign in</NavItem>
                 </LinkContainer>)
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default TopNavbar;
