
import React from 'react';
import { Col } from 'react-bootstrap';
import AddItemView from './AddItemView';
import AddCategoryView from './AddCategoryView';
import AddCarouselImageView from './AddCarouselImageView';
import EditProducts from './EditProducts';
import EditCarouselView from './EditCarouselView';

class Admin extends React.Component {
  render() {
    return (
      <Col className='major-content' sm={12}>
        <Col sm={12} md={5} lg={5}>
          <AddItemView size={{sm: 12, md:12, lg: 12}}/>
          <AddCategoryView size={{sm: 12, md:12, lg: 12}}/>
          <AddCarouselImageView size={{sm: 12, md:12, lg: 12}}/>
        </Col>
        <Col sm={12} md={7} lg={7}>
          <EditProducts size={{sm: 12, md:12, lg: 12}}/>
          <EditCarouselView size={{sm: 12, md:12, lg: 12}}/>
        </Col>
      </Col>
    );
  }
}

export default Admin;
