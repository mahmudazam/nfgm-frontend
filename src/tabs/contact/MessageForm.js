import React from 'react';
import { Button , Col , Row , Panel , FormGroup , ControlLabel , FormControl , HelpBlock }
  from 'react-bootstrap/lib';
import fire from '../../util/fire';
import * as req from '../../util/HTTPSReq';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          values: {
            fName: "Hello",
            lName: "World",
            eMail: "hello.world@example.com",
            message: "Hello World"
          }
        };
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
        this.setState({values: { fName: "",lName: "", eMail: "", message: "" }});
        req.post(snapshot);
    }

    handleChange(event) {
      let nodeId = event.target.id;
      let nodeValue = event.target.value;
      this.state.values[nodeId] = nodeValue;
      this.setState(this.state);
    }

    render() {
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
                  </FormGroup>
                  <Button type="submit">Send</Button>
                </form>
              </Panel>
            </div>
        )
    }
};

export default MessageForm;
