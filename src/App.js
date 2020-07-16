import React, { Component } from "react";
import { Container } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Live from './Live'
import Archive from './Archive'
import Contact from './Contact'
import JitsiMeeting from './Jitsi'

import "./App.css";

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(25),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
    };
  }

  handleTabChange = (e, newValue) => {
    this.setState({ tab: newValue });
  }

  render() {
    let Content;
    switch (this.state.tab) {
    case 0:
      Content = <Live />;
      break;
    case 1:
      Content = <Archive />;
      break;
    case 2:
      Content = <Contact />;
      break;
    case 3:
      Content = <JitsiMeeting />;
      break;
    default:
      Content = <Live />;
      break;
    }
    return (
      <div className="App">
        <Paper className="navbar">
          <Box className="app-name">
            INSPIRE v2
          </Box>
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <StyledTab label="Live" />
            <StyledTab label="Archive" />
            <StyledTab label="Contact" />
            <StyledTab label="Jitsi" />
          </Tabs>
        </Paper>
      <Container className="content">
        { Content }
      </Container>
      </div>
    );
  }
}

export default App;
