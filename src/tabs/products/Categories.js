
import React from 'react';
import { Row, PanelGroup, Panel } from 'react-bootstrap/lib';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "Panel 1"
    };
    this.allCategories = ['Panel 1', 'Panel 2']
  }

  renderCategory(name) {
    return (
      <Panel key={name} header={name} eventKey={name}>{name} Content</Panel>
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
