
import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap/lib';
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
        if(null === snapshot.val() || undefined === snapshot.val()) {
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
      }));
  }

  handleSelect(activeKey) {
    this.setState({ ...this.state, activeKey });
  }

  render() {
    if(null === this.state.categoryList) {
      return (
        <Row style={{ border: "1px solid black" }}>
          <Col md={12}>
            <Col md={4}></Col>
            <Col style={{ marginTop: "40vh", textAlign: "center" }}md={4}>
              <img alt="ALT" src='./assets/img/loading.gif'/>
              <br/>
              <div style={{ color: "white" }}>Loading...</div>
            </Col>
            <Col md={4}></Col>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row style={{ border: "1px solid black", backgroundColor: "#5d823b", height: "100vh"}}>
          <div className="run"></div>
          <Col md={12}>
            {this.state.categoryList === null
            || this.state.categoryList === undefined
            || this.state.categoryList.length === 0
            ? <Panel>No categories of items</Panel>
            : this.state.categoryList.map(category =>
              <div style={{ paddingLeft: "15px", paddingRight: "15px"}}>
                <div className="container-fluid"><h2 style={{color: "white"}}>{category}</h2></div>
                <Category key={category}
                          categoryName={category}
                          itemButtons={this.props.itemButtons}
                          categoryButtons={this.props.categoryButtons} />
                <hr className="cat-sep" />
              </div>
            )}
          </Col>
        </Row>
        /*<div className='major-content col-sm-12'>
          {this.state.categoryList === null
          || this.state.categoryList === undefined
          || this.state.categoryList.length === 0
          ? <Panel>No categories of items</Panel>
          :
          <PanelGroup
                id="EDIT_CATEGORIES_PANEL_GROUP"
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect.bind(this)}
                accordion>
            {
              this.state.categoryList.map(category =>
                <Panel
                    key={category}
                    header={category}
                    eventKey={category}>
                  <Panel.Body>
                    <Category
                      categoryName={category}
                      itemButtons={this.props.itemButtons}
                      categoryButtons={this.props.categoryButtons} />
                  </Panel.Body>
                </Panel>
              )
            }
          </PanelGroup>}
        </div>*/
      )
    }
  }
}

export default Products;
