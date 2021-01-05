import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import React from "react";
import styles from "../stylesComponents";
import {bindActionCreators} from "redux";
import {addStatement, changeCommonKnowledge} from "../../actions";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addStatement: statement => addStatement(statement),
        changeCommonKnowledge: statement => changeCommonKnowledge(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        cknowledge: state.cknowledge
    }
}

class AddCommonKnowledgeStatement extends React.Component {
    constructor(props) {
        super(props);
        this.addCommonKnowledge = this.addCommonKnowledge.bind(this);
    }

    handleCKnowledgeChange = (event) => {
        this.props.changeCommonKnowledge(event);
    };

    addCommonKnowledge(){
        if(!(this.props.cknowledge === "Select a statement")){
            let newEncoded = "K*(" + this.props.encoded[this.props.cknowledge] + ")";
            if (this.props.encoded.indexOf(newEncoded) === -1) {
                let cE = "true: It is common knowledge that " + this.props.statements[this.props.cknowledge];
                this.props.addStatement([cE, newEncoded]);
                this.props.changeCommonKnowledge("Select a statement");
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
                <input readOnly value="IT IS COMMON KNOWLEDGE THAT" className={classes.templateTexts} style={{ width: "240px"}}/>
                <Select
                    value={this.props.cknowledge}
                    onChange={e => this.handleCKnowledgeChange(e.target.value)}
                    className={classes.select}
                >
                    <option value="Select a statement" disabled>Select a statement</option>
                    {this.props.statements.filter(name => !name.includes('common knowledge')).map((item, index) => (
                        <option value={index} className={(this.props.truthValues[this.props.statements.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                </Select>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <AddCircleRoundedIcon
                    fontSize="large"
                    color="primary"
                    onClick={this.addCommonKnowledge}
                ></AddCircleRoundedIcon>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCommonKnowledgeStatement));