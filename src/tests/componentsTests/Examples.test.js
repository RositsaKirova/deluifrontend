import React from 'react';
import ReactDOM from 'react-dom';
import Examples from "../../components/Examples";
import {
    render,
    fireEvent,
    cleanup, queryByText, getByText
} from '@testing-library/react';

//using mount render and need to unmount after test
afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Examples />, div)
})

it('Click buttons and show text', () => {
    const {container} = render(<Examples />);

    //no buttons clicked yet and no text
    expect(queryByText(container, "John wants a pizza for dinner.")).toBeNull()
    expect(queryByText(container, "There is a set of children.")).toBeNull()
    expect(queryByText(container, "In a room there are 3 prisoners.")).toBeNull()


})