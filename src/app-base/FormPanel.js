
import React from 'react';
import { ButtonToolbar, Button , Col , Row , Panel , FormGroup , ControlLabel ,
        Form, FormControl }
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
      fields: fields.reduce(((result, field) => {
        result[field.title] = {
          type: field.type,
          value: field.value,
          optional: field.optional
        };
        return result;
      }), {})
    }));
  }

  handleChange(event) {
    let nodeId = event.target.id;
    let nodeValue = event.target.value;
    this.state.fields[nodeId].value = nodeValue;
    this.setState(this.state);
  }

  fieldsAreNotEmpty() {
    let empty = Object.keys(this.state.fields).reduce(
      (result, fieldName) => {
        if(this.state.fields[fieldName].value
          || this.state.fields[fieldName].optional) {
          return true && result;
        } else {
          return false && result;
        }
      }, true);
    return empty;
  }

  optionalFields() {
    return Object.keys(this.state.fields).reduce((result, fieldName) => {
      if(this.state.fields[fieldName].optional) {
        result.concat([fieldName]);
      }
      return result;
    }, []);
  }

  onSubmit(event) {
    event.preventDefault();
    let inputData = Object.keys(this.state.fields).reduce(
      (result, field) => {
        result[field] = this.state.fields[field].value;
        return result;
      }, {})
    if(this.fieldsAreNotEmpty()) {
      this.props.onSubmit(inputData, () => {
        this.setState(FormPanel.defaultState(this.props.fields));
      });
    } else {
      window.alert("Please fill all fields except the optional fields");
    }
  }

  render() {
    if(this.state.processing) {
      return (
        <Col
          sm={this.props.size.sm}
          md={this.props.size.md}
          lg={this.props.size.lg}>
          <Panel>
            <Panel.Heading>{this.props.title}</Panel.Heading>
            <Row>
              <img alt="ALT" src="./assets/img/loading.gif"/>
            </Row>
            <Row>
              <h3 className="col-sm-4">
                Processing your request, please wait
              </h3>
            </Row>
          </Panel>
        </Col>
      );
    } else {
      return(
          <Col
            sm={this.props.size.sm}
            md={this.props.size.md}
            lg={this.props.size.lg}>
            <Panel>
              <Panel.Heading>{this.props.title}</Panel.Heading>
              <Form onSubmit={this.onSubmit.bind(this)}>
                {Object.keys(this.state.fields).map((fieldName) =>
                  <FormGroup key={fieldName} controlId={fieldName}>
                    <ControlLabel>{
                      this.state.fields[fieldName].optional
                      ? fieldName + "(optional)"
                      : fieldName
                    }</ControlLabel>
                    <FormControl type={this.state.fields[fieldName].type}
                      value={this.state.fields[fieldName].value}
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

                </ButtonToolbar>
              </Form>
            </Panel>
          </Col>
      )
    }
  }
};

export default FormPanel;
