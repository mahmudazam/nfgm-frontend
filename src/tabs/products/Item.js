
import React from 'react';
import { Thumbnail, Button } from 'react-bootstrap/lib';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.info = this.props.itemInfo;
  }

  render() {
    return (
      <Thumbnail
          className={this.props.className}
          src={this.info.imgURL}
          alt="242x200">
        <h4>{this.info.itemName}</h4>
        {this.info.sale
          ? (<p className='sale-on-item'>{this.info.sale}</p>)
          : null
        }
        <p>Regular Price: {this.info.price} / {this.info.unit}</p>
        <p>
          <Button bsStyle="primary">Buy</Button>&nbsp;
          <Button bsStyle="default">Description</Button>
        </p>
      </Thumbnail>
    );
  }
}

export default Item;
