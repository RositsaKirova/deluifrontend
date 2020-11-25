//with the help of https://material-ui.com/ examples

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import assistant from './images/bigbrain.jpg';

import './App.css';

import TruthValueAnswerComponent from "./components/TruthValueAnswerComponent";
import Term from "./components/Term";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`nav-tabpanel-${index}`}
          aria-labelledby={`nav-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root2: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

function App() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <React.Fragment>
        <CssBaseline />
      <div className={classes.root}>
        <style>{'body { background-color: lightblue; }'}</style>
        <AppBar position="static">
          <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
          >
            <Tab label="Solve a puzzle"/>
            <Tab label="Example"/>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <header className="App-header">
            <Typography variant="h4" align="center" gutterBottom>
              Hi, I am your Assistant!
            </Typography>
            <div className={classes.root2} style={{position: 'absolute', left: '62%', top: '8%'}}>
              <Avatar alt="Assistant" src={assistant} className={classes.large}/>
            </div>
            <div>
            <Typography variant="body1" gutterBottom>
              Before we start, make sure you know the following:
            </Typography>
            <Term title="agent" explanation="A subject who has a certain perspective on the situation in the puzzle - often a person."/>
            <Term title="affair" explanation="A state which can be true or false - the main facts in the puzzle."/>
              <Term title="difference between knowledge and common knowledge" explanation="Knowledge is to be aware of piece of information by your own.
              Common knowledge is when all agents are aware that all agents in the puzzle know something. "/>
            </div>
          </header>
          <TruthValueAnswerComponent />
          <Button variant="contained" color="primary">Hello World</Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Page Two
        </TabPanel>
      </div>
      </React.Fragment>
  );
}

export default App;
