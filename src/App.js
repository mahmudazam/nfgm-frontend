import React from 'react';
import TabBar from './app-base/TabBar';
import SignInView from './app-base/SignInView';
import { Redirect, Route } from 'react-router-dom';
import fire from './util/fire';

const HomeRedirect = () => (<Redirect to='/home'/>);

const appStyle = {
    background: "#5d823b"
};

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
      this.setState({
        ...this.state,
        signedIn: false
      });
    }));
  }

  getTabBar() {
    return (
      <TabBar user={(() => this.state.signedIn)} />
    );
  }

  render() {
    return (
      <div style={appStyle}>
        {/*<TopNavbar signOut={this.signOut.bind(this)}
                   user={() => { return this.state.signedIn; }} />*/}
        <Route exact path='/' component={HomeRedirect}/>
        <Route exact path='/signin' component={this.getSignInView.bind(this)}/>
        <Route path='/home' component={this.getTabBar.bind(this)}/>
        <Route path='/products' component={this.getTabBar.bind(this)}/>
        <Route path='/contact' component={this.getTabBar.bind(this)}/>
        <Route path='/admin' component={this.getTabBar.bind(this)}/>
      </div>
    );
  }
}

export default App;
