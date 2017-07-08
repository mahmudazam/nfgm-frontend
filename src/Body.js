import React from 'react';
import Well from 'react-bootstrap/lib/Well'


class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
        };
    }

    render() {
        return  (
            <div className="col-lg-10">
                <Well>Sup</Well>
            </div>
        );
    }
}
export default Body;
