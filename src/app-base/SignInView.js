
import React from 'react';
import FormPanel from './FormPanel';
import { Row, Col } from 'react-bootstrap/lib';
import fire from '../util/fire';

class SignInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false
    }
    this.setState = this.setState.bind(this);
    this.notify = props.notify;
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.fieldsAreNotEmpty()) {
      this.logInUser(this.state.fields);
    }
  }

  acceptUser() {
    this.setState({
      ...this.state,
      processing: false
    })
    this.notify(true);
  }

  rejectUser(error) {
    this.notify(false);
  }

  logInUser(userInfo) {
    this.setState({
      ...this.state,
      processing: true
    });
    fire.auth().signInWithEmailAndPassword(userInfo.Username, userInfo.Password)
      .then(this.acceptUser.bind(this))
      .catch(this.rejectUser.bind(this));
  }

  render() {
    return (
      <Row>
        <Col sm={0} md={4}/>
        <FormPanel
          size='col-sm-12 col-md-4'
          fields={[
            { title: 'Email', type: 'email'},
            { title: 'Password', type: 'password'}
          ]}
          submitName='Sign in'
          onSubmit={this.logInUser.bind(this)}
        />
        <Col sm={0} md={4}/>
      </Row>
    );
  }

}

export default SignInView;
