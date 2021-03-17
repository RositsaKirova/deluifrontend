import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import AddOrStatement from '../../../components/templates/AddOrStatement';
import {changeLeftOr, changeRightOr, addStatement} from '../../../actions/index';
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
            leftOr: 0,
            rightOr: 1
        });

        store.dispatch = jest.fn();

        component = renderer.create(
            <Provider store={store}>
                <AddOrStatement />
            </Provider>
        );
    });

    it('should dispatch an action on change left statement selected', () => {
        renderer.act(() => {component.root.findAllByType(Select)[0].props.onChange({target:{value: 2}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeLeftOr(2));
    });
    it('should dispatch an action on change right statement selected', () => {
        renderer.act(() => {component.root.findAllByType(Select)[1].props.onChange({target:{value: 1}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeRightOr(1));
    });
    it('should dispatch an action on add built OR statement', () => {
        renderer.act(() => {component.root.findByType(AddCircleRoundedIcon).props.onClick();});

        expect(store.dispatch).toHaveBeenCalledTimes(3);
        expect(store.dispatch).toHaveBeenCalledWith(addStatement(["(state(affair1~) OR state(affair2~))", "(a1)|(a2)"]));
        expect(store.dispatch).toHaveBeenCalledWith(changeLeftOr("Select a statement"));
        expect(store.dispatch).toHaveBeenCalledWith(changeRightOr("Select a statement"));
    });
});