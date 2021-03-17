import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import AddKnowledgeStatement from '../../../components/templates/AddKnowledgeStatement';
import {changeAgentsWithKnowledge, changeKnowledge, addStatement} from '../../../actions/index';
import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const mockStore = configureStore([]);

describe('Connected React-Redux Examples', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            agents: ["agent1", "agent2"],
            statements: ["state(affair1~)","state(affair2~)"],
            encoded: ["a1","a2"],
            truthValues: [true,true],
            agent: ["agent1"],
            knows: 0
        });

        store.dispatch = jest.fn();

        component = renderer.create(
            <Provider store={store}>
                <AddKnowledgeStatement />
            </Provider>
        );
    });

    it('should dispatch an action on change agent to many agents', () => {
        renderer.act(() => {component.root.findAllByType(Select)[0].props.onChange({target:{value: ["agent1","agent2"]}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeAgentsWithKnowledge(["agent1","agent2"]));
    });
    it('should dispatch an action on change agent to no agents', () => {
        renderer.act(() => {component.root.findAllByType(Select)[0].props.onChange({target:{value: null}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeAgentsWithKnowledge(["agent(s)"]));
    });
    it('should dispatch an action on change knowledge of agent(s)', () => {
        renderer.act(() => {component.root.findAllByType(Select)[1].props.onChange({target:{value: 1}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeKnowledge(1));
    });
    it('should dispatch an action on add built KNOWLEDGE statement', () => {
        renderer.act(() => {component.root.findByType(AddCircleRoundedIcon).props.onClick();});

        expect(store.dispatch).toHaveBeenCalledTimes(3);
        expect(store.dispatch).toHaveBeenCalledWith(addStatement(["agent(agent1~) knows state(affair1~)" , "K{ag1}(a1)"]));
        expect(store.dispatch).toHaveBeenCalledWith(changeAgentsWithKnowledge(["agent(s)"]));
        expect(store.dispatch).toHaveBeenCalledWith(changeKnowledge("Select a statement"));
    });
});