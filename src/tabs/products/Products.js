
import React from 'react';
import { Row, PanelGroup, Panel } from 'react-bootstrap/lib';
import Item from './Item';
import fire from '../../util/fire';
import Category from './Category';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
      categoryList: [
        'Meat', 'Vegetables'
      ]
    };
  }

  setStateWithoutRefresh(newState) {

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
      <div className='major-content col-sm-12'>
        <PanelGroup
              activeKey={this.state.categoryList[this.state.activeKey]}
              onSelect={this.handleSelect.bind(this)}
              accordion>
          {
            this.state.categoryList.map(category =>
              <Panel key={category} header={category} eventKey={category}>
                <Category categoryName={category}/>
              </Panel>
            )
          }
        </PanelGroup>
      </div>
    );
  }
}

export default Products;
