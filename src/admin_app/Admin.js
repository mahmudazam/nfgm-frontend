
import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import fire from '../util/fire';

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-sm-12'>
        <Panel>
          <h1>Admin Page</h1>
          <Button bsStyle='primary' onClick={() => {
            fire.auth().signOut().then((() => {
              window.alert("Signed out");
              this.props.notify()
            }).bind(this));
          }}>Sign out</Button>
        </Panel>
      </div>
    );
  }
}

export default Admin;
