
import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

class Comments extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <Panel header="Comments" className="fb-comments col-lg-12">
              <div className="fb-comments" data-href="https://localhost:3000" data-numposts="5"></div>
            </Panel>
        )
    }
};

export default Comments;
