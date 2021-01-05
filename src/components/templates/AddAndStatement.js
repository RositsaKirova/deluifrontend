import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import React from "react";
import styles from "../stylesComponents";
import {bindActionCreators} from "redux";
import {addStatement, changeLeftAnd, changeRightAnd} from "../../actions";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addStatement: statement => addStatement(statement),
        changeLeftAnd: statement => changeLeftAnd(statement),
        changeRightAnd: statement => changeRightAnd(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        leftAnd: state.leftAnd,
        rightAnd: state.rightAnd
    }
}

class AddAndStatement extends React.Component {
    constructor(props) {
        super(props);
        this.addAnd = this.addAnd.bind(this);
    }

    handleLeftAndChange = (event) => {
        this.props.changeLeftAnd(event);
    };

    handleRightAndChange = (event) => {
        this.props.changeRightAnd(event);
    };

    addAnd() {
        if (!(this.props.leftAnd === "Select a statement") && !(this.props.rightAnd === "Select a statement")) {
            if(!(this.props.leftAnd  === this.props.rightAnd)) {
                let combEncoded = this.props.encoded;
                let newAndEncoded = "(" + combEncoded[this.props.leftAnd] + ")&(" + combEncoded[this.props.rightAnd] + ")";
                let newAndEncodedReversed = "(" + combEncoded[this.props.rightAnd] + ")&(" + combEncoded[this.props.leftAnd] + ")";
                if (combEncoded.indexOf(newAndEncoded) === -1 && combEncoded.indexOf(newAndEncodedReversed) === -1 &&
                    combEncoded.indexOf("~(" + newAndEncoded + ")") === -1 && combEncoded.indexOf("~(" + newAndEncodedReversed + ")") === -1) {
                    let cE = "true: (" + this.props.statements[this.props.leftAnd] + ") AND (" + this.props.statements[this.props.rightAnd] + ")";
                    this.props.addStatement([cE, newAndEncoded]);
                    this.props.changeLeftAnd("Select a statement");
                    this.props.changeRightAnd("Select a statement");
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
                    value={this.props.leftAnd}
                    onChange={e => this.handleLeftAndChange(e.target.value)}
                    className={classes.select}
                >
                    <option value="Select a statement" disabled>Select a statement</option>
                    {this.props.statements.filter(name => !name.includes('common knowledge')).map((item, index) => (
                        <option value={index} className={(this.props.truthValues[this.props.statements.indexOf(item)] ?
                            null : classes.redText)}>{item}</option>))}
                </Select>
                <input readOnly value="AND" className={classes.templateTexts} style={{ width: "50px"}}/>
                <Select
                    value={this.props.rightAnd}
                    onChange={e => this.handleRightAndChange(e.target.value)}
                    className={classes.select}
                >
                    <option value="Select a statement" disabled>Select a statement</option>
                    {this.props.statements.filter(name => !name.includes('common knowledge')).map((item, index) => (
                        <option value={index} className={(this.props.truthValues[this.props.statements.indexOf(item)] ?
                            null : classes.redText)}>{item}</option>))}
                </Select>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <AddCircleRoundedIcon
                    fontSize="large"
                    color="primary"
                    onClick={this.addAnd}
                ></AddCircleRoundedIcon>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddAndStatement));