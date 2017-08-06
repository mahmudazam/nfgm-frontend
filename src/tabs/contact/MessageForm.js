import React from 'react';
import { ButtonToolbar, Button , Col , Row , Panel , FormGroup , ControlLabel , FormControl , HelpBlock }
  from 'react-bootstrap/lib';
import fire from '../../util/fire';
import * as req from '../../util/HTTPSReq';

const emptyState = {
  processing: false,
  status: "",
  values: {
    fName: "",
    lName: "",
    eMail: "",
    message: ""
  }
}

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          processing: false,
          status : "",
          values: {
            fName: "Mahmud",
            lName: "Azam",
            eMail: "mahmudfasihulazam@gmail.com",
            message: "Hello"
          }
        };
    }

    defaultState() {
      return JSON.parse(JSON.stringify(emptyState));
    }

    componentWillMount(){
        /* Create reference to messages in Fire base Database */
        let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
        messagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Fire base Database */
            let message = { text: snapshot.val(), id: snapshot.key };
            this.setState({ messages: [message].concat(this.state.messages) });
        })
    }

    sendMessage(event){
        event.preventDefault(); // <- prevent form submit from reloading the page
        let snapshot = this.state.values;
        // No empty fields allowed :
        if(!(snapshot.fName
              && snapshot.lName
              && snapshot.eMail
              && snapshot.message)) {
          this.setState({...this.state, status: "Please fill all fields"});
          return;
        }
        // Show loading if request has not been completed:
        this.setState({ ...this.state, processing: true});
        req.post(snapshot, '/customer_email',
          (function() {
            this.setState({
              ...this.defaultState(),
              status: "Message sent. Thank you"
            });
          }).bind(this));
    }

    handleChange(event) {
      let nodeId = event.target.id;
      let nodeValue = event.target.value;
      this.state.values[nodeId] = nodeValue;
      this.setState(this.state);
    }

    render() {
      if(this.state.processing) {
        return (
          <div className={this.props.size}>
            <Panel header="Send us a Message">
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
              <Panel header="Send us a Message">
                <form onSubmit={this.sendMessage.bind(this)}>
                  <FormGroup controlId="fName">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl type="text"
                      value={this.state.values.fName}
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
                  <FormGroup controlId="lName">
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type="text"
                      value={this.state.values.lName}
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
                  <FormGroup controlId="eMail">
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl type="text"
                      value={this.state.values.eMail}
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
                  <FormGroup controlId="message">
                    <ControlLabel>Message</ControlLabel>
                    <FormControl componentClass="textarea" className="resize-y" rows="10"
                      placeholder="Type your message here"
                      value={this.state.values.message}
                      onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>{this.state.status}</HelpBlock>
                  </FormGroup>
                  <ButtonToolbar>
                    <Button type="submit">Send</Button>
                    <Button onClick={() =>
                        this.setState(this.defaultState())}>
                      Reset
                    </Button>
                  </ButtonToolbar>
                </form>
              </Panel>
            </div>
        )
      }
    }
};

export default MessageForm;
