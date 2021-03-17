import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import AddAffair from '../../../components/templates/AddAffair';
import {changeAffair, addStatement} from '../../../actions/index';
import Select from "@material-ui/core/Select";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const mockStore = configureStore([]);

describe('Connected React-Redux Examples', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            affairs: ["affair1", "affair2"],
            statements: [],
            encoded: [],
            truthValues: [],
            affair: 2
        });

        store.dispatch = jest.fn();

        component = renderer.create(
            <Provider store={store}>
                <AddAffair />
            </Provider>
        );
    });

    it('should dispatch an action on change state selected', () => {
        renderer.act(() => {component.root.findByType(Select).props.onChange({target:{value: 1}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeAffair(1));
    });
    it('should dispatch an action on add selected state', () => {
        renderer.act(() => {component.root.findByType(AddCircleRoundedIcon).props.onClick();});

        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith(addStatement(["state(affair2~)", "a2"]));
        expect(store.dispatch).toHaveBeenCalledWith(changeAffair("Select a state"));
    });
});