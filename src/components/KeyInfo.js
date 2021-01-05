import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { removeElements, addElements, renameElements } from "../actions/index";
import '../App.css';
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const WAIT_INTERVAL = 3000;

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeElements: elements => removeElements(elements),
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

class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rename: false,
            elements: [],
            buttonName: 'Rename ' + this.props.info + 's',
            duplicateMessage: false,
            numberMessage: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.timer = null;
    }

    numberHandler = (number) => {
        if(number < 0){
            number = 0;
        }
        if(number > 100){
            number = 100;
        }

        let elements;
        if(this.props.info === "agent"){
            elements = this.props.agents;
        } else{
            elements = this.props.affairs;
        }
        if(number < elements.length){
            this.props.removeElements([this.props.info, number]);
        } else {
            this.props.addElements([this.props.info, number]);
        }
    }

    namesHandler(flag, elementNumber, name) {
        clearTimeout(this.timer);
        this.setState({
            numberMessage: false,
            duplicateMessage: false
        });
        if (name) {
            let elements;
            if (this.props.info === "agent") {
                elements = this.props.agents;
            } else {
                elements = this.props.affairs;
            }
            if (elements.some(item => name === item)) {
                this.setState({
                    numberMessage: false,
                    duplicateMessage: true
                });
            } else if (!isNaN(name)) {
                this.setState({
                    duplicateMessage: false,
                    numberMessage: true
                });
            } else {
                console.log(flag);
                if (flag) {
                    this.props.renameElements([this.props.info, elementNumber, name]);
                } else {
                    this.timer = setTimeout(() => this.props.renameElements([this.props.info, elementNumber, name]), WAIT_INTERVAL);
                }
            }
        }
    }

    allowORfinishRename() {
        if(this.state.rename){
            this.setState({
                rename: false,
                buttonName: 'Rename ' + this.props.info + 's'
            });
        } else{
            this.setState({
                rename: true,
                buttonName: 'Ready renaming'
            });
        }
    }

    handleClose() {
        this.setState({
            duplicateMessage: false,
            numberMessage: false
        })
    }

    render() {
        let elements;
        if(this.props.info === "agent"){
            elements = this.props.agents;
        } else{
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
                    value = {elements.length}
                    placeholder={0}
                    min={0}
                    max={100}
                    onChange={e => this.numberHandler(e.target.value)}
                />
            </div>
                <Typography variant="body1" gutterBottom>
                    {elements.length} {this.props.info}(s) <button onClick={() => this.allowORfinishRename()}>{this.state.buttonName}</button>
                </Typography>
                {this.state.rename && <ul>
                    {elements.map((item, index) => (
                        <li key={item}>{this.props.info} "{item}" -> Rename it :
                            <input
                                type='text'
                                placeholder="Please provide a name"
                                maxLength={30}
                                onKeyPress={(e) =>
                                    (e.key === 'Enter' ? this.namesHandler(true, index, e.target.value) : null)}
                                onChange={e => this.namesHandler(false, index, e.target.value)}
                            />
                            <Snackbar open={this.state.duplicateMessage} autoHideDuration={3000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="error">
                                    No duplicates of names are allowed!
                                </Alert>
                            </Snackbar>
                            <Snackbar open={this.state.numberMessage} autoHideDuration={3000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="error">
                                    Names cannot be numbers!
                                </Alert>
                            </Snackbar>
                        </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyInfo);