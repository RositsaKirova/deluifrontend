import React, { Component } from 'react';
import '../App.css';
import Typography from "@material-ui/core/Typography";

class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            elementsNames: [],
            rename: false,
            buttonName: 'Rename ' + this.props.info + 's'
        };
    }

    numberHandler = (number) => {
        let tempElements = [];
        let newNames = this.state.elementsNames.slice();

        if(number < newNames.length){
            newNames = this.state.elementsNames.slice(0,number);
        }

        for (let i = 1; i <= number; i++) {
            tempElements.push(i);
            if(i > newNames.length){
                newNames.push(i);
            }
        }
        this.setState({
            elements: tempElements.slice(),
            elementsNames: newNames
        });
    }

    namesHandler(elementNumber, name){
        if(name) {
            let newNames = this.state.elementsNames.slice();
            newNames[elementNumber] = name;
            this.setState({
                elementsNames: newNames
            });
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

    render() {
        return (
            <div>
            <div className='rowC'>
                    <Typography variant="body1" gutterBottom>
                        How many {this.props.info}s are involved?<span>&nbsp;&nbsp;&nbsp;</span>
                    </Typography>
                <input
                    type='number'
                    placeholder={0}
                    min={0}
                    max={1000}
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
                                onChange={e => this.namesHandler(item - 1, e.target.value)}
                            />
                        </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default KeyInfo