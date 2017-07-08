import React from 'react';
import HomeCarousel from "./HomeCarousel";
import HomeLocation from './HomeLocation';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="home">
                <HomeCarousel/>
                <div className="col-lg-12 run"></div>
                <HomeLocation/>
            </div>
        )
    }
};

export default Home;