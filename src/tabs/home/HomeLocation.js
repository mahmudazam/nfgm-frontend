import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel';
import AddressMap from './AddressMap';
import fire from '../../util/fire';

class HomeLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hours : []
        };
        this.update = function (new_state) {this.setState({new_state})};
    }

    /**
    * Loads the hours array with hours stored in Firebase database:
    */
    componentWillMount(){
      // Get the reference to the database index of the image folder:
      let hoursRef = fire.database().ref('assets/hours').orderByKey().limitToLast(100);
      // Add every URL available in the index:
      hoursRef.on('child_added', snapshot => {
        let day = { dayName : snapshot.key, hours : snapshot.val() }
        this.setState({ hours: this.state.hours.concat([day]) });
      })
    }

    render() {
        return(
            <div className="col-lg-12">
                <div className="col-lg-1"></div>

                <div className="col-lg-5 sameheight">
                    <Panel header="Hours">
                      {this.state.hours.map((day) =>
                          <p key={day.dayName}>{day.dayName} : {day.hours}</p>
                      )}
                      <div className="run"></div>
                      <div className="walk"></div>
                    </Panel>
                </div>

                <div className="col-lg-5 sameheight">
                    <Panel id="home-map-panel" header="Location">
                        <AddressMap id="home-map" className="col-lg-12"/>
                    </Panel>
                </div>

                <div className="col-lg-1"></div>
            </div>
        )
    }
};

export default HomeLocation;
