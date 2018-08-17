
import React from 'react';
import { ButtonToolbar, Button, ControlLabel, Panel }
  from 'react-bootstrap/lib';

class SelectView extends React.Component {
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
          <Panel.Body>
            <ButtonToolbar>
              {
                Object.keys(this.props.categories).map((name) =>
                  !this.props.categories[name]
                  ? (
                    <Button bsStyle='primary' key={name}
                        onClick={(this.handleChangeBuilder(name, true))
                            .bind(this)}>
                      {name}
                    </Button>
                    )
                  : null)
              }
            </ButtonToolbar>
          </Panel.Body>
        </Panel>
        <ControlLabel>Categories Selected</ControlLabel>
        <Panel>
          <Panel.Body>
            <ButtonToolbar>
              {
                Object.keys(this.props.categories).map((name) =>
                  this.props.categories[name]
                  ? (
                    <Button bsStyle='success' key={name}
                        onClick={(this.handleChangeBuilder(name, false))
                            .bind(this)}>
                      {name}
                    </Button>
                    )
                  : null)
              }
            </ButtonToolbar>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default SelectView;
