
import React from 'react';
import { Row, PanelGroup, Panel } from 'react-bootstrap/lib';
import Item from './Item';
import fire from '../../util/fire';
import Category from './Category';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "",
      categoryList: null
    };
  }

  componentWillMount() {
    fire.database().ref('/assets/categories/').orderByKey().on('value',
      ((snapshot) => {
        if(null == snapshot.val() || undefined == snapshot.val()) {
            this.setState({
                activeKey: "",
                categoryList: []
            });
            return;
        }
        let categoryList = Object.keys(snapshot.val());
        this.setState({
          activeKey: categoryList[0],
          categoryList: categoryList
        });
      }).bind(this));
  }

  handleSelect(activeKey) {
    this.setState({ ...this.state, activeKey });
  }

  render() {
    if(null === this.state.categoryList) {
      return (
        <div className='major-content col-sm-12'>
          <Panel>
            <img src='./assets/img/loading.gif'/>
            <br/>
            <div>Loading...</div>
          </Panel>
        </div>
      );
    } else {
      return (
        <div className='major-content col-sm-12'>
          {this.state.categoryList === null
          || this.state.categoryList === undefined
          || this.state.categoryList.length === 0
          ? <Panel>No categories of items</Panel>
          :
          <PanelGroup
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect.bind(this)}
                accordion>
            {
              this.state.categoryList.map(category =>
                <Panel
                    key={category}
                    header={category}
                    eventKey={category}>
                  <Category
                    categoryName={category}
                    itemButtons={this.props.itemButtons}
                    categoryButtons={this.props.categoryButtons}
                  />
                </Panel>
              )
            }
          </PanelGroup>}
        </div>
      )
    }
  }
}

export default Products;
