
import React from 'react';
import { Button, Row, PanelGroup, Panel } from 'react-bootstrap/lib';
import Item from './Item';
import fire from '../../util/fire';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      itemList: {}
    };
    this.setState = this.setState.bind(this);
  }

  componentWillMount() {
    let categoryQuery = fire.database()
      .ref('/assets/categories/' + this.props.categoryName + '/items');
    categoryQuery.on('value', ((snapshot) => {
      if('Meat' === this.props.categoryName) console.log(this.state);
      if(null === snapshot.val()
        || (snapshot.val() && 'NO_ITEMS_ADDED_YET' === snapshot.val())) {
        this.setState({
          ...this.state,
          itemList: {},
          loading: false
        });
        return;
      } else {
          let items = Object.keys(snapshot.val());
          let itemList = {};
          items.map((itemName) => {
            fire.database().ref('/assets/items/' + itemName).orderByKey()
              .once('value').then(((snapshot) => {
                if(null == snapshot.val()) return;
                itemList[snapshot.key] = snapshot.val();
                this.setState({
                  ...this.state,
                  loading: false,
                  itemList: itemList
                });
              }).bind(this));
          });
      }
    }).bind(this));
  }

  render() {
    return (
      <div>
        {
          this.state.loading
          ? (<div>Loading...</div>)
          : !this.state.itemList || 0 >= Object.keys(this.state.itemList).length
            ? (<div>No items in this category</div>)
            : Object.keys(this.state.itemList).map((itemName) => {
              let item = {
                ...this.state.itemList[itemName],
                item_name: itemName
              };
              return (
                <Item
                  itemInfo={item}
                  className='col-sm-12 col-md-3'
                  key={itemName}
                  buttons={this.props.itemButtons}
                />
              )
            })
        }
        <Row/>
        {
            this.props.categoryButtons.map((buttonInfo) =>
                <Button
                    key={buttonInfo.label}
                    bsStyle={buttonInfo.bsStyle}
                    onClick={(() => {
                        buttonInfo.onClick(this.props.categoryName);
                    }).bind(this)}
                >{buttonInfo.label}</Button>
            )
        }
        { this.props.children }
      </div>
    );
  }
}

export default Category;
