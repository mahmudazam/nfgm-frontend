
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

  loadItems(categoryName) {
    let catRef= fire.database().ref('/assets/categories/'
      + categoryName + '/items');
    catRef.on('child_added', category => {
      let itemRef = fire.database().ref('/assets/items/' + category.val());
      itemRef.once('value').then(item => {
        let loadedItem = {
          name: item.key,
          info: item.val()
        }
        console.log(loadedItem);
        this.setState({
          loading: false,
          itemList: this.state.itemList.concat([loadedItem])
        });
      })
    })
  }

  componentWillMount() {
    this.loadItems(this.props.categoryName);
  }

  render() {
    return (
      <div>
        {
          this.state.loading && this.state.itemList != null
          ? (<div>Loading...</div>)
          : this.state.itemList.map((item) =>
              <Item
                itemInfo={item}
                className='col-sm-4'
                key={item.name}/>)
        }
      </div>
    );
  }
}

export default Category;
