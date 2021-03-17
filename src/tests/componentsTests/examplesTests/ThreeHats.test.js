import React from 'react';
import ReactDOM from 'react-dom';
import ThreeHats from '../../../components/examples/ThreeHats';
import {
    render,
    fireEvent,
    cleanup, queryByText, getByText
} from '@testing-library/react';

//using mount render and need to unmount after test
afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<ThreeHats />, div)
})

it('Click buttons and show text', () => {
    const {container} = render(<ThreeHats />);

    //before click text is not visible
    expect(queryByText(container, "((prisoner1 knows prisoner1 has a blue hat OR prisoner1 knows false: (prisoner1 has a blue hat)) OR (prisoner2 knows prisoner2 has a blue hat OR prisoner2 knows false: (prisoner2 has a blue hat))) OR (prisoner3 knows prisoner3 has a blue hat OR prisoner3 knows false: (prisoner3 has a blue hat)) is false")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Show answer"))
    //after click text is visible
    expect(getByText(container,"((prisoner1 knows prisoner1 has a blue hat OR prisoner1 knows false: (prisoner1 has a blue hat)) OR (prisoner2 knows prisoner2 has a blue hat OR prisoner2 knows false: (prisoner2 has a blue hat))) OR (prisoner3 knows prisoner3 has a blue hat OR prisoner3 knows false: (prisoner3 has a blue hat)) is false").textContent).toBe("((prisoner1 knows prisoner1 has a blue hat OR prisoner1 knows false: (prisoner1 has a blue hat)) OR (prisoner2 knows prisoner2 has a blue hat OR prisoner2 knows false: (prisoner2 has a blue hat))) OR (prisoner3 knows prisoner3 has a blue hat OR prisoner3 knows false: (prisoner3 has a blue hat)) is false")

    //before click text is not visible
    expect(queryByText(container, "(prisoner1 knows prisoner1 has a blue hat OR prisoner2 knows prisoner2 has a blue hat) OR prisoner3 knows false: (prisoner3 has a blue hat) is true")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Case: Show answer"))
    //after click text is visible
    expect(getByText(container,"(prisoner1 knows prisoner1 has a blue hat OR prisoner2 knows prisoner2 has a blue hat) OR prisoner3 knows false: (prisoner3 has a blue hat) is true").textContent).toBe("(prisoner1 knows prisoner1 has a blue hat OR prisoner2 knows prisoner2 has a blue hat) OR prisoner3 knows false: (prisoner3 has a blue hat) is true")


    //before click text is not visible
    expect(queryByText(container, "prisoner1 knows prisoner1 has a blue hat is false")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Show answer to Question 1"))
    //after click text is visible
    expect(getByText(container,"prisoner1 knows prisoner1 has a blue hat is false").textContent).toBe("prisoner1 knows prisoner1 has a blue hat is false")

    //before click text is not visible
    expect(queryByText(container, "prisoner2 knows prisoner2 has a blue hat is false")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Show answer to Question 2"))
    //after click text is visible
    expect(getByText(container,"prisoner2 knows prisoner2 has a blue hat is false").textContent).toBe("prisoner2 knows prisoner2 has a blue hat is false")

    //before click text is not visible
    expect(queryByText(container, "prisoner3 knows false: (prisoner3 has a blue hat) is true")).toBeNull()
    //click button
    fireEvent.click(getByText(container,"Show answer to Question 3"))
    //after click text is visible
    expect(getByText(container,"prisoner3 knows false: (prisoner3 has a blue hat) is true").textContent).toBe("prisoner3 knows false: (prisoner3 has a blue hat) is true")

})