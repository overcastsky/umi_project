import * as pageServices from '../services/pages';

export default {
  namespace: 'pages',
  state: {
    data: [],
  },
  reducers: {
    save(state, { payload: { data } }) {
      return { ...state, data };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(pageServices.fetch, { ...payload });
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },
  },
};
