import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import React from "react";
import styles from "../stylesComponents";
import {bindActionCreators} from "redux";
import {addStatement, changeLeftOr, changeRightOr} from "../../actions";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addStatement: statement => addStatement(statement),
        changeLeftOr: statement => changeLeftOr(statement),
        changeRightOr: statement => changeRightOr(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        leftOr: state.leftOr,
        rightOr: state.rightOr
    }
}

class AddOrStatement extends React.Component {
    constructor(props) {
        super(props);
        this.addOr = this.addOr.bind(this);
    }

    handleLeftOrChange = (event) => {
        this.props.changeLeftOr(event);
    };

    handleRightOrChange = (event) => {
        this.props.changeRightOr(event);
    };

    addOr() {
        if (!(this.props.leftOr === "Select a statement") && !(this.props.rightOr === "Select a statement")) {
            if(!(this.props.leftOr === this.props.rightOr)) {
                let combEncoded = this.props.encoded;
                let newEncoded = "(" + combEncoded[this.props.leftOr] + ")|(" + combEncoded[this.props.rightOr] + ")";
                let newEncodedReversed = "(" + combEncoded[this.props.rightOr] + ")|(" + combEncoded[this.props.leftOr] + ")";
                if (combEncoded.indexOf(newEncoded) === -1 && combEncoded.indexOf(newEncodedReversed) === -1 &&
                    combEncoded.indexOf("~(" + newEncoded + ")") === -1 && combEncoded.indexOf("~(" + newEncodedReversed + ")") === -1) {
                    let cE = "true: (" + this.props.statements[this.props.leftOr] + ") OR (" + this.props.statements[this.props.rightOr] + ")";
                    this.props.addStatement([cE, newEncoded]);
                    this.props.changeLeftOr("Select a statement");
                    this.props.changeRightOr("Select a statement");
                } else {
                    this.props.setAlreadyAddedHandler();
                }
            } else{
                this.props.setsameBothSidesHandler();
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className='rowC'>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <Select
                    value={this.props.leftOr}
                    onChange={e => this.handleLeftOrChange(e.target.value)}
                    className={classes.select}
                >
                    <option value="Select a statement" disabled>Select a statement</option>
                    {this.props.statements.filter(name => !name.includes('common knowledge')).map((item, index) => (
                        <option value={index} className={(this.props.truthValues[this.props.statements.indexOf(item)] ? null : classes.redText)}>{item}</option>))}
                </Select>
                <input readOnly value="OR" className={classes.templateTexts} style={{ width: "50px"}}/>
                <Select
                    value={this.props.rightOr}
                    onChange={e => this.handleRightOrChange(e.target.value)}
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
                    onClick={this.addOr}
                ></AddCircleRoundedIcon>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddOrStatement));