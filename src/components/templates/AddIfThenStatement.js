import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import React from "react";
import styles from "../stylesComponents";
import {bindActionCreators} from "redux";
import {addStatement, changeLeftThen, changeRightThen} from "../../actions";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addStatement: statement => addStatement(statement),
        changeLeftThen: statement => changeLeftThen(statement),
        changeRightThen: statement => changeRightThen(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        leftThen: state.leftThen,
        rightThen: state.rightThen
    }
}

class AddIfThenStatement extends React.Component {
    constructor(props) {
        super(props);
        this.addIfThen = this.addIfThen.bind(this);
    }

    handleLeftThenChange = (event) => {
        this.props.changeLeftThen(event);
    };

    handleRightThenChange = (event) => {
        this.props.changeRightThen(event);
    };

    addIfThen() {
        if (!(this.props.leftThen === "Select a statement") && !(this.props.rightThen === "Select a statement")) {
            if(!(this.props.leftThen === this.props.rightThen)) {
                let combEncoded = this.props.encoded;
                let newEncoded = "(" + combEncoded[this.props.leftThen] + ")->(" + combEncoded[this.props.rightThen] + ")";
                if (combEncoded.indexOf(newEncoded) === -1 && combEncoded.indexOf("~(" + newEncoded + ")") === -1) {
                    let cE = "true: IF (" + this.props.statements[this.props.leftThen] + ") THEN (" + this.props.statements[this.props.rightThen] + ")";
                    this.props.addStatement([cE, newEncoded]);
                    this.props.changeLeftThen("Select a statement");
                    this.props.changeRightThen("Select a statement");
                } else {
                    this.props.setAlreadyAddedHandler();
                }
            } else {
                this.props.setsameBothSidesHandler();
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className='rowC'>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <input readOnly value="IF" className={classes.templateTexts} style={{ width: "50px"}}/>
                <Select
                    value={this.props.leftThen}
                    onChange={e => this.handleLeftThenChange(e.target.value)}
                    className={classes.select}
                >
                    <option value="Select a statement" disabled>Select a statement</option>
                    {this.props.statements.filter(name => !name.includes('common knowledge')).map((item, index) => (
                        <option value={index} className={(this.props.truthValues[this.props.statements.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                </Select>
                <input readOnly value="THEN" className={classes.templateTexts} style={{ width: "50px"}}/>
                <Select
                    value={this.props.rightThen}
                    onChange={e => this.handleRightThenChange(e.target.value)}
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
                    onClick={this.addIfThen}
                ></AddCircleRoundedIcon>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddIfThenStatement));