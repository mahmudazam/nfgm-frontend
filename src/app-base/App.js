import React from 'react';
import TopNavbar from './TopNavbar';
import TabBar from './TabBar';
import { Redirect, Route } from 'react-router-dom';
import fire from '../util/fire';

const LoginPage = () => (<div>Login Page</div>);

const HomeRedirect = () => (<Redirect to='/home'/>);

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
  		<div>
        <TopNavbar/>
        <Route exact path='/' component={HomeRedirect}/>
        <Route exact path='/admin' component={LoginPage}/>
        <Route path='/home' component={TabBar}/>
        <Route path='/products' component={TabBar}/>
        <Route path='/contact' component={TabBar}/>
  	  </div>
    );
  }
}
export default App;
