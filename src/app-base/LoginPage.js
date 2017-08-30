
import React from 'react';
import FormPanel from './FormPanel';
import { Row, Col } from 'react-bootstrap/lib';
import fire from '../util/fire';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false
    }
  }

  logInUser(userInfo) {
    this.setState({
      ...this.state,
      processing: true
    });
    fire.auth().signInWithEmailAndPassword(userInfo.username, userInfo.password)
      .then(() => {
        this.setState({
          ...this.state,
          processing: false
        })
      });
  }

  render() {
    return(
      <div className='col-sm-12'>
        <div className='col-sm-0 col-md-12'/>
        <FormPanel
          className='col-sm-12 col-md-1'
          fields={['Username', 'Password']}
          submitName='Sign in'
          onSubmit={this.logInUser.bind(this)}
        />
        <div className='col-sm-0 col-md-12'/>
      </div>
    );
  }
}

export default LoginPage;
