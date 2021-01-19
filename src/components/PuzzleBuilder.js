import React from 'react';
import styles from "./stylesComponents";
import {bindActionCreators} from "redux";
import {changeTruthValue, addSubmitted, removeStatement, removeSubmitted, removeQuestion, changeQuestion} from "../actions";
import {connect} from "react-redux";
import KeyInfo from "./KeyInfo";
import AddAffair from "./templates/AddAffair";
import AddAndStatement from "./templates/AddAndStatement";
import AddOrStatement from "./templates/AddOrStatement";
import AddIfThenStatement from "./templates/AddIfThenStatement";
import AddPossibilityStatement from "./templates/AddPossibilityStatement";
import AddKnowledgeStatement from "./templates/AddKnowledgeStatement";
import AddCommonKnowledgeStatement from "./templates/AddCommonKnowledgeStatement";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import '../App.css';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Term from "./Term";
import {
    Button,
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
import TabPanel from "./TabPanel";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeTruthValue: statement => changeTruthValue(statement),
        addSubmitted: statement => addSubmitted(statement),
        removeStatement: statement => removeStatement(statement),
        removeSubmitted: statement => removeSubmitted(statement),
        removeQuestion: statement => removeQuestion(statement),
        changeQuestion: statement => changeQuestion(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        submitted: state.submitted,
        question: state.question,
        indexQuestion: state.statements.indexOf(state.question[0])
    }
}

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PuzzleBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            open5: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
    }

    handleChange = (event, index) => {
        let combEncoded = this.props.encoded[index];
        let comb = this.props.statements[index];
        if(event){
            combEncoded = combEncoded.substring(2);
            combEncoded = combEncoded.slice(0,-1);
            comb = comb.substring(5);
            comb = "true" + comb;
        } else {
            combEncoded = "~(" + combEncoded + ")";
            comb = comb.substring(4);
            comb = "false" + comb;
        }
        this.props.changeTruthValue([index, comb, combEncoded, event]);
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

    addToFinished(index){
        if(this.props.submitted.indexOf(this.props.statements[index]) === -1){
            this.props.addSubmitted([this.props.statements[index], this.props.encoded[index]])
        } else {
            this.alreadyAddedHandler();
        }
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

    submit = () =>{
        if(!(this.props.submitted.length > 0)){
            this.noSubmittedStatements();
        } else if(!(this.props.question.length > 0)){
            this.noQuestion();
        } else{
            alert("Your submitted statement(s) and question were successfully sent to a prover.");
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Term title="HINT" explanation="You must answer the questions to proceed further."/>
                <div className='rowC'>
                <KeyInfo info={"agent"} /><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><KeyInfo info={"state"} />
                </div>
                <br/>
                <Typography variant="h6" gutterBottom>Templates to use:</Typography>
                <Term title="HINT" explanation="You must first add some states."/>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left"> <AddAffair setAlreadyAddedHandler={this.alreadyAddedHandler} /></TableCell>
                                <TableCell align="left"><AddPossibilityStatement setAlreadyAddedHandler={this.alreadyAddedHandler}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><AddAndStatement setAlreadyAddedHandler={this.alreadyAddedHandler} setsameBothSidesHandler={this.sameBothSidesHandler}/></TableCell>
                                <TableCell align="left"><AddKnowledgeStatement setAlreadyAddedHandler={this.alreadyAddedHandler}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><AddOrStatement setAlreadyAddedHandler={this.alreadyAddedHandler} setsameBothSidesHandler={this.sameBothSidesHandler}/></TableCell>
                                <TableCell align="left"><AddCommonKnowledgeStatement setAlreadyAddedHandler={this.alreadyAddedHandler}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><AddIfThenStatement setAlreadyAddedHandler={this.alreadyAddedHandler} setsameBothSidesHandler={this.sameBothSidesHandler}/></TableCell>
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
                                    <span className={(this.props.truthValues[index] ? null : classes.redText)}>{index + 1}. {item}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    {(this.props.statements[index].includes("It is common knowledge that ") ||
                                        this.props.statements[index].includes(" it is possible that "))
                                        ? null : <Typography component="div">
                                <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>False</Grid><Grid item>
                                        <AntSwitch checked={this.props.truthValues[index]} onChange={e => this.handleChange(e.target.checked, index)} name="checkedC" />
                                    </Grid><Grid item>True</Grid>
                                </Grid>
                            </Typography>}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><AssignmentTurnedInTwoToneIcon
                                fontSize="large"
                                color="primary"
                                className= {(index === this.props.indexQuestion) ? classes.hidden : null}
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
                                    <span>&nbsp;&nbsp;&nbsp;</span><HelpIcon
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
                                        <Typography>Check statement.</Typography>
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
                                        {index + 1}. {item} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><DeleteForeverOutlinedIcon
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
                                        {item} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><DeleteForeverOutlinedIcon
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
                <br/><div className="rowC">
                <Term title="HINT" explanation="Once you click the Send button, your submitted statements and question will be sent to a prover.
           It will check whether the question statement is true taking into account the submitted statements."/><span>&nbsp;&nbsp;&nbsp;</span>
                <Button variant="contained" color="primary" onClick={this.submit}>Send</Button></div>
                <Snackbar open={this.state.noSStatements} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">You must have at least one submitted statement to send!</Alert>
                </Snackbar>
                <Snackbar open={this.state.noQ} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">You must have a question to send!</Alert>
                </Snackbar>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PuzzleBuilder));