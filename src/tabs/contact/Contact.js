import React from 'react';
import MessageForm from './MessageForm';
import { formatPhoneNumber } from '../../util/string_format';

const MAPS = "https://www.google.com/maps/place/"
           + "Natural+Fresh+Grocery+%26+Meat/@52.1267402,-106.6757469,14z/"
           + "data=!4m8!1m2!2m1!1sNatural+Fresh+Grocery+Saskatoon!3m4!1s0x0:"
           + "0xd827c56e8c3a401d!8m2!3d52.1301161!4d-106.6787696";

const contactStyle = {
  background: "#5d823b",
  height: "100vh",
  paddingTop: "15vh"
};

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          address: "",
          ph: [
            { id: "num1" , value: "+13069546328" },
            { id: "num2" , value: "+13069546328" }
          ]
        };
    }

    render() {
        return(
          <div style={contactStyle} className="col-sm-12 major-content">
            <div className="col-md-6 col-sm-12">
              <div style={{ color: "white" }}>
                <div style={{ fontSize: "2em" }}>Contact</div>
                <hr />
                <div>
                  <div className="col-sm-12 address-panel">
                    <p style={{ fontSize: "1.2em" }}>Address</p>
                    <a target="_blank" rel="noopener noreferrer" href={MAPS}
                        style={{ color: "white" }}>
                      <p>4-606 22nd St West</p>
                      <p>Saskatoon</p>
                      <p>SK S7M 5W1</p>
                    </a>
                    <p style={{ fontSize: "1.2em" }}>Phone:</p>
                    {this.state.ph.map((num) =>
                      <p key={num.id}>
                        <a style={{ color: "white" }} href={"tel:" + num.value}>
                          {formatPhoneNumber(num.value)}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <MessageForm size="col-md-6 col-sm-12"/>
          </div>
        )
    }
};

export default Contact;
