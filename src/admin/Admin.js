
import React from 'react';
import { Col, Row } from 'react-bootstrap';
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
      <Col sm={12}>
        <Col sm={12} md={5} lg={5}>
          <AddItemView size={{sm: 12, md:12, lg: 12}}/>
          <AddCategoryView size={{sm: 12, md:12, lg: 12}}/>
        </Col>
        <Col sm={12} md={7} lg={7}>
          <EditProducts size={{sm: 12, md:12, lg: 12}}/>
        </Col>
      </Col>
    );
  }
}

export default Admin;
