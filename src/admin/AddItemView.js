
import React from 'react';
import fire from '../util/fire';
import { Panel, ButtonToolbar, Button, ControlLabel, Form, Row }
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

  componentWillMount() {
    let catRef = fire.database().ref('assets/categories').orderByKey();
    catRef.once('value').then(((snapshot) => {
      this.setState({
        ...this.state,
        categories: Object.keys(snapshot.val()).reduce(((result, name) => {
          result[name] = false
          return result;
        }), {})
      })
    }).bind(this));
  }

  pushItem(itemInfo, resetForm) {
    let newItem = {
      ...this.state,
      ...itemInfo,
      image: this.state.image.file,
      categories: Object.keys(this.state.categories).reduce(
        (result, category) => {
          if(this.state.categories[category]) {
            result.push(category);
          }
          return result;
        }, [])
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
          this.setState(AddItemView.defaultState());
          this.componentWillMount();
          window.alert(xhr.responseText);
        },
        (xhr) => {
          this.setState(AddItemView.defaultState());
          this.componentWillMount();
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
        <Panel>
          <img src='./img/loading.gif'/>
          <br/>
          <div>Uploading</div>
        </Panel>
      );
    } else {
      return (
  			<FormPanel
          title='Add a new item'
          size='col-sm-6'
          fields={
            [
              { title:'Item Name', type: 'text', optional: false },
              { title:'Price', type: 'text', optional: false },
              { title:'Unit', type: 'text', optional: false },
              { title:'Description', type: 'text', optional: false },
              { title:'Sale Information', type: 'text', optional: true }
            ]
          }
          submitName='Add New Item'
          onSubmit={this.pushItem.bind(this)}
          onReset={(() => {
            this.setState(AddItemView.defaultState());
            this.componentWillMount();
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
              className='col-sm-6'/>
          </Row>
        </FormPanel>
      );
    }
  }
}

export default AddItemView;
