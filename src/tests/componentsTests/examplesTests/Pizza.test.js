import React from 'react';
import ReactDOM from 'react-dom';
import Pizza from '../../../components/examples/Pizza';
import {
    render,
    fireEvent,
    cleanup, queryByText, getByText
} from '@testing-library/react';

//using mount render and need to unmount after test
afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Pizza />, div)
})

it('Click button and show text', () => {
    const {container} = render(<Pizza />);

    //before click text is not visible
    expect(queryByText(container, "John's mother knows John wants a pizza for dinner is false")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Show answer"))
    //after click text is visible
    expect(getByText(container,"John's mother knows John wants a pizza for dinner is false").textContent).toBe("John's mother knows John wants a pizza for dinner is false")
})