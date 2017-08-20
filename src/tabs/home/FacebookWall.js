
import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

class FacebookWall extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
      document.addEventListener('fb-init', e => FB.XFBML.parse());
    }

    render() {
        return(
            <div className="col-sm-12 col-md-12">
              <Panel header="Facebook" className="facebook">
                <div className='col-sm-12 col-md-6'>
                  <center>
                    <div className="fb-page" data-href="https://www.facebook.com/Natural-Fresh-Grocery-Meat-413966245671714/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/Natural-Fresh-Grocery-Meat-413966245671714/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Natural-Fresh-Grocery-Meat-413966245671714/">Natural Fresh Grocery &amp; Meat</a></blockquote></div>
                  </center>
                </div>
                <div className='col-sm-12 col-md-6'>
                  <center>
                    <div className="fb-page" data-href="https://www.facebook.com/Natural-Fresh-Grocery-Meat-413966245671714/" data-tabs="messages" data-small-header="true" data-adapt-container-width="false" data-hide-cover="true" data-show-facepile="false"><blockquote cite="https://www.facebook.com/Natural-Fresh-Grocery-Meat-413966245671714/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Natural-Fresh-Grocery-Meat-413966245671714/">Natural Fresh Grocery &amp; Meat</a></blockquote></div>
                  </center>
                </div>
              </Panel>
            </div>
        )
    }
};

export default FacebookWall
