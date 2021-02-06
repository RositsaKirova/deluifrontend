//with the help of https://material-ui.com/ examples

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from "@material-ui/core/Avatar";
import assistant from './images/bigbrain.jpg';
import './App.css';
import TabPanel from "./components/TabPanel";
import PuzzleBuilder from "./components/PuzzleBuilder";
import Example from "./components/Example";

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
          <header className="rowHeader">
            <Typography variant="h4" gutterBottom>Hi, I am your Assistant!</Typography>
            <div className={classes.root2}><Avatar alt="Assistant" src={assistant} className={classes.large}/></div>
          </header>
          <PuzzleBuilder />
        </TabPanel>
        <TabPanel value={value} index={1}><Example /></TabPanel>
      </div>
      </React.Fragment>
  );
}

export default App;
