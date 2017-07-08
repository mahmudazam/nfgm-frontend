import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel'
import Well from 'react-bootstrap/lib/Well'
class HomeCarousel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="col-lg-12 carouselWrapper">
                <Well>NEWS:</Well>
                <Carousel className=" myCarousel">
                    <Carousel.Item>
                        <img className="carousel-img" alt="900x100" src="/img/img1.jpg"/>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousel-img" alt="900x100" src="/img/img1.jpg"/>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousel-img" alt="900x100" src="/img/img1.jpg"/>
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousel-img" alt="900x100" src="/img/img1.jpg"/>
                        <Carousel.Caption>
                            <h3>Fourth slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
};

export default HomeCarousel;