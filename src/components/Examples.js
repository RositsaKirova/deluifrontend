import React from 'react';
import {bindActionCreators} from "redux";
import {changeExample} from "../actions";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Pizza from "./examples/Pizza";
import MuddyChildren from "./examples/MuddyChildren";
import ThreeHats from "./examples/ThreeHats";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeExample: statement => changeExample(statement)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {example: state.example}
}

class Examples extends React.Component {

    changeExample(index){
        this.props.changeExample(index);
    }

    render() {
        return (
            <div>
                <Typography variant="h5" color="secondary" gutterBottom>Terminology</Typography>
                <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Agent</span> is an object which observes the
                    situation it is placed in from a certain angle and in a certain way depending on its beliefs and knowledge for the situation.</Typography>
                <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Knowledge</span> is information known for sure because it is justified.
                    Justification for knowing something can be that you saw it or that someone told you about it.</Typography>
                <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Belief</span> is something you suppose but don't know for sure.</Typography>
                <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>State</span> is a possible fact in the situation - what the situation may be.
                    When it is defined to be true or false, it becomes a <span style={{fontWeight: 600}}>statement</span>.</Typography>
                <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Statements</span> express how the situation is.</Typography>
                <Typography variant="body1" gutterBottom>An agent <span style={{fontWeight: 600}}>knows a statement</span> when this knowledge is justified.</Typography>
                <Typography variant="body1" gutterBottom>A statement <span style={{fontWeight: 600}}>is common knowledge</span>
                    when every agent knows that every agent knows that every agent knows, and so on, the statement.</Typography>
                <Typography variant="body1" gutterBottom>An agent <span style={{fontWeight: 600}}>supposes a statement</span> when this statement is possible to be true for them.
                    Often this happens due to the lack of justification for the statement being false. In other words, when an agent
                    doesn't know that a statement is false, it is okay to suppose the statement is true.</Typography>
                <br/>
                <Typography variant="h5" color="secondary" gutterBottom>Examples</Typography>
                <div className='rowC'>
                    <Button variant="contained" color="primary" onClick={() => this.changeExample(1)}>Dreaming of pizza</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Button variant="contained" color="primary" onClick={() => this.changeExample(2)}>Muddy Children</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Button variant="contained" color="primary" onClick={() => this.changeExample(3)}>Three-Hat Puzzle</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
                <br/>
                {this.props.example === 1 ? <Pizza /> : null}
                {this.props.example === 2 ? <MuddyChildren /> : null}
                {this.props.example === 3 ? <ThreeHats /> : null}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examples);