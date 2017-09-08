
import React from 'react';
import Products from '../tabs/products/Products';
import { Button, ButtonToolbar, Col, Modal, Panel }
  from 'react-bootstrap/lib';
import { postFormData } from '../util/HTTPSReq';
import fire from '../util/fire';

class EditProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteItemModal: false,
      showEditItemModal: false,
      itemSelected: null
    };
  }

  componentWillMount() {
  }

  editAnItem(item) {
    console.log(item);
  }

  showDeleteItemModal(show) {
    return (function(item) {
      this.setState({
        ...this.state,
        itemSelected: item,
        showDeleteItemModal: show
      });
    }).bind(this);
  }

  deleteSelectedItem() {
    fire.database().ref('/post_key').once('value').then((snapshot) => {
      let POST_KEY = snapshot.val();
      let itemInfo = {
        ...this.state.itemSelected,
        categories: Object.keys(this.state.itemSelected.categories),
        post_key: POST_KEY
      };
      postFormData(
        itemInfo,
        '/delete_item',
        (xhr) => { window.alert(xhr.responseText); },
        (xhr) => { window.alert(xhr.responseText); }
      );
      console.log(itemInfo);
      this.showDeleteItemModal(false)(null);
    })
  }

  render() {
    let editButton = {
      label: 'Edit',
      bsStyle: 'primary',
      onClick: this.editAnItem.bind(this)
    };
    let deleteButton = {
      label: 'Delete',
      bsStyle: 'danger',
      onClick: this.showDeleteItemModal(true)
    };
    return (
      <Col sm={12}>
        <Panel header="Edit products">
          <Products itemButtons={[ editButton, deleteButton ]}/>
        </Panel>
        <Modal
          show={this.state.showDeleteItemModal}
          onHide={this.showDeleteItemModal(null)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Delete item
              {
                this.state.itemSelected
                ? " " + this.state.itemSelected.item_name
                : null
              }
              ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This item will be removed from all categories and
            cannot be recovered.
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                bsStyle='danger'
                onClick={this.deleteSelectedItem.bind(this)}>
                Confirm
              </Button>
              <Button
                onClick={this.showDeleteItemModal(false)}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

export default EditProducts;
