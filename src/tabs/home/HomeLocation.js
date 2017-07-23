import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel';
import AddressMap from './AddressMap'

class HomeLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.update = function (new_state) {this.setState({new_state})};
    }

    render() {
        return(
            <div className="col-lg-12">
                <div className="col-lg-1"></div>

                <div className="col-lg-5">
                    <Panel header="Hours">
                        Everyday : 09:00 am - 09:00 pm
                    </Panel>
                </div>

                <div className="col-lg-5">
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
