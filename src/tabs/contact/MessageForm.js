import React from 'react';
import { ButtonToolbar, Button , Row , FormGroup , ControlLabel , FormControl , HelpBlock }
  from 'react-bootstrap/lib';
import { postFormData } from '../../util/HTTPSReq';
import Recaptcha from 'react-recaptcha';

const emptyState = {
  processing: false,
  status: "",
  values: {
    fName: "",
    lName: "",
    eMail: "",
    message: "",
    response: ""
  }
}


const Field = (props) =>
    <ControlLabel style={{ color: "white" }}>
      {props.children}
    </ControlLabel>

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.defaultState();
    }

    defaultState() {
      return JSON.parse(JSON.stringify(emptyState));
    }

    sendMessage(event){
        event.preventDefault(); // <- prevent form submit from reloading the page
        let snapshot = this.state.values;
        // No empty fields allowed :
        if(!(snapshot.fName
              && snapshot.lName
              && snapshot.eMail
              && snapshot.message
              && snapshot.response !== "")) {
          this.setState({
            ...this.state,
            status: "Please fill all fields and check the box"
          });
          return;
        }
        // Show loading if request has not been completed:
        this.recInst.reset();
        this.setState({ ...this.state, processing: true});
        postFormData(snapshot, '/customer_email',
          ((xhr) => {
            this.setState({
              ...this.defaultState(),
              status: "Message sent. Thank you"
            });
            window.alert(this.state.status)
          }),
          ((xhr) => {
            this.setState({
              ...this.state,
              processing: false,
              status: "Message could not be sent, please call us."
            });
            window.alert(this.state.status)
          }));
    }

    handleChange(event) {
      let nodeId = event.target.id;
      let nodeValue = event.target.value;
      this.state.values[nodeId] = nodeValue;
      this.setState(this.state);
    }

    recVerify(response) {
      console.log(response);
      if(response !== null
          && response !== undefined
          && response !== "")
        this.setState({
          ...this.state,
          values: {...this.state.values, response: response}
        });
    }

    recExpired() {
      console.log("Recaptcha expired");
      this.setState({...this.state, values: {...this.state.values, response: "" }});
    }

    render() {
      if(this.state.processing) {
        return (
          <div className={this.props.size}>
            <div>
              <div>Send us a Message</div>
              <div>
                <Row>
                  <img alt="ALT" src="./assets/img/loading.gif"/>
                </Row>
                <Row>
                  <h3 className="col-sm-4">
                    Processing your request, please wait
                  </h3>
                </Row>
              </div>
            </div>
          </div>
        );
      } else {
        return(
            <div className={this.props.size}>
              <div>
                <div style={headingStyle}>Send us a Message</div>
                <hr style={{ color: "white" }} />
                <div>
                  <form onSubmit={this.sendMessage.bind(this)}>
                    <FormGroup controlId="fName">
                      <Field>First Name</Field>
                      <FormControl type="text"
                        value={this.state.values.fName}
                        onChange={this.handleChange.bind(this)}
                      />
                    </FormGroup>
                    <FormGroup controlId="lName">
                      <Field>Last Name</Field>
                      <FormControl type="text"
                        value={this.state.values.lName}
                        onChange={this.handleChange.bind(this)}
                      />
                    </FormGroup>
                    <FormGroup controlId="eMail">
                      <Field>Email Address</Field>
                      <FormControl type="text"
                        value={this.state.values.eMail}
                        onChange={this.handleChange.bind(this)}
                      />
                    </FormGroup>
                    <FormGroup controlId="message">
                      <Field>Message</Field>
                      <FormControl componentClass="textarea" className="resize-y" rows="10"
                        placeholder="Type your message here"
                        value={this.state.values.message}
                        onChange={this.handleChange.bind(this)}
                      />
                      <FormControl.Feedback />
                      <HelpBlock>{this.state.status}</HelpBlock>
                    </FormGroup>
                    <Recaptcha
                      sitekey='6LdkuDoUAAAAAAnc6NuZA80jIL5zRF82b-MbXTp7'
                      render="explicit"
                      ref={((e) => this.recInst = e)}
                      verifyCallback={this.recVerify.bind(this)}
                      onloadCallback={() => {}}
                      expiredCallback={this.recExpired.bind(this)} />
                    <ButtonToolbar>
                      <Button bsStyle="primary" type="submit">
                        Send
                      </Button>
                      <Button
                        bsStyle="danger"
                        onClick={(() => {
                          console.log(this.recInst);
                          this.recInst.reset();
                          this.setState(this.defaultState());
                      })}>
                        Reset
                      </Button>
                    </ButtonToolbar>
                  </form>
                </div>
              </div>
            </div>
        )
      }
    }
};

const headingStyle = {
  fontSize: "2em",
  color: "white"
};

export default MessageForm;
