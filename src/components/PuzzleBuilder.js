import React from 'react';
import KeyInfo from "./KeyInfo";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

import '../App.css';

import {withStyles} from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from '@material-ui/core/Switch';
import {
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
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import HelpIcon from '@material-ui/icons/Help';

const styles = theme => ({
    select: {
        border:'2px solid black',
        minWidth: 200,
        maxWidth: 300,
        textAlign: "center"
    },
    templateTexts: {
        border: '2px solid black',
        textAlign: "center",
        fontWeight: 'bold',
        backgroundColor: "lightgray"
    },
    table: {
        width: '90vw',
    },
    cellFontSize: {
        fontSize: '13pt'
    },
    redText: {
        color: 'red'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    hidden: {
        display: 'none',
    }
});

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function substringBetween(s, a, b) {
    if(s.indexOf(a) === -1){
        return ""
    }
    let p = s.indexOf(a) + a.length;
    return s.substring(p, s.indexOf(b, p));
}

class PuzzleBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agents: [],
            affairs: [],
            combinationsInProcess: [],
            combinationsInProcessEncoded: [],
            combinationsTruthValues: [],
            finished: [],
            finishedEncoded: [],
            question: [],
            questionEncoded: '',
            affair: "Select an affair",
            leftAnd: "Select a statement",
            rightAnd: "Select a statement",
            leftOr: "Select a statement",
            rightOr: "Select a statement",
            leftThen: "Select a statement",
            rightThen: "Select a statement",
            agent: ["agent(s)"],
            knows: "Select a statement",
            cknowledge: "Select a statement",
            agent2: ["agent(s)"],
            pknowledge: "Select a statement",
            alreadyAdded: false,
            sameBothSides: false,
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
        this.addAffair = this.addAffair.bind(this);
        this.addAnd = this.addAnd.bind(this);
        this.addOr = this.addOr.bind(this);
        this.addIfThen = this.addIfThen.bind(this);
        this.addKnowledge = this.addKnowledge.bind(this);
        this.addCommonKnowledge = this.addCommonKnowledge.bind(this);
        this.addPossibleKnowledge = this.addPossibleKnowledge.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
    }

    //CALLBACKS
    callbackAgents = async (agentsData, numberOfAgents, numberOfChangedAgent) => {
        let agentsNumberNow = this.state.agents.length;
        if(numberOfAgents !== -1){
            if(numberOfAgents < agentsNumberNow) {
                if (numberOfAgents < this.state.agent) {
                    await this.setState({
                        agent: ["agent(s)"],
                        agent2: ["agent(s)"]
                    });
                }
                this.removeFromCombinations('ag',parseInt(numberOfAgents) + 1, agentsNumberNow);
            }
        } else {
            this.updateAgentsInCombinations(this.state.agents[numberOfChangedAgent], agentsData[numberOfChangedAgent]);
        }
        await this.setState({agents: agentsData})
    }

    callbackAffairs = async (affairsData, numberOfAffairs, numberOfChangedAffair) => {
        let affairsNumberNow = this.state.affairs.length;
        if(numberOfAffairs !== -1){
            if(numberOfAffairs < affairsNumberNow) {
                if (numberOfAffairs < this.state.affair) {
                    await this.setState({affair: "Select an affair"})
                }
                this.removeFromCombinations('a', parseInt(numberOfAffairs) + 1, affairsNumberNow);
            }
        } else {
            this.updateAffairsInCombinations(this.state.affairs[numberOfChangedAffair], affairsData[numberOfChangedAffair]);
        }
        await this.setState({
            affairs: affairsData,
        })
    }

    //HANDLERS
    handleAffairChange = (event) => {
        this.setState({affair: event})
    };

    handleLeftAndChange = (event) => {
        this.setState({leftAnd: event})
    };

    handleRightAndChange = (event) => {
        this.setState({rightAnd: event})
    };

    handleLeftOrChange = (event) => {
        this.setState({leftOr: event})
    };

    handleRightOrChange = (event) => {
        this.setState({rightOr: event})
    };

    handleLeftThenChange = (event) => {
        this.setState({leftThen: event})
    };

    handleRightThenChange = (event) => {
        this.setState({rightThen: event})
    };

    handleAgentsKnowledgeChange = (type, event) => {
        if(!(event && event.length)){
            event = ["agent(s)"]
        }
        if(event.length > 1){
            if(event[0] === "agent(s)") {
                let tempEvent = event.slice(1);
                event = tempEvent;
            }
        }
        if(type === 1) {
            this.setState({agent: event})
        } else{
            this.setState({agent2: event})
        }
    };

    handleKnowsChange = (event) => {
        this.setState({knows: event})
    };

    handleCKnowledgeChange = (event) => {
        this.setState({cknowledge: event})
    };

    handlePKnowledgeChange = (event) => {
        this.setState({pknowledge: event})
    };

    handleChange = (event, index) => {
        let values = this.state.combinationsTruthValues;
        values[index] = event;
        let combEncoded = this.state.combinationsInProcessEncoded;
        let comb = this.state.combinationsInProcess;
        if(event){
            combEncoded[index] = combEncoded[index].substring(2);
            combEncoded[index] = combEncoded[index].slice(0,-1);
            comb[index] = comb[index].substring(5);
            comb[index] = "true" + comb[index];
        } else {
            combEncoded[index] = "~(" + combEncoded[index] + ")";
            comb[index] = comb[index].substring(4);
            comb[index] = "false" + comb[index];
        }

        this.setState({
            combinationsTruthValues: values,
            combinationsInProcessEncoded:combEncoded,
            combinationsInProcess: comb
        });
    }

    alreadyAddedHandler(){
        this.setState({
            alreadyAdded: true
        })
    }

    sameBothSidesHandler(){
        this.setState({
            sameBothSides: true
        })
    }

    handleClose() {
        this.setState({
            alreadyAdded: false,
            sameBothSides: false
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
        } else{
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
        } else{
            this.setState({
                anchorEl5: null,
                open5: false
            })
        }
    };

    //ADD
    async addAffair() {
        let indexAffair = this.state.affair;
        if (!(indexAffair === "Select an affair")) {
            let newAffairEncoded = 'a' + indexAffair;
            let combEncoded = this.state.combinationsInProcessEncoded;
            if(combEncoded.indexOf(newAffairEncoded) === -1 && combEncoded.indexOf("~(" + newAffairEncoded + ")") === -1){
                combEncoded.push(newAffairEncoded);
                let comb = this.state.combinationsInProcess;
                comb.push("true: affair(" + this.state.affairs[indexAffair-1] + ")");
                let truthValue = this.state.combinationsTruthValues;
                truthValue.push(true);

                await this.setState({
                    combinationsInProcessEncoded: combEncoded,
                    combinationsInProcess: comb,
                    combinationsTruthValues: truthValue,
                    affair: "Select an affair"
                })
            } else {
                this.alreadyAddedHandler();
            }
        }
    }

    async addAnd() {
        let indexLeftAnd = this.state.leftAnd;
        let indexRightAnd = this.state.rightAnd;
        if (!(indexLeftAnd === "Select a statement") && !(indexRightAnd === "Select a statement")) {
            if(!(indexLeftAnd === indexRightAnd)) {
                let combEncoded = this.state.combinationsInProcessEncoded;
                let newAndEncoded = "(" + combEncoded[indexLeftAnd] + ")&(" + combEncoded[indexRightAnd] + ")";
                let newAndEncodedReversed = "(" + combEncoded[indexRightAnd] + ")&(" + combEncoded[indexLeftAnd] + ")";
                if (combEncoded.indexOf(newAndEncoded) === -1 && combEncoded.indexOf(newAndEncodedReversed) === -1 &&
                    combEncoded.indexOf("~(" + newAndEncoded + ")") === -1 && combEncoded.indexOf("~(" + newAndEncodedReversed + ")") === -1) {
                    combEncoded.push(newAndEncoded);
                    let comb = this.state.combinationsInProcess;
                    comb.push("true: (" + comb[indexLeftAnd] + ") AND (" + comb[indexRightAnd] + ")");
                    let truthValue = this.state.combinationsTruthValues;
                    truthValue.push(true);

                    await this.setState({
                        combinationsInProcessEncoded: combEncoded,
                        combinationsInProcess: comb,
                        combinationsTruthValues: truthValue,
                        leftAnd: "Select a statement",
                        rightAnd: "Select a statement"
                    })
                } else {
                    this.alreadyAddedHandler();
                }
            } else{
                this.sameBothSidesHandler();
            }
        }
    }

    async addOr() {
        let indexLeftOr = this.state.leftOr;
        let indexRightOr = this.state.rightOr;
        if (!(indexLeftOr === "Select a statement") && !(indexRightOr === "Select a statement")) {
            if(!(indexLeftOr === indexRightOr)) {
                let combEncoded = this.state.combinationsInProcessEncoded;
                let newEncoded = "(" + combEncoded[indexLeftOr] + ")|(" + combEncoded[indexRightOr] + ")";
                let newEncodedReversed = "(" + combEncoded[indexRightOr] + ")|(" + combEncoded[indexLeftOr] + ")";
                if (combEncoded.indexOf(newEncoded) === -1 && combEncoded.indexOf(newEncodedReversed) === -1 &&
                    combEncoded.indexOf("~(" + newEncoded + ")") === -1 && combEncoded.indexOf("~(" + newEncodedReversed + ")") === -1) {
                    combEncoded.push(newEncoded);
                    let comb = this.state.combinationsInProcess;
                    comb.push("true: (" + comb[indexLeftOr] + ") OR (" + comb[indexRightOr] + ")");
                    let truthValue = this.state.combinationsTruthValues;
                    truthValue.push(true);

                    await this.setState({
                        combinationsInProcessEncoded: combEncoded,
                        combinationsInProcess: comb,
                        combinationsTruthValues: truthValue,
                        leftOr: "Select a statement",
                        rightOr: "Select a statement"
                    })
                } else {
                    this.alreadyAddedHandler();
                }
            } else{
                this.sameBothSidesHandler();
            }
        }
    }

    async addIfThen() {
        let indexLeftThen = this.state.leftThen;
        let indexRightThen = this.state.rightThen;
        if (!(indexLeftThen === "Select a statement") && !(indexRightThen === "Select a statement")) {
                let combEncoded = this.state.combinationsInProcessEncoded;
                let newEncoded = "(" + combEncoded[indexLeftThen] + ")->(" + combEncoded[indexRightThen] + ")";
                if (combEncoded.indexOf(newEncoded) === -1 && combEncoded.indexOf("~(" + newEncoded + ")") === -1) {
                    combEncoded.push(newEncoded);
                    let comb = this.state.combinationsInProcess;
                    comb.push("true: IF (" + comb[indexLeftThen] + ") THEN (" + comb[indexRightThen] + ")");
                    let truthValue = this.state.combinationsTruthValues;
                    truthValue.push(true);

                    await this.setState({
                        combinationsInProcessEncoded: combEncoded,
                        combinationsInProcess: comb,
                        combinationsTruthValues: truthValue,
                        leftThen: "Select a statement",
                        rightThen: "Select a statement"
                    })
                } else {
                    this.alreadyAddedHandler();
                }
        }
    }

    async addKnowledge() {
        let agents = this.state.agent;
        let knowledge = this.state.knows;
        if(agents && agents.length && !(knowledge === "Select a statement")){
            let combEncoded = this.state.combinationsInProcessEncoded;
            let comb = this.state.combinationsInProcess;
            let allAgents = this.state.agents;

            let indexesAgents = [];
            agents.map((item) => indexesAgents.push(allAgents.indexOf(item) + 1));
            let indexAgent = "{ag" + indexesAgents.join(',ag') + "}";
            let newEncoded = "K" + indexAgent + "(" + combEncoded[knowledge] + ")";
            if (combEncoded.indexOf(newEncoded) === -1 && combEncoded.indexOf("~(" + newEncoded + ")") === -1) {
                combEncoded.push(newEncoded);
                if(agents.length > 1){
                    comb.push("true: agents(" + agents.join(',') + ") know that (" + comb[knowledge] + ")");
                } else {
                    comb.push("true: agent(" + agents.join(',') + ") knows that (" + comb[knowledge] + ")");
                }
                let truthValue = this.state.combinationsTruthValues;
                truthValue.push(true);

                await this.setState({
                    combinationsInProcessEncoded: combEncoded,
                    combinationsInProcess: comb,
                    combinationsTruthValues: truthValue,
                    knows: "Select a statement",
                    agent: ["agent(s)"]
                })
            } else {
                this.alreadyAddedHandler();
            }
        }
    }

    async addCommonKnowledge(){
        let knowledge = this.state.cknowledge;
        if(!(knowledge === "Select a statement")){
            let combEncoded = this.state.combinationsInProcessEncoded;
            let newEncoded = "K*(" + combEncoded[knowledge] + ")";
            if (combEncoded.indexOf(newEncoded) === -1) {
                combEncoded.push(newEncoded);
                let comb = this.state.combinationsInProcess;
                comb.push("true: It is common knowledge that " + comb[knowledge]);
                let truthValue = this.state.combinationsTruthValues;
                truthValue.push(true);

                await this.setState({
                    combinationsInProcessEncoded: combEncoded,
                    combinationsInProcess: comb,
                    combinationsTruthValues: truthValue,
                    cknowledge: "Select a statement"
                })
            } else {
                this.alreadyAddedHandler();
            }
        }
    }

    async addPossibleKnowledge(){
        let agents = this.state.agent2;
        let knowledge = this.state.pknowledge;
        if(agents && agents.length && !(knowledge === "Select a statement")){
            let combEncoded = this.state.combinationsInProcessEncoded;
            let comb = this.state.combinationsInProcess;
            let allAgents = this.state.agents;

            let indexesAgents = [];
            agents.map((item) => indexesAgents.push(allAgents.indexOf(item) + 1));
            let indexAgent = "{ag" + indexesAgents.join(',ag') + "}";
            let newEncoded = "M" + indexAgent + "(" + combEncoded[knowledge] + ")";
            if (combEncoded.indexOf(newEncoded) === -1) {
                combEncoded.push(newEncoded);
                if(agents.length > 1){
                    comb.push("true: for agents(" + agents.join(',') + ") it is possible that " + comb[knowledge]);
                } else {
                    comb.push("true: for agent(" + agents.join(',') + ") it is possible that " + comb[knowledge]);
                }
                let truthValue = this.state.combinationsTruthValues;
                truthValue.push(true);

                await this.setState({
                    combinationsInProcessEncoded: combEncoded,
                    combinationsInProcess: comb,
                    combinationsTruthValues: truthValue,
                    pknowledge: "Select a statement",
                    agent2: ["agent(s)"]
                })
            } else {
                this.alreadyAddedHandler();
            }
        }
    }

    addToFinished(index){
        let comb = this.state.combinationsInProcess;
        let combEncoded = this.state.combinationsInProcessEncoded;
        let finish = this.state.finished;
        let finishEncoded = this.state.finishedEncoded;

        if(finish.indexOf(comb[index]) === -1){
            finish.push(comb[index]);
            finishEncoded.push(combEncoded[index]);

            this.setState({
                finished: finish,
                finishedEncoded: finishEncoded
            })
        } else {
            this.alreadyAddedHandler();
        }
    }

    setQuestion(index){
        let comb = this.state.combinationsInProcess;
        let combEncoded = this.state.combinationsInProcessEncoded;
        let q = this.state.question;
        let qEncoded = this.state.questionEncoded;

        q.push(comb[index]);
        qEncoded = combEncoded[index];

        this.setState({
            question: q,
            questionEncoded: qEncoded,
            open5: false
        })
    }

    //REMOVE
    removeFromCombinations = (element, start, stop) => {
        let combinationsEncoded = this.state.combinationsInProcessEncoded;
        let combinations = this.state.combinationsInProcess;
        let truthValues = this.state.combinationsTruthValues;
        let indexes = new Set();
        let finishedCombinationsEncoded = this.state.finishedEncoded;
        let finishedCombinations = this.state.finished;
        let indexesFinished = new Set();

        for (let i = 0; i < combinationsEncoded.length; i++) {
            for (let j = start; j <= stop; j++) {
                if(combinationsEncoded[i].includes(element + start)){
                    indexes.add(i);
                }
            }
        }

        for (let i = 0; i < finishedCombinationsEncoded.length; i++) {
            for (let j = start; j <= stop; j++) {
                if(finishedCombinationsEncoded[i].includes(element + start)){
                    indexesFinished.add(i);
                }
            }
        }

        [].slice.call(indexes).sort();
        [].slice.call(indexesFinished).sort();

        for (let x = indexes.size -1; x >= 0; x--) {
            let elementToRemove = Array.from(indexes)[x];
            combinationsEncoded.splice(elementToRemove, 1);
            combinations.splice(elementToRemove, 1);
            truthValues.splice(elementToRemove, 1);
        }

        for (let x = indexesFinished.size -1; x >= 0; x--) {
            let elementToRemove = Array.from(indexesFinished)[x];
            finishedCombinationsEncoded.splice(elementToRemove, 1);
            finishedCombinations.splice(elementToRemove, 1);
        }

        this.setState({
            combinationsInProcessEncoded: combinationsEncoded,
            combinationsInProcess: combinations,
            combinationsTruthValues: truthValues,
            finishedEncoded: finishedCombinationsEncoded,
            finished: finishedCombinations
        })

        //testing
        console.log(this.state.combinationsTruthValues)
    }

    removeFromCombinationsInProcess = (index) => {
        let combEncoded = this.state.combinationsInProcessEncoded;
        let comb = this.state.combinationsInProcess;
        let truthValues = this.state.combinationsTruthValues;
        combEncoded.splice(index, 1);
        comb.splice(index, 1);
        truthValues.splice(index, 1);
        this.setState({
            combinationsInProcessEncoded: combEncoded,
            combinationsInProcess: comb,
            open2: false
        })
    }

    removeFromFinished = (index) => {
        let finishEncoded = this.state.finishedEncoded;
        let finish = this.state.finished;
        finishEncoded.splice(index, 1);
        finish.splice(index, 1);
        this.setState({
            finishedEncoded: finishEncoded,
            finished: finish,
            open3: false
        })
    }

    removeQuestion(){
        this.setState({
            question: [],
            questionEncoded: ''
        })
    }

    //UPDATE
    updateAffairsInCombinations = (nameBefore, nameAfter) => {
        let combinations = this.state.combinationsInProcess;
        let combinationsFinished = this.state.finished;

        for (let i = 0; i < combinations.length; i++) {
            while(combinations[i].includes('affair(' + nameBefore + ")")){
                let newString = combinations[i].replace("affair(" + nameBefore + ")", "affair(" + nameAfter + ")");
                combinations[i] = newString;
            }
        }

        for (let i = 0; i < combinationsFinished.length; i++) {
            while(combinationsFinished[i].includes('affair(' + nameBefore + ")")){
                let newString = combinationsFinished[i].replace("affair(" + nameBefore + ")", "affair(" + nameAfter + ")");
                combinationsFinished[i] = newString;
            }
        }

        this.setState({
            combinationsInProcess: combinations,
            finished: combinationsFinished
        })
    }

    updateAgentsInCombinations = (nameBefore, nameAfter) => {
        let combinations = this.state.combinationsInProcess;
        let combinationsFinished = this.state.finished;

        for (let i = 0; i < combinations.length; i++) {
            while(combinations[i].includes('agent(' + nameBefore + ")")){
                let newString = combinations[i].replace("agent(" + nameBefore + ")", "agent(" + nameAfter + ")");
                combinations[i] = newString;
            }

            if(combinations[i].includes('agents(')){
                let comb = combinations[i];
                let toUpdate = substringBetween(comb, "agents(", ")");
                while(!(toUpdate === null || toUpdate === '')){
                    if(toUpdate.includes(nameBefore)){
                        let newSub = toUpdate.replace(nameBefore, nameAfter);
                        let newString2 = combinations[i].replace("agents(" + toUpdate + ")", "agents(" + newSub + ")");
                        combinations[i] = newString2;
                    }
                    let newComb = comb.replace("agents(" + toUpdate + ")", "");
                    comb = newComb;
                    toUpdate = substringBetween(comb, "agents(", ")");
                }
            }
        }

        for (let i = 0; i < combinationsFinished.length; i++) {
            while(combinationsFinished[i].includes('agent(' + nameBefore + ")")){
                let newString = combinationsFinished[i].replace("agent(" + nameBefore + ")", "agent(" + nameAfter + ")");
                combinationsFinished[i] = newString;
            }

            if(combinationsFinished[i].includes('agents(')){
                let comb = combinationsFinished[i];
                let toUpdate = substringBetween(comb, "agents(", ")");
                while(!(toUpdate === null || toUpdate === '')){
                    if(toUpdate.includes(nameBefore)){
                        let newSub = toUpdate.replace(nameBefore, nameAfter);
                        let newString2 = combinationsFinished[i].replace("agents(" + toUpdate + ")", "agents(" + newSub + ")");
                        combinationsFinished[i] = newString2;
                    }
                    let newComb = comb.replace("agents(" + toUpdate + ")", "");
                    comb = newComb;
                    toUpdate = substringBetween(comb, "agents(", ")");
                }
            }
        }

        this.setState({
            combinationsInProcess: combinations,
            finished: combinationsFinished
        })

        let agentIndex = this.state.agent.indexOf(nameBefore);

        if (agentIndex !== -1) {
            let tempAgent = this.state.agent;
            tempAgent[agentIndex] = nameAfter;
            this.setState({
                agent: tempAgent
            })
        }

        let agentIndex2 = this.state.agent2.indexOf(nameBefore);

        if (agentIndex2 !== -1) {
            let tempAgent = this.state.agent2;
            tempAgent[agentIndex2] = nameAfter;
            this.setState({
                agent2: tempAgent
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className='rowC'>
                <KeyInfo info={"agent"} elementsCallback={this.callbackAgents}/>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <KeyInfo info={"affair"} elementsCallback={this.callbackAffairs}/>
                </div>
                <br/>
                <Typography variant="h6" gutterBottom>
                    Templates to use:
                </Typography>
                <br/>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left"> <div className='rowC'>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Select
                                        value={this.state.affair}
                                        onChange={e => this.handleAffairChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select an affair" disabled>Select an affair</option>
                                        {this.state.affairs.map((item, index) => (
                                            <option value={index+1} >{item}</option>))}
                                    </Select>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <AddCircleRoundedIcon
                                        fontSize="large"
                                        color="primary"
                                        onClick={this.addAffair}
                                    ></AddCircleRoundedIcon>
                                </div></TableCell>
                                <TableCell align="left"><div className='rowC'>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <input readOnly value="FOR" className={classes.templateTexts} style={{ width: "50px"}}/>
                                    <Select
                                        multiple
                                        value={this.state.agent2}
                                        onChange={e => this.handleAgentsKnowledgeChange(2, e.target.value)}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        className={classes.select}
                                    >
                                        {this.state.agents.map((item, index) => (
                                            <MenuItem key={item} value={item}>
                                                <Checkbox checked={this.state.agent2.indexOf(item) > -1} />
                                                <ListItemText primary={item} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <input readOnly value="IT IS POSSIBLE THAT" className={classes.templateTexts} style={{ width: "150px"}}/>
                                    <Select
                                        value={this.state.pknowledge}
                                        onChange={e => this.handlePKnowledgeChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)} >{item}</option>))}
                                    </Select>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <AddCircleRoundedIcon
                                        fontSize="large"
                                        color="primary"
                                        onClick={this.addPossibleKnowledge}
                                    ></AddCircleRoundedIcon>
                                </div></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><div className='rowC'>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Select
                                        value={this.state.leftAnd}
                                        onChange={e => this.handleLeftAndChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                                    </Select>
                                    <input readOnly value="AND" className={classes.templateTexts} style={{ width: "50px"}}/>
                                    <Select
                                        value={this.state.rightAnd}
                                        onChange={e => this.handleRightAndChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                                    </Select>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <AddCircleRoundedIcon
                                        fontSize="large"
                                        color="primary"
                                        onClick={this.addAnd}
                                    ></AddCircleRoundedIcon>
                                </div></TableCell>
                                <TableCell align="left"><div className='rowC'>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Select
                                        multiple
                                        value={this.state.agent}
                                        onChange={e => this.handleAgentsKnowledgeChange(1, e.target.value)}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        className={classes.select}
                                    >
                                        {this.state.agents.map((item, index) => (
                                            <MenuItem key={item} value={item}>
                                                <Checkbox checked={this.state.agent.indexOf(item) > -1} />
                                                <ListItemText primary={item} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <input readOnly value="KNOW(S)" className={classes.templateTexts} style={{ width: "70px"}}/>
                                    <Select
                                        value={this.state.knows}
                                        onChange={e => this.handleKnowsChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                                    </Select>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <AddCircleRoundedIcon
                                        fontSize="large"
                                        color="primary"
                                        onClick={this.addKnowledge}
                                    ></AddCircleRoundedIcon>
                                </div></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><div className='rowC'>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Select
                                        value={this.state.leftOr}
                                        onChange={e => this.handleLeftOrChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                                    </Select>
                                    <input readOnly value="OR" className={classes.templateTexts} style={{ width: "50px"}}/>
                                    <Select
                                        value={this.state.rightOr}
                                        onChange={e => this.handleRightOrChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                                    </Select>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <AddCircleRoundedIcon
                                        fontSize="large"
                                        color="primary"
                                        onClick={this.addOr}
                                    ></AddCircleRoundedIcon>
                                </div></TableCell>
                                <TableCell align="left"><div className='rowC'>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <input readOnly value="IT IS COMMON KNOWLEDGE THAT" className={classes.templateTexts} style={{ width: "240px"}}/>
                                    <Select
                                        value={this.state.cknowledge}
                                        onChange={e => this.handleCKnowledgeChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                                    </Select>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <AddCircleRoundedIcon
                                        fontSize="large"
                                        color="primary"
                                        onClick={this.addCommonKnowledge}
                                    ></AddCircleRoundedIcon>
                                </div></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><div className='rowC'>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <input readOnly value="IF" className={classes.templateTexts} style={{ width: "50px"}}/>
                                    <Select
                                        value={this.state.leftThen}
                                        onChange={e => this.handleLeftThenChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                                    </Select>
                                    <input readOnly value="THEN" className={classes.templateTexts} style={{ width: "50px"}}/>
                                    <Select
                                        value={this.state.rightThen}
                                        onChange={e => this.handleRightThenChange(e.target.value)}
                                        className={classes.select}
                                    >
                                        <option value="Select a statement" disabled>Select a statement</option>
                                        {this.state.combinationsInProcess.filter(name => !name.includes('common knowledge')).map((item, index) => (
                                            <option value={index} className={(this.state.combinationsTruthValues[this.state.combinationsInProcess.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                                    </Select>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <AddCircleRoundedIcon
                                        fontSize="large"
                                        color="primary"
                                        onClick={this.addIfThen}
                                    ></AddCircleRoundedIcon>
                                </div></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <Snackbar open={this.state.alreadyAdded} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="warning">
                        You already added this one!
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.sameBothSides} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="warning">
                        You need to select different combinations on the different sides!
                    </Alert>
                </Snackbar>
                <div className='rowC'>
                    <Table className="float-left" style={{ width: "45vw", border: "3px solid rgb(0, 0, 0)"}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cellFontSize}>Statements in progress</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                    {this.state.combinationsInProcess.map((item, index) => (
                        <TableRow>
                            <TableCell className={classes.cellFontSize} align="left">
                                <div className='rowC'>
                                    <span className={(this.state.combinationsTruthValues[index] ? null : classes.redText)}>{index + 1}. {item}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    {(this.state.combinationsInProcess[index].includes("It is common knowledge that ") ||
                                        this.state.combinationsInProcess[index].includes(" it is possible that "))
                                        ? null : <Typography component="div">
                                <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>False</Grid>
                                    <Grid item>
                                        <AntSwitch checked={this.state.combinationsTruthValues[index]} onChange={e => this.handleChange(e.target.checked, index)} name="checkedC" />
                                    </Grid>
                                    <Grid item>True</Grid>
                                </Grid>
                            </Typography>}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><AssignmentTurnedInTwoToneIcon
                                fontSize="large"
                                color="primary"
                                aria-owns={this.state.open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
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
                                    <Typography>Click if statement is ready for submission.</Typography>
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
                                    <Typography>Click if you want to remove this statement.</Typography>
                                </Popover>
                                    <span>&nbsp;&nbsp;&nbsp;</span><HelpIcon
                                        fontSize="large"
                                        color="primary"
                                        className= {(this.state.question && this.state.question.length) ? classes.hidden : null}
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
                                        <Typography>Click if this is the statement which validity you want to check.</Typography>
                                    </Popover>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                        </TableBody>
                    </Table>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <div className="float-right">
                    <Table style={{ width: "45vw", border: "3px solid rgb(0, 0, 0)"}} aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell className={classes.cellFontSize}>Submitted statements</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.finished.map((item, index) => (
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
                                            <Typography>Click if you want to remove this statement.</Typography>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Table className="float-right" style={{ width: "45vw", border: "3px solid rgb(0, 0, 0)"}} aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell className={classes.cellFontSize}>Your question:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.question.map((item) => (
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
                                            <Typography>Click if you want to remove this question.</Typography>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PuzzleBuilder);