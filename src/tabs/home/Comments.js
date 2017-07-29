
import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

class Comments extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
          <div className="col-lg-12">
            <div className="col-lg-1"/>
            <Panel header="Comments" className="col-lg-10">
              <div className="fb-comments col-lg-12" data-href="https://localhost:3000" data-numposts="5"></div>
            </Panel>
            <div className="col-lg-1"/>
          </div>
        )
    }
};

export default Comments;
