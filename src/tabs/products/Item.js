
import React from 'react';
import { Thumbnail, Button } from 'react-bootstrap/lib';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.item = this.props.itemInfo;
  }

  createItemInfo(item) {
    let itemInfo = {};
  }

  render() {
    return (
      <Thumbnail
          className={this.props.className}
          src={this.item.storage_urls}
          alt="242x200">
        <h4>{this.item.Name}</h4>
        {this.item.Sale
          ? (<p className='sale-on-item'>{this.item.Sale}</p>)
          : null
        }
        <p>Regular Price: {this.item.Price} / {this.item.Unit}</p>
        {
          this.props.buttons.map((button) =>
            <Button
              key={button.label}
              bsStyle={button.bsStyle}
              onClick={
                (() => {
                  button.onClick(this.item);
                }).bind(this)
              }>
              {button.label}
            </Button>
          )
        }
      </Thumbnail>
    );
  }
}

export default Item;
