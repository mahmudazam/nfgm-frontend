
import React from 'react';
import fire from '../util/fire';
import { Panel, ButtonToolbar, Button, ControlLabel, Form, Row, Col }
  from 'react-bootstrap/lib';
import FileUploadComponent from './FileUploadComponent';
import FormPanel from '../app-base/FormPanel';
import SelectView from './SelectView';
import querystring from 'querystring';
import { postFormData } from '../util/HTTPSReq';

class AddItemView extends React.Component {
  constructor() {
    super();
    this.state = AddItemView.defaultState();
  }

  static defaultState() {
    return {
      uploading: false,
      categories: {},
      image: {
        file: null,
        value: "Please select an image",
        imagePreviewUrl: ""
      }
    };
  }

  loadCategoriesAndRender() {
    let catRef = fire.database().ref('assets/categories').orderByKey();
    catRef.on('value', ((snapshot) => {
      if(null == snapshot.val() || undefined == snapshot.val()) {
          this.setState(AddItemView.defaultState());
          return;
      }
      this.setState({
        ...AddItemView.defaultState(),
        categories: Object.keys(snapshot.val()).reduce(((result, name) => {
          result[name] = false
          return result;
        }), {})
      })
    }).bind(this));
  }

  componentWillMount() {
    this.loadCategoriesAndRender();
  }

  pushItem(itemInfo, resetForm) {
    let normalizedItemInfo = Object.keys(itemInfo).reduce((result, key) => {
      result[key.replace(' ', '_').toUpperCase().toLowerCase()] = itemInfo[key];
      return result;
    }, {});
    let newItem = {
      ...this.state,
      ...normalizedItemInfo,
      image: this.state.image.file,
      categories: JSON.stringify(Object.keys(this.state.categories).reduce(
        (result, category) => {
          if(this.state.categories[category]) {
            result.push(category);
          }
          return result;
        }, []))
    };
    if(newItem.categories.length <= 0) {
      window.alert("Please select at least one category");
      return;
    }
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
      postFormData({ ...newItem, post_key: POST_KEY }, '/add_item',
        (xhr) => {
          resetForm();
          this.loadCategoriesAndRender();
          window.alert(xhr.responseText);
        },
        (xhr) => {
          this.loadCategoriesAndRender();
          window.alert(xhr.responseText);
        });
    }).catch((error) => {
      console.log(error);
    })
  }

  handleCategoryChange(categories) {
    this.setState({
      ...this.state,
      categories: categories
    });
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
          title='Add a new item'
          size={this.props.size}
          fields={
            [
              { title:'Item Name', type: 'text', optional: false, value: "" },
              { title:'Price', type: 'text', optional: false, value: "" },
              { title:'Unit', type: 'text', optional: false, value: "" },
              { title:'Description', type: 'text', optional: false, value: "" },
              { title:'Sale Information', type: 'text', optional: true, value: "" }
            ]
          }
          submitName='Add New Item'
          onSubmit={this.pushItem.bind(this)}
          onReset={(() => {
            this.loadCategoriesAndRender();
          }).bind(this)}
        >
          <ControlLabel>Select Categories</ControlLabel>
          <Row>
            <SelectView
              className='col-sm-12'
              categories={this.state.categories}
              setCategories={this.handleCategoryChange.bind(this)}/>
            </Row>
          <ControlLabel>Image</ControlLabel>
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

export default AddItemView;
