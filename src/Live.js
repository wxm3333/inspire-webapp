import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ZoomMtg } from "@zoomus/websdk";

import "./Live.css";

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingLaunched: false,
      meetingNumber: "",
      //leaveUrl: "http://localhost:3000",
      leaveUrl: "https://44f582fb9703.ngrok.io",
      userName: "",
      userEmail: "",
      passWord: "",
      role: 0,
      tab: 0,
    };

  }

  componentDidMount() {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.9/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  launchMeeting = (r) => {
    const apiKey = "AhYE37g2RRm28aINKVnCfA";
    const meetConfig = {
      meetingNumber: this.state.meetingNumber,
      leaveUrl: this.state.leaveUrl,
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      passWord: this.state.passWord,
      role: r
    };
    this.setState({ role: r})
    this.setState({ meetingLaunched: true });
    this.getSignatureFromServer(meetConfig, apiKey);
  }

  getSignatureFromServer = (meetConfig, apiKey) => {
    fetch("https://inspire-zoom.herokuapp.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetConfig.meetingNumber,
        role: meetConfig.role
        })
    })
      .then(result => result.text())
      .then(response => {
        console.log(JSON.parse(response))
        ZoomMtg.init({
          debug: true,
          leaveUrl: meetConfig.leaveUrl,
          isSupportAV: true,
          success: function() {
            ZoomMtg.join({
              signature: JSON.parse(response).signature,
              apiKey: apiKey,
              meetingNumber: meetConfig.meetingNumber, // required
              userName: meetConfig.userName, // required
              userEmail: meetConfig.userEmail, // Not used, required for Webinars
              passWord: meetConfig.passWord, // If required; set by host
              success() {
                console.log("join meeting success");
              },
              error(res) {
                console.log(res);
              }
            });
          },
          error(res) {
            console.log(res);
          }
        });
      });
  }

  render() {
    const { meetingNumber, userName, passWord, meetingLaunched } = this.state;
    return (
      <div>
        <Card className="meeting-detail">
        <CardContent>
          <Typography variant="h5" component="h2">
            Upcoming Meeting:
          </Typography>
          <Typography variant="body">
            <br />
            Meeting #: 3323927035
            <br />
            Password: 6MQ1tr
          </Typography>
        </CardContent>
        </Card>
        {!meetingLaunched ? (
          <nav className="app-nav">
            <form className="form">
              <label>
                <span>MeetingID:</span>
                <input
                  className="form__input"
                  type="text"
                  name="meetingNumber"
                  placeholder="Meeting #"
                  value={meetingNumber}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                <span>Username:</span>
                <input
                  className="form__input"
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={userName}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                <span>Password:</span>
                <input
                  className="form__input"
                  type="text"
                  name="passWord"
                  placeholder="Password"
                  value={passWord}
                  onChange={this.handleInputChange}
                />
              </label>
            </form>
            <div className="button-wrap">
              <button onClick={() => this.launchMeeting(1)} className="button">
                Host Meeting
              </button>
              <button onClick={() => this.launchMeeting(0)} className="button">
                Join Meeting
              </button>
            </div>
          </nav>
        ) : (
          <></>
        )}
    </div>
    );
  }
}

export default Live;
