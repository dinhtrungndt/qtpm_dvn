import { SET_FOOTER_THEME, SET_NAVBAR_THEME, SET_SIDEBAR_THEME } from '../types';

export const setSidebarThemeActions = (payload) => ({
  type: SET_SIDEBAR_THEME,
  payload,
});

export const setNavbarThemeActions = (payload) => ({
  type: SET_NAVBAR_THEME,
  payload,
});

export const setFooterThemeActions = (payload) => ({
  type: SET_FOOTER_THEME,
  payload,
});
