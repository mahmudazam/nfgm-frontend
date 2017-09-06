
import React from 'react';
import { Row, PanelGroup, Panel } from 'react-bootstrap/lib';
import Item from './Item';
import fire from '../../util/fire';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      itemList: []
    };
    this.setState = this.setState.bind(this);
  }

  loadItems(itemNameList) {
    if(0 >= itemNameList.length) {
      this.setState({
        ...this.state,
        loading: false
      });
      return;
    }
    itemNameList.map((item) => {
      let itemRef = fire.database().ref('/assets/items/' + item);
      itemRef.once('value').then(item => {
        let loadedItem = {
          Name: item.key,
          ...item.val()
        }
        this.setState({
          loading: false,
          itemList: this.state.itemList.concat([loadedItem])
        });
      })
    })
  }

  componentDidMount() {
    this.loadItems(this.props.items);
  }

  render() {
    return (
      <div>
        {
          this.state.loading
          ? (<div>Loading...</div>)
          : 0 >= this.state.itemList.length
            ? (<div>No items in this category</div>)
            : this.state.itemList.map((item) =>
                <Item
                  itemInfo={item}
                  className='col-sm-12 col-md-3'
                  key={item.Name}
                  buttons={this.props.itemButtons}/>
              )
        }
        { this.props.children }
      </div>
    );
  }
}

export default Category;
