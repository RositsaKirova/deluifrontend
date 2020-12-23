import React from 'react';
import '../App.css';
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            elements: [],
            elementsNames: [],
            rename: false,
            buttonName: 'Rename ' + this.props.info + 's',
            duplicateMessage: false,
            numberMessage: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    sendData = (theData, numberOfElements, elementChanged) => {
        this.props.elementsCallback(theData, numberOfElements, elementChanged);
    }

    numberHandler = (number) => {
        if(number < 0){
            number = 0;
        }
        if(number > 100){
            number = 100;
        }
        let tempElements = [];
        let newNames = this.state.elementsNames.slice();

        if(number < newNames.length){
            newNames = this.state.elementsNames.slice(0,number);
        }

        for (let i = 1; i <= number; i++) {
            tempElements.push(i);
            if(i > newNames.length){
                newNames.push(i.toString());
            }
        }
        this.setState({
            number: number,
            elements: tempElements.slice(),
            elementsNames: newNames
        });

        this.sendData(newNames, number, -1);
    }

    //can't be duplicate
    //can't be a number
    namesHandler(elementNumber, name){
        this.setState({
            numberMessage: false,
            duplicateMessage: false
        });
        if(name){
            if(this.state.elementsNames.some(item => name === item)){
                this.setState({
                    numberMessage: false,
                    duplicateMessage: true
                });
            } else if(!isNaN(name)){
                this.setState({
                    duplicateMessage: false,
                    numberMessage: true
                });
            } else {
                let newNames = this.state.elementsNames.slice();
                newNames[elementNumber] = name;
                this.setState({
                    elementsNames: newNames
                });

                this.sendData(newNames, -1, elementNumber);
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
        return (
            <div>
            <div className='rowC'>
                    <Typography variant="body1" gutterBottom>
                        How many {this.props.info}s are involved?<span>&nbsp;&nbsp;&nbsp;</span>
                    </Typography>
                <input
                    type='number'
                    value = {this.state.number}
                    placeholder={0}
                    min={0}
                    max={100}
                    onChange={e => this.numberHandler(e.target.value)}
                />
            </div>
                <Typography variant="body1" gutterBottom>
                    {this.state.elements.length} {this.props.info}(s) <button onClick={() => this.allowORfinishRename()}>{this.state.buttonName}</button>
                </Typography>
                {this.state.rename && <ul>
                    {this.state.elements.map(item => (
                        <li key={item}>{this.props.info} {this.state.elementsNames[item-1]} -> Rename it :
                            <input
                                type='text'
                                placeholder="Please provide a name"
                                maxLength={20}
                                onChange={e => this.namesHandler(item - 1, e.target.value)}
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

export default KeyInfo