import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {cleanup} from '@testing-library/react';

//using mount render and need to unmount after test
afterEach(cleanup)

//NOT WORKING
it("renders without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<App />, div)
})