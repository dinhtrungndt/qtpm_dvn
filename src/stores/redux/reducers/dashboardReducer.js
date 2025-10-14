import {
  FETCH_DASHBOARD_SALES_FAILURE, FETCH_DASHBOARD_SALES_REQUEST,
  FETCH_DASHBOARD_SALES_SUCCESS, FETCH_DASHBOARD_STATS_FAILURE, FETCH_DASHBOARD_STATS_REQUEST,
  FETCH_DASHBOARD_STATS_SUCCESS
} from '../types';

const initialState = {
  stats: null,
  sales: [],
  loading: false,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_STATS_REQUEST:
    case FETCH_DASHBOARD_SALES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_DASHBOARD_STATS_SUCCESS:
      return { ...state, loading: false, stats: action.payload };

    case FETCH_DASHBOARD_SALES_SUCCESS:
      return { ...state, loading: false, sales: action.payload };

    case FETCH_DASHBOARD_STATS_FAILURE:
    case FETCH_DASHBOARD_SALES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default dashboardReducer;
