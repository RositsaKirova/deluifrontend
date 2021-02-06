import { REMOVE_ELEMENTS, REMOVE_ELEMENT, REMOVE_STATEMENT, REMOVE_SUBMITTED, REMOVE_QUESTION, ADD_ELEMENTS, RENAME_ELEMENTS,
    ADD_STATEMENT, ADD_SUBMITTED, CHANGE_AFFAIR, CHANGE_LEFT_AND, CHANGE_RIGHT_AND, CHANGE_LEFT_OR, CHANGE_RIGHT_OR, CHANGE_LEFT_THEN,
    CHANGE_RIGHT_THEN, CHANGE_POSSIBLE_KNOWLEDGE, CHANGE_AGENTS_WITH_POSSIBLE_KNOWLEDGE, CHANGE_KNOWLEDGE, CHANGE_AGENTS_WITH_KNOWLEDGE,
    CHANGE_COMMON_KNOWLEDGE, CHANGE_TRUTH_VALUE, CHANGE_QUESTION, RESET} from "../constants/action-types";

export function removeElements(payload) {
    return { type: REMOVE_ELEMENTS, payload}
};

export function removeElement(payload) {
    return { type: REMOVE_ELEMENT, payload}
};

export function removeStatement(payload) {
    return { type: REMOVE_STATEMENT, payload}
};

export function removeSubmitted(payload) {
    return { type: REMOVE_SUBMITTED, payload}
};

export function removeQuestion() {
    return { type: REMOVE_QUESTION}
};

export function addElements(payload) {
    return { type: ADD_ELEMENTS, payload}
};

export function renameElements(payload) {
    return { type: RENAME_ELEMENTS, payload}
};

export function addStatement(payload) {
    return { type: ADD_STATEMENT, payload}
};

export function addSubmitted(payload) {
    return { type: ADD_SUBMITTED, payload}
};

export function changeAffair(payload) {
    return { type: CHANGE_AFFAIR, payload}
};

export function changeLeftAnd(payload) {
    return { type: CHANGE_LEFT_AND, payload}
};

export function changeRightAnd(payload) {
    return { type: CHANGE_RIGHT_AND, payload}
};

export function changeLeftOr(payload) {
    return { type: CHANGE_LEFT_OR, payload}
};

export function changeRightOr(payload) {
    return { type: CHANGE_RIGHT_OR, payload}
};

export function changeLeftThen(payload) {
    return { type: CHANGE_LEFT_THEN, payload}
};

export function changeRightThen(payload) {
    return { type: CHANGE_RIGHT_THEN, payload}
};

export function changePossibleKnowledge(payload) {
    return { type: CHANGE_POSSIBLE_KNOWLEDGE, payload}
};

export function changeAgentsWithPossibleKnowledge(payload) {
    return { type: CHANGE_AGENTS_WITH_POSSIBLE_KNOWLEDGE, payload}
};

export function changeKnowledge(payload) {
    return { type: CHANGE_KNOWLEDGE, payload}
};

export function changeAgentsWithKnowledge(payload) {
    return { type: CHANGE_AGENTS_WITH_KNOWLEDGE, payload}
};

export function changeCommonKnowledge(payload) {
    return { type: CHANGE_COMMON_KNOWLEDGE, payload}
};

export function changeTruthValue(payload) {
    return { type: CHANGE_TRUTH_VALUE, payload}
};

export function changeQuestion(payload) {
    return { type: CHANGE_QUESTION, payload}
};

export function reset(payload) {
    return { type: RESET, payload}
};