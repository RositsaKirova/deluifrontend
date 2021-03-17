import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { removeElements, removeElement, addElements, renameElements } from "../actions/index";
import '../App.css';
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {Button} from "@material-ui/core";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeElements: elements => removeElements(elements),
        removeElement: element => removeElement(element),
        addElements: elements => addElements(elements),
        renameElements: element => renameElements(element)
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        agents: state.agents,
        affairs:state.affairs
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function removePreZero(number) {
    if(number === 0){
        return 0;
    } else{
        return number.toString().replace(/^0+/, '');
    }
}

class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rename: false,
            remove: false,
            elements: [],
            buttonName: 'Rename ' + this.props.info + 's',
            buttonName2: 'Remove',
            duplicateMessage: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.timer = null;
    }

    numberHandler = (number) => {
        if (number < 0) {
            number = 0;
        }
        if (number > 100) {
            number = 100;
        }

        let elements;
        if (this.props.info === "agent") {
            elements = this.props.agents;
        } else {
            elements = this.props.affairs;
        }
        if (number < elements.length) {
            this.props.removeElements([this.props.info, number]);
        } else {
            this.props.addElements([this.props.info, number]);
        }
    }

    namesHandler(elementNumber, name) {
        this.setState({
            duplicateMessage: false
        });
        if (name) {
            if (this.props.agents.some(item => name === item) || this.props.affairs.some(item => name === item)) {
                this.setState({
                    duplicateMessage: true
                });
            } else {
                this.props.renameElements([this.props.info, elementNumber, name]);
            }
        }
    }

    removeElement = (elementIndex) => {
        this.props.removeElement([this.props.info, elementIndex]);
    }

    allowORfinishRename() {
        if (this.state.rename) {
            this.setState({
                rename: false,
                buttonName: 'Rename ' + this.props.info + 's'
            });
        } else {
            this.setState({
                remove: false,
                buttonName2: 'Remove',
                rename: true,
                buttonName: 'Ready renaming'
            });
        }
    }

    allowORfinishRemove() {
        if (this.state.remove) {
            this.setState({
                remove: false,
                buttonName2: 'Remove'
            });
        } else {
            this.setState({
                rename: false,
                buttonName: 'Rename ' + this.props.info + 's',
                remove: true,
                buttonName2: 'Ready removing'
            });
        }
    }

    handleClose() {
        this.setState({
            duplicateMessage: false
        })
    }

    render() {
        let elements;
        if (this.props.info === "agent") {
            elements = this.props.agents;
        } else {
            elements = this.props.affairs;
        }
        return (
            <div>
                <div className='rowC'>
                    <Typography variant="body1" gutterBottom>
                        How many {this.props.info}s are involved?<span>&nbsp;&nbsp;&nbsp;</span>
                    </Typography>
                    <input
                        type='number'
                        value={removePreZero(elements.length)}
                        min={0}
                        max={100}
                        onChange={e => this.numberHandler(e.target.value)}
                    />
                </div>
                <br/>
                <Typography variant="body1" gutterBottom>
                    {elements.length} {this.props.info}(s) <Button size="small" variant="contained" color="primary"
                                                                   onClick={() => this.allowORfinishRename()}>{this.state.buttonName}</Button>
                    <span>&nbsp;&nbsp;</span><Button size="small" variant="contained" color="primary"
                                                     onClick={() => this.allowORfinishRemove()}>{this.state.buttonName2}</Button>
                </Typography>
                {this.state.rename && <ul>
                    {elements.map((item, index) => (
                        <li key={item}>{this.props.info} "{item}" -> Rename it :
                            <input
                                type='text'
                                placeholder="Press enter to rename"
                                maxLength={30}
                                onKeyPress={(e) =>
                                    (e.key === 'Enter' ? this.namesHandler(index, e.target.value) : null)}
                            />
                        </li>
                    ))}
                </ul>}
                {this.state.remove && <ul>
                    {elements.map((item, index) => (
                        <li key={item}>{this.props.info} "{item}" <Button size="small" color={"primary"}
                            onClick={() => this.removeElement(index)}>Remove</Button>
                        </li>
                    ))}
                </ul>}
                <Snackbar open={this.state.duplicateMessage} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        No duplicates of names are allowed!
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyInfo);