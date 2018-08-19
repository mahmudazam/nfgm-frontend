import React from 'react';
import HomeCarousel from "./HomeCarousel";
import HomeLocation from './HomeLocation';

class Home extends React.Component {
    render() {
        return(
            <div className="major-content">
                <HomeCarousel/>
                <HomeLocation/>
            </div>
        )
    }
};

export default Home;
