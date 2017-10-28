import React from 'react';
import TopNavbar from './TopNavbar';
import TabBar from './TabBar';
import SignInView from './SignInView';
import { Redirect, Route } from 'react-router-dom';
import fire from '../util/fire';

const HomeRedirect = () => (<Redirect to='/home'/>);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn : false
    }
  }

  getSignInView() {
    return (
      <SignInView notify={(signInState) => {
        this.setState({
          ...this.state,
          signedIn: signInState
        });
      }}/>
    );
  }

  isUserAuthenticated() {
    return (
      fire.auth().currentUser
      ? true
      : false
    );
  }

  signOut() {
    fire.auth().signOut().then((() => {
      window.alert("Signed out");
      this.forceUpdate();
    }).bind(this));
  }

  render() {
    return (
  		<div>
        <TopNavbar
          signedIn={this.isUserAuthenticated}
          signOut={this.signOut.bind(this)}/>
        <Route exact path='/' component={HomeRedirect}/>
        <Route exact path='/signin' component={this.getSignInView.bind(this)}/>
        <Route path='/home' component={TabBar}/>
        <Route path='/products' component={TabBar}/>
        <Route path='/contact' component={TabBar}/>
  	  </div>
    );
  }
}
export default App;
