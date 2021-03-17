import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Examples from '../../../src/components/Examples';
import {changeExample} from '../../../src/actions/index';
import {Button} from "@material-ui/core";

const mockStore = configureStore([]);

describe('Connected React-Redux Examples', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            example: 0
        });

        store.dispatch = jest.fn();

        component = renderer.create(
            <Provider store={store}>
                <Examples />
            </Provider>
        );
    });

    it('should dispatch an action on button "Dreaming of pizza" click', () => {
        renderer.act(() => {component.root.findAllByType(Button)[0].props.onClick();});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeExample(1));
    });
    it('should dispatch an action on button "Muddy Children" click', () => {
        renderer.act(() => {component.root.findAllByType(Button)[1].props.onClick();});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeExample(2));
    });
    it('should dispatch an action on button "Three-Hat Puzzle" click', () => {
        renderer.act(() => {component.root.findAllByType(Button)[2].props.onClick();});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeExample(3));
    });
});