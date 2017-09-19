
import React from 'react';
import fire from '../util/fire';
import { Panel, ButtonToolbar, Button, ControlLabel, Form, Row, Col }
  from 'react-bootstrap/lib';
import FileUploadComponent from './FileUploadComponent';
import FormPanel from '../app-base/FormPanel';
import SelectView from './SelectView';
import querystring from 'querystring';
import { postFormData } from '../util/HTTPSReq';

class AddCarouselImageView extends React.Component {
  constructor() {
    super();
    this.state = AddCarouselImageView.defaultState();
  }

  static defaultState() {
    return {
      uploading: false,
      image: {
        file: null,
        value: "Please select an image",
        imagePreviewUrl: ""
      }
    };
  }

  pushImage(imageInfo, resetForm) {
    let normalizedImageInfo = Object.keys(imageInfo).reduce((result, key) => {
      result[key.replace(' ', '_').toUpperCase().toLowerCase()] =
        imageInfo[key];
      return result;
    }, {});
    let newImage = {
      ...this.state,
      ...normalizedImageInfo,
      image: this.state.image.file
    };
    if(!this.state.image.file) {
      window.alert("Please select an image");
      return;
    }
    this.setState({
      ...this.state,
      uploading: true
    });
    fire.database().ref('/post_key').once('value').then((snapshot) => {
      let POST_KEY = snapshot.val();
      postFormData({ ...newImage, post_key: POST_KEY }, '/add_carousel_image',
        (xhr) => {
          resetForm();
          this.setState(AddCarouselImageView.defaultState());
          window.alert(xhr.responseText);
      },
        (xhr) => {
          this.setState(AddCarouselImageView.defaultState());
          window.alert(xhr.responseText);
        });
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    if(this.state.uploading) {
      return (
        <Col
          sm={this.props.size.sm}
          md={this.props.size.md}
          lg={this.props.size.lg}>
          <Panel>
            <img src='./assets/img/loading.gif'/>
            <br/>
            <div>Uploading...</div>
          </Panel>
        </Col>
      );
    } else {
      return (
  		<FormPanel
          title='Add a new carousel image'
          size={this.props.size}
          fields={
            [
              { title:'Image Name', type: 'text', optional: false, value: "" },
              { title:'Description', type: 'text', optional: true, value: "" },
            ]
          }
          submitName='Add New Carousel Image'
          onSubmit={this.pushImage.bind(this)}
          onReset={(() => {
            this.setState(this.defaultState());
          }).bind(this)}
        >
          <Row>
            <FileUploadComponent
              image={this.state.image}
              setFile={((imageInfo) => {
                this.setState({
                  ...this.state,
                  image: imageInfo
                });
              }).bind(this) }
              className='col-sm-12'/>
          </Row>
        </FormPanel>
      );
    }
  }
}

export default AddCarouselImageView;
