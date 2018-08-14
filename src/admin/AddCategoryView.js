
import React from 'react';
import fire from '../util/fire';
import { Panel, Row, Col }
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
        <Col
          sm={this.props.size.sm}
          md={this.props.size.md}
          lg={this.props.size.lg}>
          <Panel header={this.props.title}>
            <Row>
              <img alt="ALT" src="./assets/img/loading.gif"/>
            </Row>
            <Row>
              <h3 className="col-sm-4">
                Processing your request, please wait
              </h3>
            </Row>
          </Panel>
        </Col>
      );
    } else {
      return (
        <FormPanel
          title='Add a new category'
          size={this.props.size}
          fields={[
            { title:'Category Name', type: 'text', optional: false, value: "" }
          ]}
          submitName='Add New Category'
          onSubmit={this.pushCategory.bind(this)}
          onReset={(() => {
            this.setState(AddCategoryView.defaultState());
          })}
        />
      );
    }
  }
}

export default AddCategoryView;
