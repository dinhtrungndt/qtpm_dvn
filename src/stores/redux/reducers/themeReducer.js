import { SET_FOOTER_THEME, SET_NAVBAR_THEME, SET_SIDEBAR_THEME } from '../types';

const initialState = {
  sidebar: {},
  navbar: {},
  footer: {},
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR_THEME:
      return { ...state, sidebar: action.payload };
    case SET_NAVBAR_THEME:
      return { ...state, navbar: action.payload };
    case SET_FOOTER_THEME:
      return { ...state, footer: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
