import * as types from '../types/index';

const initialState = {
  loading: false,
  items: [],
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CART_REQUEST:
    case types.ADD_TO_CART_REQUEST:
    case types.UPDATE_CART_ITEM_REQUEST:
    case types.REMOVE_FROM_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case types.GET_CART_SUCCESS:
      return { ...state, loading: false, items: action.payload };

    case types.ADD_TO_CART_SUCCESS: {
      // console.log("types.ADD_TO_CART_SUCCESS payload:", action.payload);
      const exists = state.items.find((item) => item.id === action.payload.id || item.id === action.payload.cart_id);
      const updatedItems = exists
        ? state.items.map((item) =>
          item.id === (action.payload.id || action.payload.cart_id) ? action.payload : item
        )
        : [...state.items, action.payload];
      return { ...state, loading: false, items: updatedItems };
    }

    case types.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case types.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case types.GET_CART_FAILURE:
    case types.ADD_TO_CART_FAILURE:
    case types.UPDATE_CART_ITEM_FAILURE:
    case types.REMOVE_FROM_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.CLEAR_CART_SUCCESS:
    case types.CLEAR_CART_FAILURE:
    case types.CLEAR_CART_REQUEST:
      return { ...state, loading: false, items: [] };

    default:
      return state;
  }
};

export default cartReducer;
