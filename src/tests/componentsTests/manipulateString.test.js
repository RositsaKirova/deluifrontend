import manipulateString from '../../components/manipulateString';

test('state', () => {
   expect(manipulateString("state(someState~)")).toBe("someState");
});
test('false state', () => {
   expect(manipulateString("false: (state(someState~))*")).toBe("false: (someState)");
});
test('knowledge of agent', () => {
   expect(manipulateString("agent(anAgent~) knows state(someState~)")).toBe("anAgent knows someState");
});
test('knowledge of agents', () => {
   expect(manipulateString("agents(anAgent,anotherAgent~) know state(someState~)")).toBe("anAgent,anotherAgent know someState");
});
test('combinations starting and ending with brackets', () => {
   expect(manipulateString("(agent(anAgent~) knows state(someState~) OR agent(anAgent~) knows false: (state(someState~)))"))
       .toBe("anAgent knows someState OR anAgent knows false: (someState)");
});