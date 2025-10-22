import * as types from '../types';

const initialState = {
  query: '',
  results: {
    users: null,
    products: [],
    orders: [],
    carts: [],
    payments: [],
  },
  suggestions: {
    users: null,
    products: [],
    orders: [],
    carts: [],
    payments: [],
  },
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_QUERY:
      return { ...state, query: action.payload };
    case types.CLEAR_SEARCH_QUERY:
      return { ...state, query: '' };
    case types.SET_SEARCH_RESULTS:
      return { ...state, results: action.payload };
    case types.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        results: { users: null, products: [], orders: [], carts: [], payments: [] },
      };
    case types.SET_SEARCH_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    case types.CLEAR_SEARCH_SUGGESTIONS:
      return {
        ...state,
        suggestions: { users: null, products: [], orders: [], carts: [], payments: [] },
      };
    case types.SEARCH_REQUEST:
      return { ...state, loading: true, error: null };
    case types.SEARCH_SUCCESS:
      return { ...state, loading: false, results: action.payload };
    case types.SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
