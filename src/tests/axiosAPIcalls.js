//import '@testing-library/jest-dom';
const postQuestion = require('../service/APIService');
const axios = require('axios');

jest.mock('axios');

it('returns the submission object as confirmation', async() => {
    const submission = await APIService.postQuestion(["K{ag1}(a1)"], [false], "a1");
    console.log(submission);
    expect(submission).toEqual(["K{ag1}(a1)"], [false], "a1");
});