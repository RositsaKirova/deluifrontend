import React from 'react';
import ReactDOM from 'react-dom';
import Term from '../components/Term';
import {
    render,
    fireEvent,
    cleanup, queryByText, getByText
} from '@testing-library/react';

//using mount render and need to unmount after test
afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Term />, div)
})

it('Button clicks and visibility of drop-down work appropriately', () => {
    const {container} = render(<Term title={"title"} explanation={"explanation"} />);

    //see text in a button
    expect(getByText(container,"title").textContent).toBe("title")
    //doesn't see drop-down text
    expect(queryByText(container, "explanation")).toBeNull()
    //click on button
    fireEvent.click(getByText(container,"title"))
    //see drop-down text
    expect(getByText(container,"explanation").textContent).toBe("explanation")
    //click on drop-down
    fireEvent.click(getByText(container,"explanation"))
    //see drop-down text
    expect(getByText(container,"explanation").textContent).toBe("explanation")
    //click on button
    fireEvent.click(getByText(container,"title"))
    //doesn't see drop-down text
    expect(queryByText(container, "explanation")).toBeNull()
})