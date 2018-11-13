
/*
Imports :
*/

// React.js:
import React from 'react';

import {Row, Carousel} from 'react-bootstrap'


// Firebase database control:
import fire from '../../util/fire'

/**
* Models a Carousel capable of pulling images from Firebase storage:
*/
class HomeCarousel extends React.Component {
  /**
  * Initializes the list of image URLs to be used for rendering:
  */
  constructor(props) {
    super(props);
    this.state = {
      imageURLs: {}
    };
  }

  /**
  * Loads the URL array with URLs stored in Firebase database:
  */
  componentWillMount() {
    // Get the reference to the database index of the image folder:
    let carouselQuery = fire.database().ref('assets/carousel').orderByKey();
    // Add every URL available in the index:
    carouselQuery.on('value', ((snapshot) => {
      if(null == snapshot.val() || undefined === snapshot.val()) {
          this.setState({
              imageURLs: {},
          });
          return;
      }
      this.setState({
        ...this.state,
        imageURLs: snapshot.val(),
      });
    }))
  }

  /**
  * Renders the Carousel:
  */
  render() {
    return(
      <Row style={{ width: "100vw" }}>
        <Carousel className="myCarousel">
        {
          // Map the array of URLs to Carousel items with img tags
          // containing the URLs as src:
          Object.keys(this.state.imageURLs).map((imageName) =>
            <Carousel.Item key={imageName}>
              <img
                className="carousel-img"
                alt="500x300"
                src={this.state.imageURLs[imageName].asset_url} />
            </Carousel.Item>
          )
        }
        </Carousel>
      </Row>
  )
}
};

export default HomeCarousel;
