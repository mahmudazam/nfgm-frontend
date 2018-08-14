
import React from 'react';
import { Button, ButtonToolbar, Col, Modal, Panel, Thumbnail }
  from 'react-bootstrap/lib';
import { postFormData } from '../util/HTTPSReq';
import fire from '../util/fire';

class EditCarouselView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        images: {},
        selectedImage: null,
        showDeleteImageModal: false
    };
  }

  componentWillMount() {
    fire.database().ref('/assets/carousel/').orderByKey().on('value',
        ((snapshot) => {
            if(null === snapshot.val() || undefined === snapshot.val()) {
                this.setState({
                    images: {},
                    selectedImage: null,
                    showDeleteImageModal: false
                });
                return;
            }
            this.setState({
                ...this.state,
                images: snapshot.val()
            });
        })
    );
  }

  editAnImage(image) {
    console.log(image);
  }

  deleteSelectedImage() {
    fire.database().ref('/post_key').once('value').then((snapshot) => {
      let POST_KEY = snapshot.val();
      let imageInfo = {
        image: this.state.selectedImage,
        post_key: POST_KEY
      };
      postFormData(
        imageInfo,
        '/delete_carousel_image',
        (xhr) => { window.alert(xhr.responseText); },
        (xhr) => { window.alert(xhr.responseText); }
      );
      this.setState({
          ...this.state,
          showDeleteImageModal: false,
          selectedImage: null
      });
    })
  }

  render() {
    return (
      <Col
        sm={this.props.size.sm}
        md={this.props.size.md}
        lg={this.props.size.lg}>
        <Panel header="Edit Carousel">
            { this.state.images !== undefined && this.state.images !== null
                && Object.keys(this.state.images).length !== 0
              ? Object.keys(this.state.images).map((image) =>
                <Thumbnail
                        key={image}
                        src={this.state.images[image].asset_url}
                        alt="242x200">
                    <h3>{image}</h3>
                    { "" !== this.state.images[image].description
                        ? <p>
                            Description: {this.state.images[image].description}
                          </p>
                        : null
                    }
                    <p>Upload Time: {this.state.images[image].upload_time}</p>
                    <p>
                        <Button onClick={() => {}} bsStyle="primary">
                          Edit
                        </Button>&nbsp; {/* Separator */}
                        <Button
                            onClick={ () => {
                                this.setState({
                                    ...this.state,
                                    selectedImage: image,
                                    showDeleteImageModal: true
                                });
                            }}
                            bsStyle="danger">
                            Delete
                        </Button>
                    </p>
                </Thumbnail>
            )
            : <div>No images in carousel</div>
            }
        </Panel>

        <Modal
          show={this.state.showDeleteImageModal}
          onHide={ () => {
              this.setState({...this.state, showDeleteImageModal: false});
          }}>
          <Modal.Header closeButton>
            <Modal.Title>
              Delete image
              {
                this.state.imageSelected
                ? " " + this.state.imageSelected.image_name
                : null
              }
              ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This image will be removed from all categories and
            cannot be recovered.
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                bsStyle='danger'
                onClick={this.deleteSelectedImage.bind(this)}>
                Confirm
              </Button>
              <Button
                onClick={() => {
                    this.setState({...this.state, showDeleteImageModal: false});
                }}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

export default EditCarouselView;
