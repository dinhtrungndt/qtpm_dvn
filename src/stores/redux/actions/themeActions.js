import * as types from '../types';

export const setSidebarThemeActions = (payload) => ({
  type: types.SET_SIDEBAR_THEME,
  payload,
});

export const setNavbarThemeActions = (payload) => ({
  type: types.SET_NAVBAR_THEME,
  payload,
});

export const setFooterThemeActions = (payload) => ({
  type: types.SET_FOOTER_THEME,
  payload,
});

export const toggleSidebarCollapsed = () => ({
  type: types.TOGGLE_SIDEBAR_COLLAPSED,
});
