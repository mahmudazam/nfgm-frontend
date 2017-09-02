
import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import fire from '../util/fire';
import AddItemView from './AddItemView';

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-sm-12'>
        <AddItemView/>
      </div>
    );
  }
}

export default Admin;
