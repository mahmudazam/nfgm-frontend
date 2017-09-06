
import React from 'react';
import Products from '../tabs/products/Products';
import { Col, Panel } from 'react-bootstrap/lib';

class EditProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  editAnItem(item) {
    console.log(item);
  }

  deleteAnItem(item) {
    window.alert("Delete item " + item.Name + "?");
    console.log(item);
  }

  render() {
    let editButton = {
      label: 'Edit',
      bsStyle: 'primary',
      onClick: this.editAnItem.bind(this)
    };
    let deleteButton = {
      label: 'Delete',
      bsStyle: 'default',
      onClick: this.deleteAnItem.bind(this)
    };
    return (
      <Col sm={12}>
        <Panel header="Edit products">
          <Products itemButtons={[ editButton, deleteButton ]}/>
        </Panel>
      </Col>
    );
  }
}

export default EditProducts;
