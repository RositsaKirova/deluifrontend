import React from 'react';
import Typography from "@material-ui/core/Typography";
import '../App.css';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AntSwitch from './AntSwitch'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    table: {
        width: '90vw',
    },
    head: {
        backgroundColor: theme.palette.common.black
    },
    cellHeadFontSize: {
        fontSize: '13pt',
        color: theme.palette.common.white
    },
    cellFontSize: {
        fontSize: '13pt'
    },
    redText: {
        color: 'red'
    },
    hidden: {
        display: 'none',
    }
}));

function Example() {
    const classes = useStyles();
    const statements = ["false: state(prisoner 1 has a blue hat)", "false: state(prisoner 2 has a blue hat)",
    "false: state(prisoner 3 has a blue hat)", "true: (true: state(prisoner 1 has a blue hat)) AND (true: state(prisoner 2 has a blue hat))",
    "true: IF (true: (true: state(prisoner 1 has a blue hat)) AND (true: state(prisoner 2 has a blue hat))) THEN (false: state(prisoner 3 has a blue hat))",
    "true: (true: state(prisoner 2 has a blue hat)) AND (true: state(prisoner 3 has a blue hat))",
    "true: IF (true: (true: state(prisoner 2 has a blue hat)) AND (true: state(prisoner 3 has a blue hat))) THEN (false: state(prisoner 1 has a blue hat))",
    "true: (true: state(prisoner 1 has a blue hat)) AND (true: state(prisoner 3 has a blue hat))",
    "true: IF (true: (true: state(prisoner 1 has a blue hat)) AND (true: state(prisoner 3 has a blue hat))) THEN (false: state(prisoner 2 has a blue hat))",
    "true: agents(prisoner 1,prisoner 2) know that (true: state(prisoner 3 has a blue hat))",
    "true: agents(prisoner 1,prisoner 2) know that (false: state(prisoner 3 has a blue hat))",
    "true: (true: agents(prisoner 1,prisoner 2) know that (true: state(prisoner 3 has a blue hat))) OR (true: agents(prisoner 1,prisoner 2) know that (false: state(prisoner 3 has a blue hat)))",
    "true: agents(prisoner 2,prisoner 3) know that (true: state(prisoner 1 has a blue hat))",
    "true: agents(prisoner 2,prisoner 3) know that (false: state(prisoner 1 has a blue hat))",
    "true: (true: agents(prisoner 2,prisoner 3) know that (true: state(prisoner 1 has a blue hat))) OR (true: agents(prisoner 2,prisoner 3) know that (false: state(prisoner 1 has a blue hat)))",
    "true: agents(prisoner 1,prisoner 3) know that (true: state(prisoner 2 has a blue hat))",
    "true: agents(prisoner 1,prisoner 3) know that (false: state(prisoner 2 has a blue hat))",
    "true: (true: agents(prisoner 1,prisoner 3) know that (true: state(prisoner 2 has a blue hat))) OR (true: agents(prisoner 1,prisoner 3) know that (false: state(prisoner 2 has a blue hat)))",
    "true: agent(prisoner 1) knows that (true: state(prisoner 1 has a blue hat))",
    "true: agent(prisoner 1) knows that (false: state(prisoner 1 has a blue hat))",
    "true: (true: agent(prisoner 1) knows that (true: state(prisoner 1 has a blue hat))) OR (true: agent(prisoner 1) knows that (false: state(prisoner 1 has a blue hat)))",
    "true: agent(prisoner 2) knows that (true: state(prisoner 2 has a blue hat))",
    "true: agent(prisoner 2) knows that (false: state(prisoner 2 has a blue hat))",
    "true: (true: agent(prisoner 2) knows that (true: state(prisoner 2 has a blue hat))) OR (true: agent(prisoner 2) knows that (false: state(prisoner 2 has a blue hat)))",
    "true: agent(prisoner 3) knows that (true: state(prisoner 3 has a blue hat))",
    "true: agent(prisoner 3) knows that (false: state(prisoner 3 has a blue hat))",
    "true: (true: agent(prisoner 3) knows that (true: state(prisoner 3 has a blue hat))) OR (true: agent(prisoner 3) knows that (false: state(prisoner 3 has a blue hat)))",
    "true: (true: (true: agent(prisoner 1) knows that (true: state(prisoner 1 has a blue hat))) OR (true: agent(prisoner 1) knows that (false: state(prisoner 1 has a blue hat)))) OR (true: (true: agent(prisoner 2) knows that (true: state(prisoner 2 has a blue hat))) OR (true: agent(prisoner 2) knows that (false: state(prisoner 2 has a blue hat))))",
    "true: (true: (true: (true: agent(prisoner 1) knows that (true: state(prisoner 1 has a blue hat))) OR (true: agent(prisoner 1) knows that (false: state(prisoner 1 has a blue hat)))) OR (true: (true: agent(prisoner 2) knows that (true: state(prisoner 2 has a blue hat))) OR (true: agent(prisoner 2) knows that (false: state(prisoner 2 has a blue hat))))) OR (true: (true: agent(prisoner 3) knows that (true: state(prisoner 3 has a blue hat))) OR (true: agent(prisoner 3) knows that (false: state(prisoner 3 has a blue hat))))"];

    const ifTrue = [false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
    const submittedIndexes = [4,6,8,11,14,17];
    const question = 28;

    return (
        <div>
            <header className="rowHeader">
                <Typography variant="h4" gutterBottom>Three hats puzzle</Typography>
            </header>
            <Typography variant="h5" color="secondary" gutterBottom>Puzzle</Typography>
            <Typography variant="body1" gutterBottom>
                In a room there are <span style={{fontWeight: 600}}>3 prisoners</span>. Each prisoner is randomly given a hat out of <span style={{fontWeight: 600}}>5 hats - 2 blue and 3 red</span>.
                <span style={{fontWeight: 600}}> Each prisoner sees and knows the hats of the two others, but not their own. </span>At the same time they each have to guess their own hat color or pass.
                <span style={{fontWeight: 600}}> They win release if at least one person guessed correctly and none guessed incorrectly. </span>Passing is neither correct nor incorrect.
            </Typography>
            <Typography variant="h5" color="secondary" gutterBottom>Terminology</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Agent</span> is an object which observes the situation it is placed in from a certain angle and
                in a certain way depending on its beliefs and knowledge for the situation.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>State</span> is a possible fact in the situation - what the situation may be.
                When it is defined to be true or false, it becomes a <span style={{fontWeight: 600}}>statement</span>. Statements express how the situation is.</Typography>
            <Typography variant="body1" gutterBottom>An agent <span style={{fontWeight: 600}}>knows a statement</span> when this knowledge is justified. A statement <span style={{fontWeight: 600}}>is common knowledge</span> when every agent knows that every agent knows that every agent knows, and so on, the statement.</Typography>
            <Typography variant="body1" gutterBottom>For an agent <span style={{fontWeight: 600}}>a statement is possible</span> without it necessarily being so due to lack of justification for it not being possible. In other words, when the agent doesn't know that the statement is not possible.</Typography>
            <Typography variant="h5" color="secondary" gutterBottom>In Three hats puzzle there are</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>3 agents:</span> prisoner 1, prisoner 2 and prisoner 3.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>All objects which observe the situation.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>3 states:</span> prisoner 1 has a blue hat, prisoner 2 has a blue hat and prisoner 3 has a blue hat.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                On every state there exist 2 possible statements. For example, it could be true that prisoner 1 has a blue hat or the same could be false because prisoner 1 actually has a red hat.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>many statements</span> explaining the puzzle:</Typography>
            <ol>
                <li><Typography variant="body1" gutterBottom>If prisoner 1 and prisoner 2 both have blue hats, then prisoner 3 has a red hat.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>That is because there are only 2 blue hats.</Typography></li>
                <li><Typography variant="body1" gutterBottom>If prisoner 2 and prisoner 3 both have blue hats, then prisoner 1 has a red hat.</Typography></li>
                <li><Typography variant="body1" gutterBottom>If prisoner 1 and prisoner 3 both have blue hats, then prisoner 2 has a red hat.</Typography></li>
                <li><Typography variant="body1" gutterBottom>Prisoner 1 and 2 know whether prisoner 3 has a blue hat or not.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>That is because they see it and that is a justification.</Typography></li>
                <li><Typography variant="body1" gutterBottom>Prisoner 2 and 3 know whether prisoner 1 has a blue hat or not.</Typography></li>
                <li><Typography variant="body1" gutterBottom>Prisoner 1 and 3 know whether prisoner 2 has a blue hat or not.</Typography></li>
                <li><Typography variant="body1" gutterBottom>All of the above statements are common knowledge.</Typography></li>
            </ol>
            <Typography variant="body1" gutterBottom>Except for number 7, the numbers of the above statements correspond to the numbers of the submitted statements in the filled form below.</Typography>
            <Typography variant="h5" color="secondary" gutterBottom>Filled input form</Typography>
            <div className='rowC'>
                <div>
                    <div className='rowC'>
                        <Typography variant="body1" gutterBottom>How many agents are involved?<span>&nbsp;&nbsp;&nbsp;</span></Typography>
                        <input readOnly value = {3}/>
                    </div>
                    <Typography variant="body1" gutterBottom>3 agent(s) <button>Ready renaming</button></Typography>
                    <ul><li>agent "prisoner 1" -> Rename it : <input readOnly placeholder="Please provide a name"/></li>
                        <li>agent "prisoner 2" -> Rename it : <input readOnly placeholder="Please provide a name"/></li>
                        <li>agent "prisoner 3" -> Rename it : <input readOnly placeholder="Please provide a name"/></li></ul>
                </div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <div>
                    <div className='rowC'>
                        <Typography variant="body1" gutterBottom>How many states are involved?<span>&nbsp;&nbsp;&nbsp;</span></Typography>
                        <input readOnly value = {3}/>
                    </div>
                    <Typography variant="body1" gutterBottom>3 state(s) <button>Ready renaming</button></Typography>
                    <ul><li>state "prisoner 1 has a blue hat" -> Rename it : <input readOnly placeholder="Please provide a name"/></li>
                        <li>state "prisoner 2 has a blue hat" -> Rename it : <input readOnly placeholder="Please provide a name"/></li>
                        <li>state "prisoner 3 has a blue hat" -> Rename it : <input readOnly placeholder="Please provide a name"/></li></ul>
                </div>
            </div>
            <Typography variant="h6" gutterBottom>Templates to use:</Typography>
            <Typography variant="body1" gutterBottom>...</Typography>
            <div className='rowC'>
                <Table className="float-left" style={{ width: "46vw", border: "3px solid rgb(0, 0, 0)"}} aria-label="simple table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.cellHeadFontSize}>Statements in progress</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statements.map((item, index) => (
                            <TableRow>
                                <TableCell className={classes.cellFontSize} align="left">
                                    <div className='rowC'>
                                        <span className={(ifTrue[index] ? null : classes.redText)}>{index + 1}. {item}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <Typography component="div">
                                                <Grid component="label" container alignItems="center" spacing={1}>
                                                    <Grid item>False</Grid><Grid item>
                                                    <AntSwitch checked={ifTrue[index]}/>
                                                </Grid><Grid item>True</Grid>
                                                </Grid>
                                            </Typography><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <AssignmentTurnedInTwoToneIcon fontSize="large" color="primary" className= {(submittedIndexes.indexOf(index) !== -1 || index === question) ? classes.hidden : null}></AssignmentTurnedInTwoToneIcon>
                                        <span>&nbsp;&nbsp;&nbsp;</span><DeleteForeverOutlinedIcon fontSize="large" color="primary"></DeleteForeverOutlinedIcon>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <div className="float-right">
                    <Table style={{ width: "46vw", border: "3px solid rgb(0, 0, 0)"}} aria-label="simple table">
                        <TableHead className={classes.head}>
                            <TableRow >
                                <TableCell className={classes.cellHeadFontSize}>Submitted statements</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submittedIndexes.map((item, index) => (
                                <TableRow>
                                    <TableCell className={classes.cellFontSize} align="left">
                                        {index + 1}. {statements[item]} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <FormControlLabel control={<Switch checked={true}/>} label="is common knowledge"/>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><DeleteForeverOutlinedIcon fontSize="large" color="primary"></DeleteForeverOutlinedIcon>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Table className="float-right" style={{ width: "46vw", border: "3px solid rgb(0, 0, 0)"}} aria-label="simple table">
                        <TableHead className={classes.head}>
                            <TableRow >
                                <TableCell className={classes.cellHeadFontSize}>Your question:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                    <TableCell className={classes.cellFontSize} align="left">
                                        {statements[question]} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <DeleteForeverOutlinedIcon fontSize="large" color="primary"></DeleteForeverOutlinedIcon>
                                    </TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Example;