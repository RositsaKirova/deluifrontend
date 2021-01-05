import { REMOVE_ELEMENTS, REMOVE_STATEMENT, REMOVE_SUBMITTED, REMOVE_QUESTION, ADD_ELEMENTS, RENAME_ELEMENTS, ADD_STATEMENT, ADD_SUBMITTED,
    CHANGE_AFFAIR, CHANGE_LEFT_AND, CHANGE_RIGHT_AND, CHANGE_LEFT_OR, CHANGE_RIGHT_OR, CHANGE_LEFT_THEN, CHANGE_RIGHT_THEN,
    CHANGE_POSSIBLE_KNOWLEDGE, CHANGE_AGENTS_WITH_POSSIBLE_KNOWLEDGE, CHANGE_KNOWLEDGE, CHANGE_AGENTS_WITH_KNOWLEDGE, CHANGE_COMMON_KNOWLEDGE,
    CHANGE_TRUTH_VALUE, CHANGE_QUESTION} from "../constants/action-types";

const initialState = {
    agents: [],
    affairs: [],
    statements: [],
    encoded: [],
    truthValues: [],
    submitted: [],
    submittedEncoded: [],
    question: [],
    questionEncoded: '',
    agent: ["agent(s)"],
    agent2: ["agent(s)"],
    affair: "Select an affair",
    leftAnd: "Select a statement",
    rightAnd: "Select a statement",
    leftOr: "Select a statement",
    rightOr: "Select a statement",
    leftThen: "Select a statement",
    rightThen: "Select a statement",
    knows: "Select a statement",
    cknowledge: "Select a statement",
    pknowledge: "Select a statement"
};

function substringBetween(s, a, b) {
    if(s.indexOf(a) === -1){
        return ""
    }
    let p = s.indexOf(a) + a.length;
    return s.substring(p, s.indexOf(b, p));
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case REMOVE_ELEMENTS: {
            let name = action.payload[0];
            let number = parseInt(action.payload[1]);
            let stop;
            let combInProcess = state.statements.slice();
            let combInProcessEncoded = state.encoded.slice();
            let tValues = state.truthValues.slice();
            let combSubmitted = state.submitted.slice();
            let combSubmittedEncoded = state.submittedEncoded.slice();
            let affairNumber = state.affair;
            let element;
            if (name === "agent") {
                element = 'ag';
                stop = state.agents.slice();
            } else {
                element = 'a';
                stop = state.affairs.slice();
                if(number < affairNumber){
                    affairNumber = "Select an affair";
                }
            }

            let indexes = new Set();
            let indexesFinished = new Set();
            for (let i = 0; i < combInProcessEncoded.length; i++) {
                for (let j = number + 1; j <= stop.length; j++) {
                    if (combInProcessEncoded[i].includes(element + j)) {
                        indexes.add(i);
                    }
                }
            }
            for (let i = 0; i < combSubmittedEncoded.length; i++) {
                for (let j = number + 1; j <= stop.length; j++) {
                    if (combSubmittedEncoded[i].includes(element + j)) {
                        indexesFinished.add(i);
                    }
                }
            }
            [].slice.call(indexes).sort();
            [].slice.call(indexesFinished).sort();
            for (let x = indexes.size -1; x >= 0; x--) {
                let elementToRemove = Array.from(indexes)[x];
                combInProcessEncoded.splice(elementToRemove, 1);
                combInProcess.splice(elementToRemove, 1);
                tValues.splice(elementToRemove, 1);
            }

            for (let x = indexesFinished.size -1; x >= 0; x--) {
                let elementToRemove = Array.from(indexesFinished)[x];
                combSubmittedEncoded.splice(elementToRemove, 1);
                combSubmitted.splice(elementToRemove, 1);
            }
            if (name === "agent") {
                return Object.assign({}, state, {
                    encoded: combInProcessEncoded,
                    statements: combInProcess,
                    truthValues: tValues,
                    submittedEncoded: combSubmittedEncoded,
                    submitted: combSubmitted,
                    agents: stop.slice(0,number),
                    agent: ["agent(s)"],
                    agent2: ["agent(s)"]
                });
            } else {
                return Object.assign({}, state, {
                    statements: combInProcess,
                    encoded: combInProcessEncoded,
                    truthValues: tValues,
                    submittedEncoded: combSubmittedEncoded,
                    submitted: combSubmitted,
                    affairs: stop.slice(0,number),
                    affair: affairNumber,
                    leftAnd: "Select a statement",
                    rightAnd: "Select a statement",
                    leftOr: "Select a statement",
                    rightOr: "Select a statement",
                    leftThen: "Select a statement",
                    rightThen: "Select a statement",
                    knows: "Select a statement",
                    cknowledge: "Select a statement",
                    pknowledge: "Select a statement",
                });
            }
        }
        case REMOVE_STATEMENT: {
            let index = action.payload;
            let statements = state.statements.slice();
            statements.splice(index, 1);
            let encoded = state.encoded.slice();
            encoded.splice(index, 1);
            let truthValues = state.truthValues.slice();
            truthValues.splice(index, 1);
            return Object.assign({}, state, {
                statements: statements,
                encoded: encoded,
                truthValues: truthValues
            });
        }
        case REMOVE_SUBMITTED: {
            let index = action.payload;
            let submitted = state.submitted.slice();
            submitted.splice(index, 1);
            let submittedEncoded = state.submittedEncoded.slice();
            submittedEncoded.splice(index, 1);
            return Object.assign({}, state, {
                submitted: submitted,
                submittedEncoded: submittedEncoded
            });
        }
        case REMOVE_QUESTION: {
            return Object.assign({}, state, {
                question: [],
                questionEncoded: ''
            });
        }
        case ADD_ELEMENTS: {
            let name = action.payload[0];
            let number = parseInt(action.payload[1]);
            let stop;
            if (name === "agent") {
                stop = state.agents.slice();
            } else {
                stop = state.affairs.slice();
            }
            for (let i = stop.length + 1; i <= number; i++) {
                stop = stop.concat(i.toString());
            }
            if (name === "agent") {
                return Object.assign({}, state, {
                    agents: stop
                });
            } else {
                return Object.assign({}, state, {
                    affairs: stop
                });
            }
        }
        case RENAME_ELEMENTS: {
            let elements;
            let combInProcess = state.statements.slice();
            let combSubmitted = state.submitted.slice();
            let name = action.payload[0];
            let index = parseInt(action.payload[1]);
            let nameAfter = action.payload[2];
            let nameBefore;
            let agent1 = state.agent.slice();
            let agent2 = state.agent2.slice();

            if (name === "agent") {
                elements = state.agents.slice();
                nameBefore = elements[index];

                for (let i = 0; i < combInProcess.length; i++) {
                    while(combInProcess[i].includes('agent(' + nameBefore + ")")){
                        let newString = combInProcess[i].replace("agent(" + nameBefore + ")", "agent(" + nameAfter + ")");
                        combInProcess[i] = newString;
                    }

                    if(combInProcess[i].includes('agents(')){
                        let comb = combInProcess[i];
                        let toUpdate = substringBetween(comb, "agents(", ")");
                        while(!(toUpdate === null || toUpdate === '')){
                            if(toUpdate.includes(nameBefore)){
                                let newSub = toUpdate.replace(nameBefore, nameAfter);
                                let newString2 = combInProcess[i].replace("agents(" + toUpdate + ")", "agents(" + newSub + ")");
                                combInProcess[i] = newString2;
                            }
                            let newComb = comb.replace("agents(" + toUpdate + ")", "");
                            comb = newComb;
                            toUpdate = substringBetween(comb, "agents(", ")");
                        }
                    }
                }

                for (let i = 0; i < combSubmitted.length; i++) {
                    while(combSubmitted[i].includes('agent(' + nameBefore + ")")){
                        let newString = combSubmitted[i].replace("agent(" + nameBefore + ")", "agent(" + nameAfter + ")");
                        combSubmitted[i] = newString;
                    }

                    if(combSubmitted[i].includes('agents(')){
                        let comb = combSubmitted[i];
                        let toUpdate = substringBetween(comb, "agents(", ")");
                        while(!(toUpdate === null || toUpdate === '')){
                            if(toUpdate.includes(nameBefore)){
                                let newSub = toUpdate.replace(nameBefore, nameAfter);
                                let newString2 = combSubmitted[i].replace("agents(" + toUpdate + ")", "agents(" + newSub + ")");
                                combSubmitted[i] = newString2;
                            }
                            let newComb = comb.replace("agents(" + toUpdate + ")", "");
                            comb = newComb;
                            toUpdate = substringBetween(comb, "agents(", ")");
                        }
                    }
                }

                let agentIndex = agent1.indexOf(nameBefore);

                if (agentIndex !== -1) {
                    agent1[agentIndex] = nameAfter;
                }

                let agentIndex2 = agent2.indexOf(nameBefore);

                if (agentIndex2 !== -1) {
                    agent2[agentIndex2] = nameAfter;
                }
            } else {
                elements = state.affairs.slice();
                nameBefore = elements[index];

                for (let i = 0; i < combInProcess.length; i++) {
                    while(combInProcess[i].includes('affair(' + nameBefore + ")")){
                        let newString = combInProcess[i].replace("affair(" + nameBefore + ")", "affair(" + nameAfter + ")");
                        combInProcess[i] = newString;
                    }
                }

                for (let i = 0; i < combSubmitted.length; i++) {
                    while(combSubmitted[i].includes('affair(' + nameBefore + ")")){
                        let newString = combSubmitted[i].replace("affair(" + nameBefore + ")", "affair(" + nameAfter + ")");
                        combSubmitted[i] = newString;
                    }
                }
            }

            elements[index] = nameAfter;

            if (name === "agent") {
                return Object.assign({}, state, {
                    statements: combInProcess,
                    submitted: combSubmitted,
                    agent: agent1,
                    agent2: agent2,
                    agents: elements
                });
            } else{
                return Object.assign({}, state, {
                    statements: combInProcess,
                    submitted: combSubmitted,
                    affairs: elements
                });
            }
        }
        case ADD_STATEMENT: {
            return Object.assign({}, state, {
                statements: state.statements.slice().concat(action.payload[0]),
                encoded: state.encoded.slice().concat(action.payload[1]),
                truthValues: state.truthValues.slice().concat(true)
            });
        }
        case ADD_SUBMITTED: {
            return Object.assign({}, state, {
                submitted: state.submitted.slice().concat(action.payload[0]),
                submittedEncoded: state.submittedEncoded.slice().concat(action.payload[1])
            });
        }
        case CHANGE_AFFAIR: {
            return Object.assign({}, state, {
                affair: action.payload
            });
        }
        case CHANGE_LEFT_AND: {
            return Object.assign({}, state, {
                leftAnd: action.payload
            });
        }
        case CHANGE_RIGHT_AND: {
            return Object.assign({}, state, {
                rightAnd: action.payload
            });
        }
        case CHANGE_LEFT_OR: {
            return Object.assign({}, state, {
                leftOr: action.payload
            });
        }
        case CHANGE_RIGHT_OR: {
            return Object.assign({}, state, {
                rightOr: action.payload
            });
        }
        case CHANGE_LEFT_THEN: {
            return Object.assign({}, state, {
                leftThen: action.payload
            });
        }
        case CHANGE_RIGHT_THEN: {
            return Object.assign({}, state, {
                rightThen: action.payload
            });
        }
        case CHANGE_POSSIBLE_KNOWLEDGE: {
            return Object.assign({}, state, {
                pknowledge: action.payload
            });
        }
        case CHANGE_AGENTS_WITH_POSSIBLE_KNOWLEDGE: {
            return Object.assign({}, state, {
                agent2: action.payload
            });
        }
        case CHANGE_KNOWLEDGE: {
            return Object.assign({}, state, {
                knows: action.payload
            });
        }
        case CHANGE_AGENTS_WITH_KNOWLEDGE: {
            return Object.assign({}, state, {
                agent: action.payload
            });
        }
        case CHANGE_COMMON_KNOWLEDGE: {
            return Object.assign({}, state, {
                cknowledge: action.payload
            });
        }
        case CHANGE_TRUTH_VALUE: {
            let index = action.payload[0];
            let statements = state.statements;
            statements[index] = action.payload[1];
            let encoded = state.encoded;
            encoded[index] = action.payload[2];
            let truthValues = state.truthValues;
            truthValues[index] = action.payload[3];
            return Object.assign({}, state, {
                statements: statements,
                encoded: encoded,
                truthValues: truthValues
            });
        }
        case CHANGE_QUESTION: {
            let index = action.payload;
            return Object.assign({}, state, {
                question: [state.statements.slice()[index]],
                questionEncoded: state.encoded.slice()[index]
            });
        }
        default:
            return state;
    }
}

export default rootReducer;