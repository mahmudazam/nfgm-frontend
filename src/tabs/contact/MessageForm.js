import React from 'react';
import { Button , Col , Row , Panel , FormGroup , ControlLabel , FormControl , HelpBlock }
  from 'react-bootstrap/lib';
import fire from '../../fire';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: "", ph: ["num1","num2"] };
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

    addMessage(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push( this.inputEl.value );
        this.inputEl.value = '..'; // <- clear the input
    }


    render() {
        return(
            <div className={this.props.size}>
              <Panel header="Send us a Message">
                <form>
                  <FormGroup controlId="formValidationSuccess1">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl type="text" />
                  </FormGroup>
                  <FormGroup controlId="formValidationWarning1">
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type="text" />
                  </FormGroup>
                  <FormGroup controlId="formValidationWarning2">
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl type="text" />
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Message</ControlLabel>
                    <FormControl componentClass="textarea" className="resize-y" rows="10"
                      placeholder="Type your message here" />
                  </FormGroup>
                  <Button type="submit">Submit</Button>
                </form>
              </Panel>
            </div>
        )
    }
};

export default MessageForm;
