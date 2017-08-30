
import React from 'react';
import { ButtonToolbar, Button , Col , Row , Panel , FormGroup , ControlLabel ,
        Form, FormControl , HelpBlock }
  from 'react-bootstrap/lib';

  class FormPanel extends React.Component {
      constructor(props) {
          super(props);
          this.state = FormPanel.defaultState(props.fields);
      }

      static defaultState(fields) {
        return JSON.parse(JSON.stringify({
          processing: false,
          status : "",
          fields: fields.reduce(((result, fieldName) => {
            result[fieldName] = "";
            return result;
          }), {})
        }));
      }

      handleChange(event) {
        let nodeId = event.target.id;
        let nodeValue = event.target.value;
        this.state.fields[nodeId] = nodeValue;
        this.setState(this.state);
      }

      fieldsAreNotEmpty() {
        return this.props.fields.reduce((result, fieldName) => {
          if(this.state.fields[fieldName]) {
            return true && result;
          } else {
            return false && result;
          }
        }, true);
      }

      onSubmit(event) {
        event.preventDefault();
        if(this.fieldsAreNotEmpty()) {
          this.props.onSubmit(this.state.fields);
        }
        this.setState(FormPanel.defaultState(this.props.fields));
      }

      render() {
        if(this.state.processing) {
          return (
            <div className={this.props.size}>
              <Panel header={this.props.title}>
                <Row>
                  <img src="./img/loading.gif"/>
                </Row>
                <Row>
                  <h3 className="col-sm-4">
                    Processing your request, please wait
                  </h3>
                </Row>
              </Panel>
            </div>
          );
        } else {
          return(
              <div className={this.props.size}>
                <Panel header={this.props.title}>
                  <Form onSubmit={this.onSubmit.bind(this)}>
                    {Object.keys(this.state.fields).map((fieldName) =>
                      <FormGroup key={fieldName} controlId={fieldName}>
                        <ControlLabel>{fieldName}</ControlLabel>
                        <FormControl type="text"
                          value={this.state.fields[fieldName]}
                          onChange={this.handleChange.bind(this)}
                        />
                      </FormGroup>
                    )}
                    {this.props.children}
                    <ButtonToolbar>
                      <Button
                          bsStyle='primary'
                          type="submit">
                        {this.props.submitName}
                      </Button>
                      <Button
                          bsStyle='danger'
                          onClick={() => {
                              this.setState(
                                FormPanel.defaultState(this.props.fields));
                          }}>
                        Reset
                      </Button>
                    </ButtonToolbar>
                  </Form>
                </Panel>
              </div>
          )
        }
      }
  };

  export default FormPanel;
