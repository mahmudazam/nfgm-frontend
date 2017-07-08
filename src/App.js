import React from 'react';
import NavbarInstance from "./NavbarInstance";
import Sidepanel from './Sidepanel'
import Body from './Body'



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <NavbarInstance/>
        <Sidepanel/>
        <Body/>
      </div>
    );
  }
}
export default App;
