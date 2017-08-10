import { put, PutEffect } from 'redux-saga/effects';

export default function*({ type }) {
    yield `type: ${type}`;
    yield put({ type });
}
