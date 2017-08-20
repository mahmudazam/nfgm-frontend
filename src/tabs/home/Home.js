import React from 'react';
import HomeCarousel from "./HomeCarousel";
import HomeLocation from './HomeLocation';
import Comments from './Comments';
import FacebookWall from './FacebookWall';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="major-content">
                <HomeCarousel/>
                <div className="col-lg-12 run"></div>
                <HomeLocation/>
                <FacebookWall/>
            </div>
        )
    }
};

export default Home;
