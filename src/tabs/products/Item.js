
import React from 'react';
import { Thumbnail, Button } from 'react-bootstrap/lib';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.item = this.props.itemInfo;
  }

  render() {
    return (
      <Thumbnail
          className={this.props.className}
          src={this.item.info.storage_urls}
          alt="242x200">
        <h4>{this.item.name}</h4>
        {this.item.info.Sale
          ? (<p className='sale-on-item'>{this.item.info.Sale}</p>)
          : null
        }
        <p>Regular Price: {this.item.info.Price} / {this.item.info.Unit}</p>
        <p>
          <Button bsStyle="primary">Buy</Button>&nbsp;
          <Button bsStyle="default">Description</Button>
        </p>
      </Thumbnail>
    );
  }
}

export default Item;
