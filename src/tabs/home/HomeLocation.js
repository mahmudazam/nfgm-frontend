import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

class HomeLocation extends React.Component {
    constructor() {
        super();
        this.state = { messages: [] };
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

                    <Panel header="Location">
                        Map
                    </Panel>

                </div>
                <div className="col-lg-1"></div>

            </div>
        )
    }
};

export default HomeLocation;