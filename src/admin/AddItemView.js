
import React from 'react';
import fire from '../util/fire';
import { ButtonToolbar, Button, ControlLabel, Form, Row }
  from 'react-bootstrap/lib';
import FileUploadComponent from './FileUploadComponent';
import FormPanel from '../app-base/FormPanel';
import SelectView from './SelectView';

class AddItemView extends React.Component {
  constructor() {
    super();
    this.state = AddItemView.defaultState();
  }

  static defaultState() {
    return {
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

  pushItem(itemInfo) {
    let newItem = {
      ...this.state,
      ...itemInfo
    };
    // Add item to categories selected:
    // Object.keys(newItem.categories).map((category) => {
    //   if(newItem.categories[category]) {
    //     fire.database().ref('/assets/categories/' + category + '/items')
    //       .push(newItem['Item Name'].value)
    //       .then(() => { console.log('Success pushing to categories') })
    //       .catch((error) => { console.log(error) })
    //   } else {
    //     return;
    //   }
    // })
    console.log(newItem);
    this.setState(AddItemView.defaultState());
    this.componentWillMount();
  }

  handleCategoryChange(categories) {
    this.setState({
      ...this.state,
      categories: categories
    });
  }

  render() {
    return (
			<FormPanel
        title='Add a new item'
        size='col-sm-6'
        fields={
          [
            { title:'Item Name', type: 'text'},
            { title:'Price', type: 'text'},
            { title:'Unit', type: 'text'},
            { title:'Description', type: 'text'},
            { title:'Sale Information', type: 'text'}
          ]
        }
        submitName='Add New Item'
        onSubmit={this.pushItem.bind(this)}
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

export default AddItemView;
