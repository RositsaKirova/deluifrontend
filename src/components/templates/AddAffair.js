import React from "react";
import styles from "../stylesComponents";
import {bindActionCreators} from "redux";
import {addStatement, changeAffair} from "../../actions";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addStatement: statement => addStatement(statement),
        changeAffair: affair => changeAffair(affair)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        affairs: state.affairs,
        statements: state.statements,
        encoded: state.encoded,
        truthValues: state.truthValues,
        affair: state.affair
    }
}

class AddAffair extends React.Component {
    constructor(props) {
        super(props);
        this.addAffair = this.addAffair.bind(this);
    }

    handleAffairChange = (event) => {
        this.props.changeAffair(event);
    };

    addAffair() {
        if (!(this.props.affair === "Select a state")) {
            let newAffairEncoded = 'a' + this.props.affair;
            let cE = "true: state(" + this.props.affairs[this.props.affair - 1] + ")";
            let cE2 = "false: state(" + this.props.affairs[this.props.affair - 1] + ")";
            if (this.props.statements.indexOf(cE) === -1 && this.props.statements.indexOf(cE2) === -1) {
                this.props.addStatement([cE, newAffairEncoded]);
                this.props.changeAffair("Select a state");
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
                    value={this.props.affair}
                    onChange={e => this.handleAffairChange(e.target.value)}
                    className={classes.select}
                >
                    <option value="Select a state" disabled>Select a state</option>
                    {this.props.affairs.map((item, index) => (
                        <option value={index + 1}>{item}</option>))}
                </Select>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <AddCircleRoundedIcon
                    fontSize="large"
                    color="primary"
                    onClick={this.addAffair}
                ></AddCircleRoundedIcon>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddAffair));