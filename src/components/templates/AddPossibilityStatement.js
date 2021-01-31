import React from "react";
import styles from "../stylesComponents";
import {bindActionCreators} from "redux";
import {addStatement, changeAgentsWithPossibleKnowledge, changePossibleKnowledge} from "../../actions";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addStatement: statement => addStatement(statement),
        changeAgentsWithPossibleKnowledge: statement => changeAgentsWithPossibleKnowledge(statement),
        changePossibleKnowledge: statement => changePossibleKnowledge(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        agents: state.agents,
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        agent2: state.agent2,
        pknowledge: state.pknowledge
    }
}

class AddPossibilityStatement extends React.Component {
    constructor(props) {
        super(props);
        this.addPossibleKnowledge = this.addPossibleKnowledge.bind(this);
    }

    handleAgentsKnowledgeChange = (event) => {
        if(!(event && event.length)){
            event = ["agent(s)"]
        }
        if(event.length > 1){
            if(event[0] === "agent(s)") {
                event = event.slice(1);
            }
        }
        this.props.changeAgentsWithPossibleKnowledge(event);
    };

    handlePKnowledgeChange = (event) => {
        this.props.changePossibleKnowledge(event);
    };

    addPossibleKnowledge(){
        let agents = this.props.agent2;
        if(agents && agents.length && !(this.props.pknowledge === "Select a statement")){
            let indexesAgents = [];
            agents.map((item) => indexesAgents.push(this.props.agents.indexOf(item) + 1));
            let indexAgent = "{ag" + indexesAgents.join(',ag') + "}";
            let newEncoded = "M" + indexAgent + "(" + this.props.encoded[this.props.pknowledge] + ")";
            if (this.props.encoded.indexOf(newEncoded) === -1) {
                let cE;
                if(agents.length > 1){
                    cE = "true: for agents(" + agents.join(',') + ") it is possible that " + this.props.statements[this.props.pknowledge];
                } else {
                    cE = "true: for agent(" + agents.join(',') + ") it is possible that " + this.props.statements[this.props.pknowledge];
                }
                this.props.addStatement([cE, newEncoded]);
                this.props.changeAgentsWithPossibleKnowledge(["agent(s)"]);
                this.props.changePossibleKnowledge("Select a statement");
            } else {
                this.props.setAlreadyAddedHandler();
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className='rowC'>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <input readOnly value="FOR" className={classes.templateTexts} style={{ width: "50px"}}/>
                <Select
                    multiple
                    value={this.props.agent2}
                    onChange={e => this.handleAgentsKnowledgeChange(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    className={classes.select}
                >
                    {this.props.agents.map((item, index) => (
                        <MenuItem key={item} value={item}>
                            <Checkbox checked={this.props.agent2.indexOf(item) > -1} />
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                </Select>
                <input readOnly value="IT IS POSSIBLE THAT" className={classes.templateTexts} style={{ width: "150px"}}/>
                <Select
                    value={this.props.pknowledge}
                    onChange={e => this.handlePKnowledgeChange(e.target.value)}
                    className={classes.select}
                >
                    <option value="Select a statement" disabled>Select a statement</option>
                    {this.props.statements.map((item, index) => (
                        <option value={index} className={(this.props.truthValues[index] ? null : classes.redText)} >{item}</option>))}
                </Select>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <AddCircleRoundedIcon
                    fontSize="large"
                    color="primary"
                    onClick={this.addPossibleKnowledge}
                ></AddCircleRoundedIcon>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddPossibilityStatement));