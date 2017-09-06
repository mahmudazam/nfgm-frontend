
import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import fire from '../util/fire';
import AddItemView from './AddItemView';
import AddCategoryView from './AddCategoryView';
import EditProducts from './EditProducts';

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-sm-12'>
        <AddItemView/>
        <AddCategoryView/>
        <EditProducts/>
      </div>
    );
  }
}

export default Admin;
