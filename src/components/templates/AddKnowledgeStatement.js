import React from "react";
import styles from "../stylesComponents";
import {bindActionCreators} from "redux";
import {addStatement, changeAgentsWithKnowledge, changeKnowledge} from "../../actions";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import manipulateString from "../manipulateString";

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
        changeAgentsWithKnowledge: statement => changeAgentsWithKnowledge(statement),
        changeKnowledge: statement => changeKnowledge(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        agents: state.agents,
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        agent: state.agent,
        knows: state.knows
    }
}

class AddKnowledgeStatement extends React.Component {
    constructor(props) {
        super(props);
        this.addKnowledge = this.addKnowledge.bind(this);
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
        this.props.changeAgentsWithKnowledge(event);
    };

    handleKnowsChange = (event) => {
        this.props.changeKnowledge(event);
    };

    addKnowledge() {
        let agents = this.props.agent;
        if(agents && agents.length && !(this.props.knows === "Select a statement")){let indexesAgents = [];
            agents.map((item) => indexesAgents.push(this.props.agents.indexOf(item) + 1));
            let indexAgent = "{ag" + indexesAgents.join(",ag") + "}";
            let newEncoded = "K" + indexAgent.toString() + "(" + this.props.encoded[this.props.knows] + ")";
            if (this.props.encoded.indexOf(newEncoded) === -1 && this.props.encoded.indexOf("~(" + newEncoded + ")") === -1) {
                let cE;
                if(agents.length > 1){
                    cE = "agents(" + agents.join(',') + "~) know " + this.props.statements[this.props.knows];
                } else {
                    cE = "agent(" + agents[0] + "~) knows " + this.props.statements[this.props.knows];
                }
                this.props.addStatement([cE, newEncoded]);
                this.props.changeAgentsWithKnowledge(["agent(s)"]);
                this.props.changeKnowledge("Select a statement");
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
                <Select
                    multiple
                    value={this.props.agent}
                    onChange={e => this.handleAgentsKnowledgeChange(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    className={classes.select}
                >
                    {this.props.agents.map((item, index) => (
                        <MenuItem key={item} value={item}>
                            <Checkbox checked={this.props.agent.indexOf(item) > -1} />
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                </Select>
                <input readOnly value="KNOW(S)" className={classes.templateTexts} style={{ width: "80px"}}/>
                <Select
                    value={this.props.knows}
                    onChange={e => this.handleKnowsChange(e.target.value)}
                    className={classes.select}
                >
                    <option value="Select a statement" disabled>Select a statement</option>
                    {this.props.statements.map((item, index) => (
                        <option value={index} className={(this.props.truthValues[index] ? null : classes.redText)}>{manipulateString(item)}</option>))}
                </Select>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <AddCircleRoundedIcon
                    fontSize="large"
                    color="primary"
                    onClick={this.addKnowledge}
                ></AddCircleRoundedIcon>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddKnowledgeStatement));