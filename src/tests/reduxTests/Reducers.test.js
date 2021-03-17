import reducer from '../../reducers/index'
import * as types from '../../constants/action-types'

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                agents: [],
                affairs: [],
                statements: [],
                encoded: [],
                truthValues: [],
                submitted: [],
                submittedEncoded: [],
                cksubmitted: [],
                question: [],
                questionEncoded: '',
                agent: ["agent(s)"],
                agent2: ["agent(s)"],
                affair: "Select a state",
                leftAnd: "Select a statement",
                rightAnd: "Select a statement",
                leftOr: "Select a statement",
                rightOr: "Select a statement",
                leftThen: "Select a statement",
                rightThen: "Select a statement",
                knows: "Select a statement",
                pknowledge: "Select a statement",
                example: 0
            })
    })
    it('should handle ADD_ELEMENTS', () => {
        expect(
            reducer(
                {
                    agents: [],
                    affairs: []
                },
                {
                    type: types.ADD_ELEMENTS,
                    payload: ["affair", 5]
                }
            )
        ).toEqual({
            agents: [],
            affairs: ["1","2","3","4","5"]
        })
        expect(
            reducer(
                {
                    agents: [],
                    affairs: []
                },
                {
                    type: types.ADD_ELEMENTS,
                    payload: ["agent", 3]
                }
            )
        ).toEqual({
            agents: ["ag1","ag2","ag3"],
            affairs: []
        })
    })
    it('should handle ADD_STATEMENT', () => {
        expect(
            reducer(
                {
                    statements: [],
                    encoded: [],
                    truthValues: []
                },
                {
                    type: types.ADD_STATEMENT,
                    payload: ["state(1~)", "a1"]
                }
            )
        ).toEqual({
            statements: ["state(1~)"],
            encoded: ["a1"],
            truthValues: [true]
        })
        expect(
            reducer(
                {
                    statements: ["state(1~)"],
                    encoded: ["a1"],
                    truthValues: [true]
                },
                {
                    type: types.ADD_STATEMENT,
                    payload: ["agents(ag1,ag2~) know state(1~)", "K{ag1,ag2}a1"]
                }
            )
        ).toEqual({
            statements: ["state(1~)","agents(ag1,ag2~) know state(1~)"],
            encoded: ["a1","K{ag1,ag2}a1"],
            truthValues: [true,true]
        })
    })
    it('should handle CHANGE_TRUTH_VALUE', () => {
        expect(
            reducer(
                {
                    statements: ["state(1~)","agents(ag1,ag2~) know state(1~)"],
                    encoded: ["a1","K{ag1,ag2}a1"],
                    truthValues: [true,true]
                },
                {
                    type: types.CHANGE_TRUTH_VALUE,
                    payload: [0,"false: (state(1~))","~(a1)", false]
                }
            )
        ).toEqual({
            statements: ["false: (state(1~))","agents(ag1,ag2~) know state(1~)"],
            encoded: ["~(a1)","K{ag1,ag2}a1"],
            truthValues: [false,true]
        })
    })
    it('should handle ADD_SUBMITTED', () => {
        expect(
            reducer(
                {
                    submitted: [],
                    submittedEncoded: [],
                    cksubmitted: []
                },
                {
                    type: types.ADD_SUBMITTED,
                    payload: ["agents(ag1,ag2~) know state(1~)","K{ag1,ag2}a1"]
                }
            )
        ).toEqual({
            submitted: ["agents(ag1,ag2~) know state(1~)"],
            submittedEncoded: ["K{ag1,ag2}a1"],
            cksubmitted: [false]
        })
    })
    it('should handle CHANGE_QUESTION', () => {
        expect(
            reducer(
                {
                    statements: ["state(1~)","agents(ag1,ag2~) know state(1~)"],
                    encoded: ["a1","K{ag1,ag2}a1"],
                    question: [],
                    questionEncoded: ''
                },
                {
                    type: types.CHANGE_QUESTION,
                    payload: 0
                }
            )
        ).toEqual({
            statements: ["state(1~)","agents(ag1,ag2~) know state(1~)"],
            encoded: ["a1","K{ag1,ag2}a1"],
            question: ["state(1~)"],
            questionEncoded: "a1"
        })
    })
    it('should handle REMOVE_ELEMENTS', () => {
        expect(
            reducer(
                {
                    statements: ["state(1~)", "false: (state(2~))","agents(ag1,ag2~) know state(1~)"],
                    encoded: ["a1","~(a2)","K{ag1,ag2}a1"],
                    truthValues: [true,false,true],
                    submitted: ["agents(ag1,ag2~) know state(1~)"],
                    submittedEncoded: ["K{ag1,ag2}a1"],
                    question: ["state(1~)"],
                    questionEncoded: "a1",
                    affair: "2",
                    agents: ["ag1","ag2", "ag3"],
                    affairs: ["1", "2"],
                    agent: ["ag1"],
                    agent2: ["ag2"]
                },
                {
                    type: types.REMOVE_ELEMENTS,
                    payload: ["agent", 1]
                }
            )
        ).toEqual({
            statements: ["state(1~)", "false: (state(2~))"],
            encoded: ["a1","~(a2)"],
            truthValues: [true,false],
            submitted: [],
            submittedEncoded: [],
            question: ["state(1~)"],
            questionEncoded: "a1",
            affair: "2",
            agents: ["ag1"],
            affairs: ["1", "2"],
            agent: ["agent(s)"],
            agent2: ["agent(s)"]
        })
        expect(
            reducer(
                {
                    statements: ["state(1~)", "false: (state(2~))","agents(ag1,ag2~) know state(1~)"],
                    encoded: ["a1","~(a2)","K{ag1,ag2}a1"],
                    truthValues: [true,false,true],
                    submitted: ["agents(ag1,ag2~) know state(1~)"],
                    submittedEncoded: ["K{ag1,ag2}a1"],
                    question: ["state(1~)"],
                    questionEncoded: "a1",
                    affair: "2",
                    agents: ["ag1","ag2", "ag3"],
                    affairs: ["1", "2"]
                },
                {
                    type: types.REMOVE_ELEMENTS,
                    payload: ["affair", 0]
                }
            )
        ).toEqual({
            statements: [],
            encoded: [],
            truthValues: [],
            submitted: [],
            submittedEncoded: [],
            question: [],
            questionEncoded: '',
            affair: "Select a state",
            agents: ["ag1","ag2", "ag3"],
            affairs: [],
            leftAnd: "Select a statement",
            rightAnd: "Select a statement",
            leftOr: "Select a statement",
            rightOr: "Select a statement",
            leftThen: "Select a statement",
            rightThen: "Select a statement",
            knows: "Select a statement",
            cknowledge: "Select a statement",
            pknowledge: "Select a statement"
        })
    })
    it('should handle REMOVE_ELEMENT', () => {
        expect(
            reducer(
                {
                    statements: ["state(1~)", "false: (state(2~))","agents(ag1,ag2~) know state(1~)"],
                    encoded: ["a1","~(a2)","K{ag1,ag2}a1"],
                    truthValues: [true,false,true],
                    submitted: ["agents(ag1,ag2~) know state(1~)"],
                    submittedEncoded: ["K{ag1,ag2}a1"],
                    question: ["state(1~)"],
                    questionEncoded: "a1",
                    affair: "2",
                    agents: ["ag1","ag2", "ag3"],
                    affairs: ["1", "2"],
                    agent: ["ag1"],
                    agent2: ["ag2"]
                },
                {
                    type: types.REMOVE_ELEMENT,
                    payload: ["agent", 1]
                }
            )
        ).toEqual({
            statements: ["state(1~)", "false: (state(2~))"],
            encoded: ["a1","~(a2)"],
            truthValues: [true,false],
            submitted: [],
            submittedEncoded: [],
            question: ["state(1~)"],
            questionEncoded: "a1",
            affair: "2",
            agents: ["ag1","ag3"],
            affairs: ["1", "2"],
            agent: ["agent(s)"],
            agent2: ["agent(s)"]
        })
        expect(
            reducer(
                {
                    statements: ["state(1~)", "false: (state(2~))","agents(ag1,ag2~) know state(1~)"],
                    encoded: ["a1","~(a2)","K{ag1,ag2}a1"],
                    truthValues: [true,false,true],
                    submitted: ["agents(ag1,ag2~) know state(1~)"],
                    submittedEncoded: ["K{ag1,ag2}a1"],
                    question: ["state(1~)"],
                    questionEncoded: "a1",
                    affair: "2",
                    agents: ["ag1","ag2", "ag3"],
                    affairs: ["1", "2"]
                },
                {
                    type: types.REMOVE_ELEMENTS,
                    payload: ["affair", 1]
                }
            )
        ).toEqual({
            statements: ["state(1~)","agents(ag1,ag2~) know state(1~)"],
            encoded: ["a1","K{ag1,ag2}a1"],
            truthValues: [true,true],
            submitted: ["agents(ag1,ag2~) know state(1~)"],
            submittedEncoded: ["K{ag1,ag2}a1"],
            question: ["state(1~)"],
            questionEncoded: "a1",
            affair: "Select a state",
            agents: ["ag1","ag2", "ag3"],
            affairs: ["1"],
            leftAnd: "Select a statement",
            rightAnd: "Select a statement",
            leftOr: "Select a statement",
            rightOr: "Select a statement",
            leftThen: "Select a statement",
            rightThen: "Select a statement",
            knows: "Select a statement",
            cknowledge: "Select a statement",
            pknowledge: "Select a statement"
        })
    })
    it('should handle REMOVE_STATEMENT', () => {
        expect(
            reducer(
                {
                    statements: ["state(1~)","agents(ag1,ag2~) know state(1~)"],
                    encoded: ["a1","K{ag1,ag2}a1"],
                    truthValues: [true,true]
                },
                {
                    type: types.REMOVE_STATEMENT,
                    payload: 0
                }
            )
        ).toEqual({
            statements: ["agents(ag1,ag2~) know state(1~)"],
            encoded: ["K{ag1,ag2}a1"],
            truthValues: [true]
        })
    })
    it('should handle REMOVE_SUBMITTED', () => {
        expect(
            reducer(
                {
                    submitted: ["agents(ag1,ag2~) know state(1~)"],
                    submittedEncoded: ["K{ag1,ag2}a1"],
                    cksubmitted: [false]
                },
                {
                    type: types.REMOVE_SUBMITTED,
                    payload: 0
                }
            )
        ).toEqual({
            submitted: [],
            submittedEncoded: [],
            cksubmitted: []
        })
    })
    it('should handle REMOVE_QUESTION', () => {
        expect(
            reducer([],
                {
                    type: types.REMOVE_QUESTION
                }
            )
        ).toEqual({
            question: [],
            questionEncoded: ''
        })
    })
    it('should handle RENAME_ELEMENTS', () => {
        expect(
            reducer(
                {
                    statements: ["state(1~)", "false: (state(2~))","agents(ag1,ag2~) know state(1~)"],
                    submitted: ["agents(ag1,ag2~) know state(1~)"],
                    question: ["state(1~)"],
                    agents: ["ag1","ag2", "ag3"],
                    affairs: ["1", "2"],
                    agent: ["ag1"],
                    agent2: ["ag2"]
                },
                {
                    type: types.RENAME_ELEMENTS,
                    payload: ["agent", 1, "newAgentName"]
                }
            )
        ).toEqual({
            statements: ["state(1~)", "false: (state(2~))","agents(ag1,newAgentName~) know state(1~)"],
            submitted: ["agents(ag1,newAgentName~) know state(1~)"],
            question: ["state(1~)"],
            agents: ["ag1","newAgentName", "ag3"],
            affairs: ["1", "2"],
            agent: ["ag1"],
            agent2: ["newAgentName"]
        })
        expect(
            reducer(
                {
                    statements: ["state(1~)", "false: (state(2~))","agents(ag1,ag2~) know state(1~)"],
                    submitted: ["agents(ag1,ag2~) know state(1~)"],
                    question: ["state(1~)"],
                    agents: ["ag1","ag2", "ag3"],
                    affairs: ["1", "2"],
                    agent: ["ag1"],
                    agent2: ["ag2"]
                },
                {
                    type: types.RENAME_ELEMENTS,
                    payload: ["affair", 0, "newName"]
                }
            )
        ).toEqual({
            statements: ["state(newName~)", "false: (state(2~))","agents(ag1,ag2~) know state(newName~)"],
            submitted: ["agents(ag1,ag2~) know state(newName~)"],
            question: ["state(newName~)"],
            agents: ["ag1","ag2", "ag3"],
            affairs: ["newName", "2"],
            agent: ["ag1"],
            agent2: ["ag2"]
        })
    })
    it('should handle CHANGE_AFFAIR', () => {
        expect(
            reducer(
                {
                    affair: 1
                },
                {
                    type: types.CHANGE_AFFAIR,
                    payload: 2
                }
            )
        ).toEqual({
            affair: 2
        })
    })
})