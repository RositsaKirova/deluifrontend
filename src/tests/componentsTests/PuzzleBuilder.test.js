import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import PuzzleBuilder from '../../../src/components/PuzzleBuilder';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import HelpIcon from '@material-ui/icons/Help';
import {addSubmitted, removeStatement, removeSubmitted, changeQuestion} from '../../../src/actions/index';

const mockStore = configureStore([]);

describe('Connected React-Redux Examples', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            agents: ["ag1"],
            affairs: ["affair1"],
            statements: ["state(affair1~)","agent(anAgent~) knows state(affair1~)"],
            encoded: ["a1","K{ag1}(a1)"],
            truthValues: [true,true],
            submitted: ["state(affair1~)"],
            submittedEncoded: ["a1"],
            cksubmitted: [false],
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
            indexQuestion: -1
        });

        store.dispatch = jest.fn();

        component = renderer.create(
            <Provider store={store}>
                <PuzzleBuilder />
            </Provider>
        );
    });

    it('should dispatch an action on add a statement from statements in progress to submitted statements', () => {
        renderer.act(() => {component.root.findAllByType(AssignmentTurnedInTwoToneIcon)[1].props.onClick()});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(addSubmitted(["agent(anAgent~) knows state(affair1~)","K{ag1}(a1)"]));
    });
    it('should dispatch an action on remove a statement from statements in progress', () => {
        renderer.act(() => {component.root.findAllByType(DeleteForeverOutlinedIcon)[1].props.onClick()});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(removeStatement(1));
    });
    it('should dispatch an action on set a statement from statements in progress to be a question', () => {
        renderer.act(() => {component.root.findAllByType(HelpIcon)[1].props.onClick()});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeQuestion(1));
    });
    it('should dispatch an action on remove a statement from submitted statements', () => {
        renderer.act(() => {component.root.findAllByType(DeleteForeverOutlinedIcon)[2].props.onClick()});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(removeSubmitted(0));
    });
});