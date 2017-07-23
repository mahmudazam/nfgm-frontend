import React from 'react';
import TabBar from "./TabBar";
import TopNavbar from './TopNavbar';

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
      <TopNavbar/>
	    <div className="col-lg-12">
    	  <div className="col-lg-1"></div>
	      <div className="col-lg-10">
	        <TabBar/>
	      </div>
	      <div className="col-lg-1"></div>
	    </div>
	    </div>
    );
  }
}
export default App;
