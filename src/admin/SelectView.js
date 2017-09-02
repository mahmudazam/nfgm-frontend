
import React from 'react';
import fire from '../util/fire';
import { ButtonToolbar, Button, ControlLabel, Row, Panel }
  from 'react-bootstrap/lib';

class SelectView extends React.Component {
  constructor() {
    super();
  }

  handleChangeBuilder(name, selected) {
    let handleChange = function() {
      this.props.categories[name] = selected;
      this.props.setCategories(this.props.categories);
    }
    return handleChange;
  }

  render() {
    return (
      <div className={this.props.className}>
        <ControlLabel>Cateogories Available</ControlLabel>
        <Panel>
          <ButtonToolbar>
            {
              Object.keys(this.props.categories).map((name) =>
                !this.props.categories[name]
                ? (
                  <Button
                    bsStyle='primary'
                    key={name}
                    onClick={(this.handleChangeBuilder(name, true)).bind(this)}>
                    {name}
                  </Button>
                  )
                : null)
            }
          </ButtonToolbar>
        </Panel>
        <ControlLabel>Categories Selected</ControlLabel>
        <Panel>
          <ButtonToolbar>
            {
              Object.keys(this.props.categories).map((name) =>
                this.props.categories[name]
                ? (
                  <Button
                    bsStyle='success'
                    key={name}
                    onClick={(this.handleChangeBuilder(name, false)).bind(this)}>
                    {name}
                  </Button>
                  )
                : null)
            }
          </ButtonToolbar>
        </Panel>
      </div>
    );
  }
}
export default SelectView;
