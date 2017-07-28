/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
} from "react-google-maps/lib";

const PopUpInfoWindowExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
  defaultZoom={17}
  center={props.center}
  >
  {props.markers.map((marker, index) => (
    <Marker
    key={index}
    position={marker.position}
    onClick={() => props.onMarkerClick(marker)}
    >
    {/*
      Show info window only if the 'showInfo' key of the marker is true.
      That is, when the Marker pin has been clicked and 'onCloseClick' has been
      Successfully fired.
      */}
      {marker.showInfo && (
        <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
          <div>{marker.infoContent}</div>
        </InfoWindow>
      )}
      </Marker>
    ))}
    </GoogleMap>
  ));

  /*
  *
  *  Add <script src="https://maps.googleapis.com/maps/api/js"></script>
  *  to your HTML to provide google.maps reference
  *
  *  @author: @chiwoojo
  */
  export default class AddressMap extends Component {
    constructor(props) {
      super(props);
      this.tempCenter = {
        lat: 52.130012,
        lng: -106.67863,
      };
      this.state = {
        center: { lat: this.tempCenter.lat , lng: this.tempCenter.lng },

        // array of objects of markers
        markers: [
          {
            position: new google.maps.LatLng(this.tempCenter.lat, this.tempCenter.lng),
            showInfo: true,
            infoContent: (
              <div>
                <div>Natural Fresh Grocery & Meat:</div>
                <div>4-606 22nd St West, Saskatoon, SK S7M 5W1</div>
                <a target="_blank" href="https://www.google.ca/maps/place/Natural+Fresh+Meat/@52.1300124,-106.680819,17z/data=!3m1!4b1!4m5!3m4!1s0x5304f726767579f7:0x80a086221c7d8431!8m2!3d52.1300124!4d-106.6786303">
                  Show in Google Maps
                </a>
              </div>
            ),
          }
        ],
      };

      this.click = this.handleMarkerClick.bind(this);
      this.close = this.handleMarkerClose.bind(this);
    }

    handleMarkerClick(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker.position === targetMarker.position) {
            return {
              position : marker.position,
              showInfo : true,
              infoContent: marker.infoContent
            };
          }
          return marker;
        }),
      });
    }

    handleMarkerClose(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker.position === targetMarker.position) {
            return {
              position : marker.position,
              showInfo : false,
              infoContent: marker.infoContent
            };
          }
          console.log(marker.showInfo);
          return marker;
        }),
      });
    }

    render() {
      return (
        <PopUpInfoWindowExampleGoogleMap
        containerElement={
          <div style={{ height: `40%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        markers={this.state.markers}
        onMarkerClick={this.click}
        onMarkerClose={this.close}
        />
      );
    }
  }
