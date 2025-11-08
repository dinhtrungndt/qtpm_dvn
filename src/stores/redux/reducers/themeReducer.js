import * as types from '../types';

const initialState = {
  sidebar: { collapsed: false, color: "bg-gray-800", theme: "light" },
  navbar: {},
  footer: {},
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SIDEBAR_THEME:
      return { ...state, sidebar: { ...state.sidebar, ...action.payload } };
    case types.TOGGLE_SIDEBAR_COLLAPSED:
      return { ...state, sidebar: { ...state.sidebar, collapsed: !state.sidebar.collapsed } };
    case types.SET_SIDEBAR_COLLAPSED:
      return { ...state, sidebar: { ...state.sidebar, collapsed: action.payload } };
    case types.SET_NAVBAR_THEME:
      return { ...state, navbar: action.payload };
    case types.SET_FOOTER_THEME:
      return { ...state, footer: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
