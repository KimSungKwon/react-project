import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';      // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'   // 특정 key값 바꾸기

const WRITE_POST = 'write/WRITE_POST';
const WRITE_POST_SUCCESS = 'write/WRITE_POST_SUCCESS';
const WRITE_POST_FAILURE = 'write/WRITE_POST_FAILURE';

const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';    // 현재 보고있는 포스트 정보를 write 모듈에서 관리하는 상태에 넣음

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({ key, value }));    

export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({ title, body, tags }));

export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);

// 사가 생성
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: null,
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value,   // 특정 key값 업데이트
        }),
        [WRITE_POST]: state => ({
            // post, postError 초기화
            ...state,
            post: null,
            postError: null,
        }),
        [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,   // 서버에서 응답한 포스트
        }),
        [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
            ...state,
            postError,
        }),
        [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
            ...state,
            title: post.title,
            body: post.body,
            tags: post.tags,
            originalPostId: post._id,
        }),
    },
    initialState,
);

export default write;