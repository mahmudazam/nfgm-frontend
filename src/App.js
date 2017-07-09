import React from 'react';
import TabBar from "./TabBar";
import Well from 'react-bootstrap/lib/Well'



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
	    <Well>Brand</Well>
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
