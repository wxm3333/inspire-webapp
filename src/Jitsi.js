import React, { Component } from "react";
import Jitsi from "react-jitsi";

var domain = "meet.jit.si";
var options = {
    roomName: "JitsiMeetAPIExample",
    width: 700,
    height: 180,
    parentNode: undefined,
    configOverwrite: {},
    interfaceConfigOverwrite: {
        filmStripOnly: true
    }
}

class JitsiMeeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inCall: false,
            roomName: "inspire-jitsi-test",
            displayName: "",
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
    const { inCall, roomName, displayName } = this.state;
    return (
        <div>
            Room name: inspire-jitsi-test
            <br />
            <nav className="app-nav">
            <form className="form">
                <input
                  className="form__input"
                  type="text"
                  name="roomName"
                  placeholder="Room name"
                  value={roomName}
                  onChange={this.handleInputChange}
                />
                <input
                  className="form__input"
                  type="text"
                  name="displayName"
                  placeholder="Your name"
                  value={displayName}
                  onChange={this.handleInputChange}
                />
            </form>
            <div className="button-wrap">
              <button
                onClick={() => this.setState({ inCall: true})}
                className="button"
              >
                Join Meeting
              </button>
              <button
                onClick={() => this.setState({ inCall: false})}
                className="button"
              >
                End Meeting
              </button>
            </div>
            </nav>
            {inCall &&
                <Jitsi
                    roomName={roomName}
                    displayName={displayName}
                    password="123"
                    loadingComponent={null}
                    frameStyle={{ display:'block', width:'100%', height:'100%' }}
                    //onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
                    containerStyle={{ width: '1200px', height: '600px' }}
                />
            }
        </div>
    );
  }
}

export default JitsiMeeting;