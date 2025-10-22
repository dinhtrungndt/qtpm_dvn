import searchService from '../../../services/searchService';

export const setSearchQuery = query => ({
  type: 'SET_SEARCH_QUERY',
  payload: query,
});

export const clearSearch = () => ({
  type: 'CLEAR_SEARCH',
});

export const performSearch = (query, isAuthenticated) => async dispatch => {
  dispatch({ type: 'SEARCH_REQUEST' });
  try {
    const results = await searchService.search(query, isAuthenticated);
    dispatch({
      type: 'SEARCH_SUCCESS',
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: 'SEARCH_FAILURE',
      payload: error.message,
    });
  }
};

export const fetchSuggestions = () => async dispatch => {
  dispatch({ type: 'SUGGESTIONS_REQUEST' });
  try {
    const suggestions = await searchService.getSuggestions();
    dispatch({
      type: 'SUGGESTIONS_SUCCESS',
      payload: suggestions,
    });
  } catch (error) {
    dispatch({
      type: 'SUGGESTIONS_FAILURE',
      payload: error.message,
    });
  }
};
