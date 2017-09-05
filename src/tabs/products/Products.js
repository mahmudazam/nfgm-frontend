
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
    fire.database().ref('/assets/categories/').once('value').then(
      ((snapshot) => {
        this.setState({
          activeKey: Object.keys(snapshot.val())[0],
          categoryList: Object.keys(snapshot.val()).map((categoryName) => {
            return {
              name: categoryName,
              items: Object.keys(snapshot.val()[categoryName].items)
            };
          })
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
            <img src='./img/loading.gif'/>
            <br/>
            <div>Loading...</div>
          </Panel>
        </div>
      );
    } else {
      return (
        <div className='major-content col-sm-12'>
          <PanelGroup
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect.bind(this)}
                accordion>
            {
              this.state.categoryList.map(category =>
                <Panel
                    key={category.name}
                    header={category.name}
                    eventKey={category.name}>
                  <Category items={category.items}/>
                </Panel>
              )
            }
          </PanelGroup>
        </div>
      )
    }
  }
}

export default Products;
