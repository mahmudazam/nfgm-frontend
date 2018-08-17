import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import AddressMap from './AddressMap';
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
      <div className="col-lg-12">
        <div className="col-lg-6 sameheight">
          <Panel>
            <Panel.Heading>Hours</Panel.Heading>
            <Panel.Body>
              {this.state.hours.map((day) =>
                <p key={day.name}>{day.name} : {day.hours}</p>
              )}
              <div className="run"></div>
              <div className="walk"></div>
            </Panel.Body>
          </Panel>
        </div>

        <div className="col-lg-6 sameheight">
          <Panel id="home-map-panel">
            <Panel.Heading>Location</Panel.Heading>
            <Panel.Body>
              <AddressMap id="home-map" className="col-lg-12"/>
            </Panel.Body>
          </Panel>
        </div>
      </div>
    );
  }
};

export default HomeLocation;
