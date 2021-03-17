import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import AddAndStatement from '../../../components/templates/AddAndStatement';
import {changeLeftAnd, changeRightAnd, addStatement} from '../../../actions/index';
import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const mockStore = configureStore([]);

describe('Connected React-Redux Examples', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            statements: ["state(affair1~)","state(affair2~)"],
            encoded: ["a1","a2"],
            truthValues: [true,true],
            leftAnd: 0,
            rightAnd: 1
        });

        store.dispatch = jest.fn();

        component = renderer.create(
            <Provider store={store}>
                <AddAndStatement />
            </Provider>
        );
    });

    it('should dispatch an action on change left statement selected', () => {
        renderer.act(() => {component.root.findAllByType(Select)[0].props.onChange({target:{value: 2}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeLeftAnd(2));
    });
    it('should dispatch an action on change right statement selected', () => {
        renderer.act(() => {component.root.findAllByType(Select)[1].props.onChange({target:{value: 1}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeRightAnd(1));
    });
    it('should dispatch an action on add built AND statement', () => {
        renderer.act(() => {component.root.findByType(AddCircleRoundedIcon).props.onClick();});

        expect(store.dispatch).toHaveBeenCalledTimes(3);
        expect(store.dispatch).toHaveBeenCalledWith(addStatement(["(state(affair1~) AND state(affair2~))", "(a1)&(a2)"]));
        expect(store.dispatch).toHaveBeenCalledWith(changeLeftAnd("Select a statement"));
        expect(store.dispatch).toHaveBeenCalledWith(changeRightAnd("Select a statement"));
    });
});