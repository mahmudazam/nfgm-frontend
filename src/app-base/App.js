import React from 'react';
import TopNavbar from './TopNavbar';
import TabBar from './TabBar';
import LoginPage from './LoginPage';
import { Redirect, Route } from 'react-router-dom';
import fire from '../util/fire';
import Admin from '../admin_app/Admin';

const HomeRedirect = () => (<Redirect to='/home'/>);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn : false
    }
  }

  getAdminPage() {
    return (
      <Admin notify={this.forceUpdate.bind(this)}/>
    )
  }

  isUserAuthenticated() {
    return (
      fire.auth().currentUser
      ? true
      : false
    );
  }

  getLoginPage() {
    return (
      <LoginPage notify={((status) => {
        this.setState({
          ...this.state,
          loggedIn: status
        })
      }).bind(this)}/>
    );
  }

  render() {
    return (
  		<div>
        <TopNavbar/>
        <Route exact path='/' component={HomeRedirect}/>
        <Route exact path='/signin' component={this.getLoginPage.bind(this)}/>
        {
          this.isUserAuthenticated()
          ? (<Route path='/signin' component={this.getAdminPage.bind(this)}/>)
          : null
        }
        <Route path='/home' component={TabBar}/>
        <Route path='/products' component={TabBar}/>
        <Route path='/contact' component={TabBar}/>
  	  </div>
    );
  }
}
export default App;
