
import React from 'react';
import { Button, ButtonToolbar, Thumbnail } from 'react-bootstrap/lib';

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
          src={this.item.asset_url}
          alt="242x200">
        <h4>{this.item['item_name']}</h4>
        {this.item['sale_information']
          ? (<p className='sale-on-item'>{this.item['sale_information']}</p>)
          : null
        }
        <p>Regular price: {this.item.price} / {this.item.Unit}</p>
        <ButtonToolbar>
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
        </ButtonToolbar>
      </Thumbnail>
    );
  }
}

export default Item;
