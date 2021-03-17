import React from 'react';
import ReactDOM from 'react-dom';
import MuddyChildren from '../../../components/examples/MuddyChildren';
import {
    render,
    fireEvent,
    cleanup, queryByText, getByText
} from '@testing-library/react';

//using mount render and need to unmount after test
afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<MuddyChildren />, div)
})

it('Click buttons and show text', () => {
    const {container} = render(<MuddyChildren />);

    //before click text is not visible
    expect(queryByText(container, "child1 knows child1 is muddy OR child2 knows false: (child2 is muddy) is true")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Case1: Show answer"))
    //after click text is visible
    expect(getByText(container,"child1 knows child1 is muddy OR child2 knows false: (child2 is muddy) is true").textContent).toBe("child1 knows child1 is muddy OR child2 knows false: (child2 is muddy) is true")

    //before click text is not visible
    expect(queryByText(container, "child1 knows child1 is muddy is true")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Show answer to Question 1"))
    //after click text is visible
    expect(getByText(container,"child1 knows child1 is muddy is true").textContent).toBe("child1 knows child1 is muddy is true")

    //before click text is not visible
    expect(queryByText(container, "child2 knows false: (child2 is muddy) is false")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Show answer to Question 2"))
    //after click text is visible
    expect(getByText(container,"child2 knows false: (child2 is muddy) is false").textContent).toBe("child2 knows false: (child2 is muddy) is false")

    //before click text is not visible
    expect(queryByText(container, "child1 knows child1 is muddy is false")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Case2: Show answer"))
    //after click text is visible
    expect(getByText(container,"child1 knows child1 is muddy is false").textContent).toBe("child1 knows child1 is muddy is false")

})