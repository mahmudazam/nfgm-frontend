
import React from 'react';
import { Row, PanelGroup, Panel } from 'react-bootstrap/lib';
import Item from './Item';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'Meat'
    };
    this.allCategories = [
      {
        name: 'Meat',
        items: [
          {
            itemName: "Beef",
            price: 5.95,
            unit: "kg",
            sale: "",
            imgURL: ""
          },
          {
            itemName: "Chicken",
            price: 4.95,
            unit: "kg",
            sale: "",
            imgURL: ""
          }
        ]
      },
      {
        name: 'Vegetables',
        items: [
          {
            itemName: "Carrots",
            price: 5.10,
            unit: "kg",
            sale: "",
            imgURL: ""
          },
          {
            itemName: "Cauliflower",
            price: 5.20,
            unit: "kg",
            sale: "",
            imgURL: ""
          }
        ]
      }
    ]
  }

  renderCategory(category) {
    return (
      <Panel
          key={category.name}
          header={category.name}
          eventKey={category.name}
      >
        {category.items.map((item) =>
          <Item
              key={item.itemName}
              className='col-sm-6 col-md-3 col-lg-3'
              itemInfo={item}
          />
        )}
      </Panel>
    );
  }

  handleSelect(activeKey) {
    this.setState({ ...this.state, activeKey });
  }

  render() {
    return (
      <PanelGroup
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect.bind(this)}
            accordion>
        {this.allCategories.map((category) => this.renderCategory(category))}
      </PanelGroup>
    );
  }
}

export default Categories;
