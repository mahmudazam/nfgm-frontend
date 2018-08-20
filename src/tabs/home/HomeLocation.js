import React from 'react';
import { Row, Col } from 'react-bootstrap';
import fire from '../../util/fire';

class HomeLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours : []
    };
  }

  /**
  * Loads the hours array with hours stored in Firebase database:
  */
  componentWillMount() {
    // Get the reference to the database node storing current hours:
    let hoursRef = fire.database().ref('assets/hours').orderByKey();
    // Set the state with hours:
    hoursRef.on('value', (snapshot) => {
      this.setState({ hours: snapshot.val() });
    });
  }

  render() {
    return(
      <Row>
        <div className="run"></div>
        <Col md={6} style={{paddingLeft: "55px"}}>
          <h3>Come visit us</h3>
        </Col>
        <Col md={6} style={{paddingLeft: "0px"}}>
          <div style={{"width": "100%"}}><iframe title="location-map" width="100%" height="600" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=4-606%2022nd%20St%20West%20%20Saskatoon%20%20SK%20S7M%205W1+(Natural%20Fresh%20Grocery%20%26%20Meat)&amp;ie=UTF8&amp;t=&amp;z=17&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.maps.ie/create-google-map/">Google map generator</a></iframe></div><br />

        </Col>

      </Row>
    );
  }
};

export default HomeLocation;
