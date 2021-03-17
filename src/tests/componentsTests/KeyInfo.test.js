import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import KeyInfo from '../../../src/components/KeyInfo';
import {removeElements, removeElement, addElements, renameElements} from '../../../src/actions/index';
import {Button} from "@material-ui/core";

const mockStore = configureStore([]);

describe('Connected React-Redux Examples', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            agents: ["ag1", "ag2"],
            affairs: []
        });

        store.dispatch = jest.fn();

        component = renderer.create(
            <Provider store={store}>
                <KeyInfo info={"agent"} />
            </Provider>
        );
    });

    it('should dispatch an action on number increase of input type number', () => {
        renderer.act(() => {component.root.findAllByType('input')[0].props.onChange({target:{value: 4}})});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(addElements(["agent", 4]));
    });

    it('should dispatch an action on number decrease of input type number', () => {
        renderer.act(() => {component.root.findAllByType('input')[0].props.onChange({target:{value: 1}})});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(removeElements(["agent", 1]));
    });

    it('should dispatch an action on main button "Remove" and then button "Remove" for specific element', () => {
        renderer.act(() => {component.root.findAllByType(Button)[1].props.onClick();});
        renderer.act(() => {component.root.findAllByType(Button)[2].props.onClick();});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(removeElement(["agent", 0]));
    });

    it('should dispatch an action on button "Rename" and then rename a certain element', () => {
        renderer.act(() => {component.root.findAllByType(Button)[0].props.onClick();});
        renderer.act(() => {component.root.findAllByType('input')[1].props.onKeyPress({key: "Enter", target:{value: "newName"}});});

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(renameElements(["agent", 0, "newName"]));
    });
});