import * as types from '../types';

const initialState = {
  sidebar: {},
  navbar: {},
  footer: {},
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SIDEBAR_THEME:
      return { ...state, sidebar: action.payload };
    case types.SET_NAVBAR_THEME:
      return { ...state, navbar: action.payload };
    case types.SET_FOOTER_THEME:
      return { ...state, footer: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
