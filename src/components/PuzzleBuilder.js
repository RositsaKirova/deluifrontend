import React from 'react';
import APIService from '../service/APIService';
import styles from "./stylesComponents";
import {bindActionCreators} from "redux";
import {changeTruthValue, changeCommonKnowledge, addSubmitted, removeStatement, removeSubmitted, removeQuestion, changeQuestion, reset} from "../actions";
import {connect} from "react-redux";
import KeyInfo from "./KeyInfo";
import manipulateString from "./manipulateString";
import AddAffair from "./templates/AddAffair";
import AddAndStatement from "./templates/AddAndStatement";
import AddOrStatement from "./templates/AddOrStatement";
import AddIfThenStatement from "./templates/AddIfThenStatement";
import AddPossibilityStatement from "./templates/AddPossibilityStatement";
import AddKnowledgeStatement from "./templates/AddKnowledgeStatement";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import '../App.css';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AntSwitch from './AntSwitch'
import {
    Button, Dialog, DialogTitle,
    Grid,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import HelpIcon from '@material-ui/icons/Help';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeTruthValue: statement => changeTruthValue(statement),
        changeCommonKnowledge: statement => changeCommonKnowledge(statement),
        addSubmitted: statement => addSubmitted(statement),
        removeStatement: statement => removeStatement(statement),
        removeSubmitted: statement => removeSubmitted(statement),
        removeQuestion: statement => removeQuestion(statement),
        changeQuestion: statement => changeQuestion(statement),
        reset: statement => reset(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        submitted: state.submitted,
        submittedEncoded: state.submittedEncoded,
        cksubmitted: state.cksubmitted,
        question: state.question,
        questionEncoded: state.questionEncoded,
        indexQuestion: state.statements.indexOf(state.question[0])
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function formAsQuestion(questionStatement){
    let end = "true";
    if(questionStatement.startsWith("false:")){
        end = "false";
        questionStatement = questionStatement.substring(7);
    }
    return "Is the statement ' " + questionStatement + " ' " + end + "?";
}

function formAsAnswer(statement, answer){
    if(statement.startsWith("false:")){
        answer = !answer;
        statement = statement.substring(7);
    }
    return statement + " is " + answer;
}

class PuzzleBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructions: false,
            title: "HINT",
            alreadyAdded: false,
            sameBothSides: false,
            noSStatements: false,
            noQ: false,
            anchorEl: null,
            anchorEl2: null,
            anchorEl3: null,
            anchorEl4: null,
            anchorEl5: null,
            open: false,
            open2: false,
            open3: false,
            open4: false,
            open5: false,
            isDialogOpen: false,
            answerToSubmission: false,
            isAnswerAvailable: false,
            isQCK: false
        };
        this.handleInstructions = this.handleInstructions.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleInstructions(){
        this.setState({instructions: !this.state.instructions})
    }

    handleChange = (event, index) => {
        let combEncoded = this.props.encoded[index];
        let comb = this.props.statements[index];
        if(event){
            combEncoded = combEncoded.substring(2);
            combEncoded = combEncoded.slice(0,-1);
            comb = comb.substring(8);
            if(comb.endsWith(")*")){
                comb = comb.slice(0,-2);
            } else{
                comb = comb.slice(0,-1);
            }
        } else {
            combEncoded = "~(" + combEncoded + ")";
            if(comb.startsWith("(") && comb.endsWith(")")){
                comb = comb.substring(1);
                comb = comb.slice(0,-1);
                comb = "false: (" + comb + ")*";
            } else{
                comb = "false: (" + comb + ")";
            }
        }
        this.props.changeTruthValue([index, comb, combEncoded, event]);
    }

    handleCKswitch = (event, index) => {
        this.props.changeCommonKnowledge([index, event]);
    }

    alreadyAddedHandler = () => {
        this.setState({
            alreadyAdded: true
        })
    }

    sameBothSidesHandler = () => {
        this.setState({
            sameBothSides: true
        })
    }

    noSubmittedStatements = () => {
        this.setState({
            noSStatements: true
        })
    }

    noQuestion = () => {
        this.setState({
            noQ: true
        })
    }

    handleClose() {
        this.setState({
            alreadyAdded: false,
            sameBothSides: false,
            noSStatements: false,
            noQ: false
        })
    }

    handlePopoverOpen = (numberOfIcon, event) => {
        if(numberOfIcon === 1) {
            this.setState({
                anchorEl: event.currentTarget,
                open: true
            })
        }
        if(numberOfIcon === 2) {
            this.setState({
                anchorEl2: event.currentTarget,
                open2: true
            })
        }
        if(numberOfIcon === 3) {
            this.setState({
                anchorEl3: event.currentTarget,
                open3: true
            })
        }
        if(numberOfIcon === 4) {
            this.setState({
                anchorEl4: event.currentTarget,
                open4: true
            })
        }
        if(numberOfIcon === 5) {
            this.setState({
                anchorEl5: event.currentTarget,
                open5: true
            })
        }
    };

    handlePopoverClose(numberOfIcon) {
        if(numberOfIcon === 1) {
            this.setState({
                anchorEl: null,
                open: false
            })
        }
        if(numberOfIcon === 2) {
            this.setState({
                anchorEl2: null,
                open2: false
            })
        }
        if(numberOfIcon === 3) {
            this.setState({
                anchorEl3: null,
                open3: false
            })
        }
        if(numberOfIcon === 4) {
            this.setState({
                anchorEl4: null,
                open4: false
            })
        }
        if(numberOfIcon === 5) {
            this.setState({
                anchorEl5: null,
                open5: false
            })
        }
    };

    handleDialogClose(value){
        this.setState({
            isDialogOpen: false,
            isAnswerAvailable: false,
            isAnswerReady: false
        })
        if(value){
            this.props.reset(null);
        }
    }

    addToFinished(index){
        this.props.addSubmitted([this.props.statements[index], this.props.encoded[index]]);
    }

    setQuestion(index){
        this.props.changeQuestion(index);
        this.setState({
            open5: false
        })
    }

    removeFromCombinationsInProcess = (index) => {
        this.props.removeStatement(index);
        this.setState({
            open2: false
        })
    }

    removeFromFinished = (index) => {
        this.props.removeSubmitted(index);
        this.setState({
            open3: false
        })
    }

    removeQuestion(){
        this.props.removeQuestion();
    }

    setAnswer(data){
        this.props.changeAnswer(data);
    }

    submit(){
        if(!(this.props.submitted.length > 0)){
            this.noSubmittedStatements();
        } else if(!(this.props.question.length > 0)){
            this.noQuestion();
        } else{
            APIService.postQuestion(this.props.submittedEncoded, this.props.cksubmitted, this.props.questionEncoded)
                .then((response) => {
                    if(response.data != null){
                        this.setState({
                            isDialogOpen: true
                        })
                        APIService.getTruthValueAnswer().then((response) => {
                            if(response.data != null){
                                if(response.data == this.state.answerToSubmission){
                                    this.setState({
                                        isAnswerAvailable: true
                                    })
                                } else if(!(response.data == "Sorry, I cannot answer your question!")){
                                    this.setState({
                                        isAnswerAvailable: true,
                                        answerToSubmission: !this.state.answerToSubmission
                                    })
                                }
                                console.log("Answer is: " + response.data);
                            }
                        })
                            .catch(function (ex) {
                                console.log('Response parsing failed. Error: ', ex);
                            });
                    }
                })
                .catch(function (ex) {
                    console.log('Response parsing failed. Error: ', ex);
                });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="body1" gutterBottom>View the EXAMPLE section to read explanations about terminology and check out on some examples.
                    You can switch between the two tabs without losing your input.</Typography><br/>
                <Typography variant="body1" gutterBottom>Do you need instructions on how to use the input form?</Typography>
                <span>&nbsp;&nbsp;&nbsp;</span><Grid component="label" container alignItems="center" spacing={1}><Grid item>No</Grid><Grid item>
                <AntSwitch checked={this.state.instructions} onChange={this.handleInstructions}/></Grid><Grid item>Yes</Grid></Grid>
                <br/>
                <Typography variant="h5" color="secondary" gutterBottom>Let's puzzle our brains!</Typography>
                <hr style={{color: '#4141D8', backgroundColor: '#4141D8',height: 5}}/>
                {this.state.instructions ? <div><div style={{border: '2px solid black'}}><p>⚫ You need to answer the two questions below to proceed further.
                Later on you will use your agents and states to explain your puzzle.</p>
                    <p>⚫ You shouldn't add states presenting two sides of the same coin.
                        For example, if you need a statement "it is sunny in Glasgow" and another one "it is not sunny in Glasgow", only add a state for "it is sunny in Glasgow".
                    Later on you can set the state "it is sunny in Glasgow" to false and that will explain the statement "it is not sunny in Glasgow".</p></div><br/></div> : null}
                <div className='rowC'>
                <KeyInfo info={"agent"} /><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><KeyInfo info={"state"} />
                </div>
                <br/>
                {this.state.instructions ? <div><div style={{border: '2px solid black'}}><p>⚫ You need to present your puzzle using the templates available below.
                To present a piece of information like "Amy knows it is not sunny in Glasgow", you need to do the following.</p>
                    <p>1) Assuming you already named a state "it is sunny in Glasgow", use the first template to select it and then click the '+' icon to add it.
                    To use the rest of the templates, you always need to first add a state.</p>
                    <p>2) Then you will have the statement 'it is sunny in Glasgow' in the table 'Statements in progress' below. Added statements are considered true by default.
                    You can set the statement to false using the true-false switch. That will turn your statement into 'false: (it is sunny in Glasgow)'.</p>
                    <p>3) Now you need to find the template 'agent KNOWS a statement'. Assuming you already named an agent "Amy", you select the agent Amy
                    and the statement 'false: (it is sunny in Glasgow)'. You can select a statement from all statements which are currently in 'Statements in progress'.
                        Then click the '+' icon to add. The statement you just added to 'Statements in progress' looks like 'Amy knows false: (it is sunny in Glasgow)' and presents "Amy knows it is not sunny in Glasgow".</p>
                <p>⚫ To express that a statement is common knowledge, you don't use the templates. You set a statement to be common knowledge later on.</p></div><br/></div> : null}
                <Typography variant="h6" gutterBottom>Templates to use:</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left"> <AddAffair setAlreadyAddedHandler={this.alreadyAddedHandler} /></TableCell>
                                <TableCell align="left"><AddIfThenStatement setAlreadyAddedHandler={this.alreadyAddedHandler} setsameBothSidesHandler={this.sameBothSidesHandler}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><AddAndStatement setAlreadyAddedHandler={this.alreadyAddedHandler} setsameBothSidesHandler={this.sameBothSidesHandler}/></TableCell>
                                <TableCell align="left"><AddPossibilityStatement setAlreadyAddedHandler={this.alreadyAddedHandler}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><AddOrStatement setAlreadyAddedHandler={this.alreadyAddedHandler} setsameBothSidesHandler={this.sameBothSidesHandler}/></TableCell>
                                <TableCell align="left"><AddKnowledgeStatement setAlreadyAddedHandler={this.alreadyAddedHandler}/></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <Snackbar open={this.state.alreadyAdded} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="warning">You already added this one!</Alert>
                </Snackbar>
                <Snackbar open={this.state.sameBothSides} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="warning">You need to select different combinations on the different sides!</Alert>
                </Snackbar>
                {this.state.instructions ? <div><div style={{border: '2px solid black'}}>
                    <p>⚫ <span style={{fontWeight: "bold"}}>What is the 'Statements in progress' table for?</span> All statements added go there.
                        It stores the statements you generate so you can build on them until you manage to explain a piece of information from your puzzle.
                        We already explained how to do that for "Amy knows it is not sunny in Glasgow". </p>
                    <p>⚫ <span style={{fontWeight: "bold"}}>What is the 'Submitted statements' table for?</span> This table should hold only statements explaining your puzzle and in the end contain all the statements needed to fully explain it.
                        Once you have the exact piece of information you need in 'Statements in progress', click the '✓' icon on the same line to add it to the table 'Submitted statements'.
                    Here you can set a statement to be common knowledge.</p>
                    <p>⚫ <span style={{fontWeight: "bold"}}>What is the 'Your question' table for?</span> This table is for a statement which validity you want to check.
                        Decide on a question that will help you solve your puzzle. You create this statement in the usual way and after you have it in 'Statements in progress', you click the '?' icon to add it to the 'Your question' table.</p>
                    <p>⚫ You can have only one question.</p>
                    <p>⚫ A statement can't be a submitted statement and a question in the same time.</p>
                </div><br/></div> : null}
                <div className='rowC'>
                    <Table className="float-left" style={{ width: "46vw", border: "3px solid rgb(0, 0, 0)"}} aria-label="simple table">
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell className={classes.cellHeadFontSize}>Statements in progress</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                    {this.props.statements.map((item, index) => (
                        <TableRow>
                            <TableCell className={classes.cellFontSize} align="left">
                                <div className='rowC'>
                                    <span className={(this.props.truthValues[index] ? null : classes.redText)}>{index + 1}. {manipulateString(item)}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    {(this.props.statements[index].includes(" suppose ") || this.props.statements[index].includes(" supposes "))
                                        ? null : <Typography component="div">
                                <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>False</Grid><Grid item>
                                        <AntSwitch checked={this.props.truthValues[index]} onChange={e => this.handleChange(e.target.checked, index)}/>
                                    </Grid><Grid item>True</Grid>
                                </Grid>
                            </Typography>}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{this.props.submitted.indexOf(item) !== -1 ? <span>SUBMITTED</span> : null}<AssignmentTurnedInTwoToneIcon
                                fontSize="large"
                                color="primary"
                                className= {(index === this.props.indexQuestion || this.props.submitted.indexOf(item) !== -1) ?
                                    classes.hidden : null}
                                aria-owns={this.state.open ? 'mouse-over-popover' : undefined} aria-haspopup="true"
                                onMouseEnter={e => this.handlePopoverOpen(1, e)}
                                onMouseLeave={() => this.handlePopoverClose(1)}
                                onClick={() => this.addToFinished(index)}
                            ></AssignmentTurnedInTwoToneIcon>
                                <Popover
                                    id="mouse-over-popover"
                                    className={classes.popover}
                                    classes={{
                                        paper: classes.paper,
                                    }}
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    onClose={() => this.handlePopoverClose(1)}
                                    disableRestoreFocus
                                >
                                    <Typography>Submit statement.</Typography>
                                </Popover>
                            <span>&nbsp;&nbsp;&nbsp;</span><DeleteForeverOutlinedIcon
                            fontSize="large"
                            color="primary"
                            aria-owns={this.state.open2 ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={e => this.handlePopoverOpen(2, e)}
                            onMouseLeave={() => this.handlePopoverClose(2)}
                            onClick={() => this.removeFromCombinationsInProcess(index)}></DeleteForeverOutlinedIcon>
                                <Popover
                                    id="mouse-over-popover"
                                    className={classes.popover}
                                    classes={{
                                        paper: classes.paper,
                                    }}
                                    open={this.state.open2}
                                    anchorEl={this.state.anchorEl2}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    onClose={() => this.handlePopoverClose(2)}
                                    disableRestoreFocus
                                >
                                    <Typography>Remove statement.</Typography>
                                </Popover>
                                    <span>&nbsp;&nbsp;&nbsp;</span>{this.props.question[0] === item ? <span>SET AS A QUESTION</span> : null}<HelpIcon
                                        fontSize="large"
                                        color="primary"
                                        className= {((this.props.question && this.props.question.length) || this.props.submitted.indexOf(item) !== -1)
                                             ? classes.hidden : null}
                                        aria-owns={this.state.open5 ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={e => this.handlePopoverOpen(5, e)}
                                        onMouseLeave={() => this.handlePopoverClose(5)}
                                        onClick={() => this.setQuestion(index)}></HelpIcon>
                                    <Popover
                                        id="mouse-over-popover"
                                        className={classes.popover}
                                        classes={{
                                            paper: classes.paper,
                                        }}
                                        open={this.state.open5}
                                        anchorEl={this.state.anchorEl5}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        onClose={() => this.handlePopoverClose(5)}
                                        disableRestoreFocus
                                    >
                                        <Typography>Set to be the question statement.</Typography>
                                    </Popover>
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
                            {this.props.submitted.map((item, index) => (
                                <TableRow>
                                    <TableCell className={classes.cellFontSize} align="left">
                                        {index + 1}. {manipulateString(item)} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <FormControlLabel
                                            control={<Switch checked={this.props.cksubmitted[index]} onChange={e => this.handleCKswitch(e.target.checked, index)}/>}
                                            label="is common knowledge"
                                        />
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><DeleteForeverOutlinedIcon
                                        fontSize="large"
                                        color="primary"
                                        aria-owns={this.state.open3 ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={e => this.handlePopoverOpen(3, e)}
                                        onMouseLeave={() => this.handlePopoverClose(3)}
                                        onClick={() => this.removeFromFinished(index)}></DeleteForeverOutlinedIcon>
                                        <Popover
                                            id="mouse-over-popover"
                                            className={classes.popover}
                                            classes={{
                                                paper: classes.paper,
                                            }}
                                            open={this.state.open3}
                                            anchorEl={this.state.anchorEl3}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            onClose={() => this.handlePopoverClose(3)}
                                            disableRestoreFocus
                                        >
                                            <Typography>Remove statement.</Typography>
                                        </Popover>
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
                            {this.props.question.map((item) => (
                                <TableRow>
                                    <TableCell className={classes.cellFontSize} align="left">
                                        {formAsQuestion(manipulateString(item))} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><DeleteForeverOutlinedIcon
                                        fontSize="large"
                                        color="primary"
                                        aria-owns={this.state.open4 ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={e => this.handlePopoverOpen(4, e)}
                                        onMouseLeave={() => this.handlePopoverClose(4)}
                                        onClick={this.removeQuestion}></DeleteForeverOutlinedIcon>
                                        <Popover
                                            id="mouse-over-popover"
                                            className={classes.popover}
                                            classes={{
                                                paper: classes.paper,
                                            }}
                                            open={this.state.open3}
                                            anchorEl={this.state.anchorEl3}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            onClose={() => this.handlePopoverClose(4)}
                                            disableRestoreFocus
                                        >
                                            <Typography>Remove question.</Typography>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
                <br/>
                {this.state.instructions ? <div><div style={{border: '2px solid black'}}>
                    <p>⚫ Once you click the Send button below, the submitted statements explaining your puzzle and the question will be sent to a prover.
                        It will check whether the question statement is true taking into account the submitted statements and will be very kind to come back with an answer.</p>
                    <p>⚫ The prover needs time for checking. You can observe how it processes. Don't interrupt its work, otherwise it won't be able to answer your question.</p>
                    </div><br/></div> : null}
                <Button variant="contained" color="primary" onClick={this.submit}>Send</Button>
                <Snackbar open={this.state.noSStatements} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">You must have at least one submitted statement to send!</Alert>
                </Snackbar>
                <Snackbar open={this.state.noQ} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">You must have a question to send!</Alert>
                </Snackbar>
                <Dialog aria-labelledby="simple-dialog-title" open={this.state.isDialogOpen}>
                    <DialogTitle id="simple-dialog-title">Here is the answer!</DialogTitle>
                    {this.state.isAnswerAvailable ? <div style={{justifyContent: 'center'}}><span>&nbsp;</span>
                        <p>'    Statement <span style={{fontWeight: "bold", fontSize: "24"}}>{formAsAnswer(manipulateString(this.props.question[0]), this.state.answerToSubmission)}</span>.    '</p><span>&nbsp;</span>
                    <br/><Button  style={{float: 'right'}} variant="contained" color={"primary"} onClick={() => this.handleDialogClose(false)}>Update form</Button><span>&nbsp;&nbsp;&nbsp;</span>
                        <Button  style={{float: 'left'}} variant="contained" color={"primary"} onClick={() => this.handleDialogClose(true)}>Reset form</Button></div> :
                        <div style={{justifyContent: 'center'}}><span>&nbsp;</span>
                            <p>Sorry, the prover cannot answer your question. Update the form and try again.</p><span>&nbsp;</span>
                            <br/><Button  style={{float: 'right'}} variant="contained" color={"primary"} onClick={() => this.handleDialogClose(false)}>Update form</Button></div>}
                </Dialog>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PuzzleBuilder));