
import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

class Comments extends React.Component {
    render() {
        return(
          <div className="col-lg-12">
            <div className="col-sm-1"/>
            <div className="col-sm-10">
              <Panel>
                <Panel.Heading>Comments</Panel.Heading>
                <Panel.Body>
                  <div className="fb-comments col-lg-12"
                       data-href="https://exim-food.firebaseapp.com"
                       data-numposts="5">
                  </div>
                </Panel.Body>
              </Panel>
            </div>
            <div className="col-sm-1"/>
          </div>
        )
    }
};

export default Comments;
