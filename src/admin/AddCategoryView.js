
import React from 'react';
import fire from '../util/fire';
import { Panel, ButtonToolbar, Button, ControlLabel, Form, Row }
  from 'react-bootstrap/lib';
import FormPanel from '../app-base/FormPanel';
import { postFormData } from '../util/HTTPSReq';

class AddCategoryView extends React.Component {
  constructor() {
    super();
    this.state = AddCategoryView.defaultState();
  }

  static defaultState() {
    return {
      uploading: false,
    };
  }

  pushCategory(categoryInfo) {
    this.setState({
      uploading: true
    });
    fire.database().ref('/post_key').once('value').then((snapshot) => {
      let newCategory = {
        name: categoryInfo['Category Name'],
        post_key: snapshot.val()
      };
      postFormData(newCategory, '/add_category',
        (xhr) => {
          this.setState({
            uploading: false
          });
          window.alert(xhr.responseText);
        },
        (xhr) => {
          this.setState({
            uploading: false
          });
          window.alert(xhr.responseText);
        });
    });
  }

  render() {
    if(this.state.uploading) {
      return (
        <Panel>
          <img src='./assets/img/loading.gif'/>
          <br/>
          <div>Uploading...</div>
        </Panel>
      );
    } else {
      return (
  			<FormPanel
          title='Add a new category'
          size='col-sm-6'
          fields={[
            { title:'Category Name', type: 'text', optional: false, value: "" }
          ]}
          submitName='Add New Category'
          onSubmit={this.pushCategory.bind(this)}
          onReset={(() => {
            this.setState(AddCategoryView.defaultState());
          }).bind(this)}
        />
      );
    }
  }
}

export default AddCategoryView;
