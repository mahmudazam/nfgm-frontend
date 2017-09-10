
/*
Imports :
*/

// React.js:
import React from 'react';

// Bootstrap Carousel:
import Carousel from 'react-bootstrap/lib/Carousel'

// Bootstrap Well:
import Well from 'react-bootstrap/lib/Well'

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
      imgURLs: []
    };
  }

  /**
  * Loads the URL array with URLs stored in Firebase database:
  */
  componentWillMount(){
    // Get the reference to the database index of the image folder:
    let dirRef = fire.database().ref('assets/carousel').orderByKey();
    // Add every URL available in the index:
    dirRef.on('child_added', snapshot => {
      let image = { URL : snapshot.val().asset_url, id : snapshot.key };
      this.setState({ imgURLs: this.state.imgURLs.concat([image]) });
    })
  }

  /**
  * Renders the Carousel:
  */
  render() {
    return(
      <div className="col-lg-12 carouselWrapper">
      <Carousel className="myCarousel">
      {
        // Map the array of URLs to Carousel items with img tags
        // containing the URLs as src:
        this.state.imgURLs.map((image) =>
          <Carousel.Item key={image.id}>
            <img className="carousel-img" alt="500x300" src={image.URL} />
          </Carousel.Item>
      )
    }
    </Carousel>
    </div>
  )
}
};

export default HomeCarousel;
