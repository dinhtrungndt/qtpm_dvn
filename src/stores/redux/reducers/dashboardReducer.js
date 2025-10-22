import * as types from '../types/index';

const initialState = {
  stats: null,
  sales: [],
  loading: false,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_STATS_REQUEST:
    case types.FETCH_DASHBOARD_SALES_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_DASHBOARD_STATS_SUCCESS:
      return { ...state, loading: false, stats: action.payload };

    case types.FETCH_DASHBOARD_SALES_SUCCESS:
      return { ...state, loading: false, sales: action.payload };

    case types.FETCH_DASHBOARD_STATS_FAILURE:
    case types.FETCH_DASHBOARD_SALES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default dashboardReducer;
