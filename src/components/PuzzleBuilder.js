import React from 'react';
import KeyInfo from "./KeyInfo";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';

import '../App.css';
import Button from "@material-ui/core/Button";

//I NEED A CHANGE
class PuzzleBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agents: [],
            affairs: [],
            combinationsInProcess: [],
            combinationsInProcessEncoded: [],
            combinationsTruthValues: [],
            finished: [],
            combinations: '',
            affair: "Select an affair",
            testVariable1: true,
            testVariable2: true
        };
        this.addAffair = this.addAffair.bind(this);
    }

    callbackAgents = async (agentsData, numberOfAgents, numberOfChangedAgent) => {
        await this.setState({agents: agentsData})
    }

    callbackAffairs = async (affairsData, numberOfAffairs, numberOfChangedAffair) => {
        let affairsNumberNow = this.state.affairs.length;
        if(numberOfAffairs >= 0 && numberOfAffairs < affairsNumberNow){
            if(numberOfAffairs < this.state.affair){
                await this.setState({affair: "Select an affair"})
            }
            this.removeAffairsFromCombinations(parseInt(numberOfAffairs) + 1, affairsNumberNow);
        } else {
            this.updateAffairsInCombinations(this.state.affairs[numberOfChangedAffair], affairsData[numberOfChangedAffair]);
        }
        await this.setState({
            affairs: affairsData,
        })
    }

    handleAffairChange = (event) => {
        this.setState({affair: event})
    };

    async addAffair() {
        let combEncoded = this.state.combinationsInProcessEncoded;
        let comb = this.state.combinationsInProcess;
        let indexAffair = this.state.affair;
        if (!(indexAffair === "Select an affair")) {
            let newAffairEncoded = 'a' + indexAffair;
            if(combEncoded.indexOf(newAffairEncoded) === -1){
                combEncoded.push(newAffairEncoded);
                comb.push("affair(" + this.state.affairs[indexAffair-1] + ")");
            }
            await this.setState({
                combinationsInProcessEncoded: combEncoded,
                combinationsInProcess: comb
            })
        }
    }

    removeAffairsFromCombinations = (start, stop) => {
        let combinationsEncoded = this.state.combinationsInProcessEncoded;
        let combinations = this.state.combinationsInProcess;
        let indexes = new Set();
        for (let i = 0; i < combinationsEncoded.length; i++) {
            for (let j = start; j <= stop; j++) {
                console.log("start - " + start);
                if(combinationsEncoded[i].includes('a' + start)){
                    indexes.add(i);
                }
            }
        }

        console.log("before - " + combinationsEncoded);
        console.log("before - " + combinations);

        [].slice.call(indexes).sort();
        console.log(indexes);

        for (let x = indexes.size -1; x >= 0; x--) {
            let elementToRemove = Array.from(indexes)[x];
            combinationsEncoded.splice(elementToRemove, 1);
            combinations.splice(elementToRemove, 1);
        }

        console.log("after - " + combinationsEncoded);
        console.log("after - " + combinations);

        this.setState({
            combinationsInProcessEncoded: combinationsEncoded,
            combinationsInProcess: combinations
        })
    }

    updateAffairsInCombinations = (nameBefore, nameAfter) => {
        let combinations = this.state.combinationsInProcess;

        for (let i = 0; i < combinations.length; i++) {
            if(combinations[i].includes('affair(' + nameBefore + ")")){
                console.log(combinations[i]);
                let newString = combinations[i].replace(nameBefore, nameAfter);
                combinations[i] = newString;
                console.log(combinations[i]);
            }
        }
        this.setState({
            combinationsInProcess: combinations
        })
    }

    render() {
        return (
            <div>
                <div className='rowC'>
                <KeyInfo info={"agent"} elementsCallback={this.callbackAgents}/>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <KeyInfo info={"affair"} elementsCallback={this.callbackAffairs}/>
                </div>
                <br/>
                <Typography variant="h6" gutterBottom>
                    Templates to use:
                </Typography>
                <div className='rowC'>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Select
                        value={this.state.affair}
                        onChange={e => this.handleAffairChange(e.target.value)}
                    >
                        <option value="Select an affair" disabled>Select an affair</option>
                        {this.state.affairs.map((item, index) => (
                            <option value={index+1} >{item}</option>))}
                    </Select>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addAffair}
                    >
                        Add
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input readOnly value="AND" style={{ width: "50px", textAlign: "center" }}/>
                </div>
                <br/>
                <Typography variant="h6" gutterBottom>
                    Combinations in process:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Decide on which ones are true ............
                </Typography>
                <ul>
                    {this.state.combinationsInProcess.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default PuzzleBuilder;