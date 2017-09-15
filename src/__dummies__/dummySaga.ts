import { put } from 'redux-saga/effects';

export default function*({ type }) {
    yield `type: ${type}`;
    yield put({ type });
}
