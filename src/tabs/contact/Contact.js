import React from 'react';
import { Jumbotron, Button , Col , Row } from 'react-bootstrap/lib';
import fire from '../../fire';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
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
          <div className="col-sm-12 major-content">
            <Jumbotron className="col-sm-12">
              <h1>Coming Soon</h1>
              <p>This will be a description of contact information
                  and a form for email/sms to the store</p>
              <p><Button bsStyle="primary">Functionality</Button></p>
            </Jumbotron>
          </div>
        )
    }
};

export default Contact;
