import * as actions from '../../actions/index'
import * as types from '../../constants/action-types'

describe('actions', () => {
    it('should create an action to add elements', () => {
        const payload = ["affair", 5]
        const expectedAction = {
            type: types.ADD_ELEMENTS,
            payload
        }
        expect(actions.addElements(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove elements', () => {
        const payload = ["affair", 2]
        const expectedAction = {
            type: types.REMOVE_ELEMENTS,
            payload
        }
        expect(actions.removeElements(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove an element', () => {
        const payload = "test"
        const expectedAction = {
            type: types.REMOVE_ELEMENT,
            payload
        }
        expect(actions.removeElement(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove a statement', () => {
        const payload = "test"
        const expectedAction = {
            type: types.REMOVE_STATEMENT,
            payload
        }
        expect(actions.removeStatement(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove a submitted statement', () => {
        const payload = "test"
        const expectedAction = {
            type: types.REMOVE_SUBMITTED,
            payload
        }
        expect(actions.removeSubmitted(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove a question', () => {
        const payload = "test"
        const expectedAction = {
            type: types.REMOVE_QUESTION
        }
        expect(actions.removeQuestion()).toEqual(expectedAction)
    })
    it('should create an action to rename elements', () => {
        const payload = "test"
        const expectedAction = {
            type: types.RENAME_ELEMENTS,
            payload
        }
        expect(actions.renameElements(payload)).toEqual(expectedAction)
    })
    it('should create an action to add a statement', () => {
        const payload = "test"
        const expectedAction = {
            type: types.ADD_STATEMENT,
            payload
        }
        expect(actions.addStatement(payload)).toEqual(expectedAction)
    })
    it('should create an action to add a submitted statement', () => {
        const payload = "test"
        const expectedAction = {
            type: types.ADD_SUBMITTED,
            payload
        }
        expect(actions.addSubmitted(payload)).toEqual(expectedAction)
    })
    it('should create an action to change affair', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_AFFAIR,
            payload
        }
        expect(actions.changeAffair(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the content of the box on the left side of the AND template', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_LEFT_AND,
            payload
        }
        expect(actions.changeLeftAnd(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the content of the box on the right side of the AND template', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_RIGHT_AND,
            payload
        }
        expect(actions.changeRightAnd(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the content of the box on the left side of the OR template', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_LEFT_OR,
            payload
        }
        expect(actions.changeLeftOr(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the content of the box on the right side of the OR template', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_RIGHT_OR,
            payload
        }
        expect(actions.changeRightOr(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the content of the box on the left side of the THEN template', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_LEFT_THEN,
            payload
        }
        expect(actions.changeLeftThen(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the content of the box on the right side of the THEN template', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_RIGHT_THEN,
            payload
        }
        expect(actions.changeRightThen(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the possible knowledge statement', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_POSSIBLE_KNOWLEDGE,
            payload
        }
        expect(actions.changePossibleKnowledge(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the agents which posses possible knowledge', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_AGENTS_WITH_POSSIBLE_KNOWLEDGE,
            payload
        }
        expect(actions.changeAgentsWithPossibleKnowledge(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the knowledge statement', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_KNOWLEDGE,
            payload
        }
        expect(actions.changeKnowledge(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the agents which posses knowledge', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_AGENTS_WITH_KNOWLEDGE,
            payload
        }
        expect(actions.changeAgentsWithKnowledge(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the common knowledge state', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_COMMON_KNOWLEDGE,
            payload
        }
        expect(actions.changeCommonKnowledge(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the truth value state', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_TRUTH_VALUE,
            payload
        }
        expect(actions.changeTruthValue(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the question', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_QUESTION,
            payload
        }
        expect(actions.changeQuestion(payload)).toEqual(expectedAction)
    })
    it('should create an action to change the example in the example section', () => {
        const payload = "test"
        const expectedAction = {
            type: types.CHANGE_EXAMPLE,
            payload
        }
        expect(actions.changeExample(payload)).toEqual(expectedAction)
    })
    it('should create an action to reset form', () => {
        const payload = "test"
        const expectedAction = {
            type: types.RESET,
            payload
        }
        expect(actions.reset(payload)).toEqual(expectedAction)
    })
})