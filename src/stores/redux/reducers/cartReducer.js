import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS
} from '../types/index';

const initialState = {
  loading: false,
  items: [],
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
    case ADD_TO_CART_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
    case REMOVE_FROM_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_CART_SUCCESS:
      return { ...state, loading: false, items: action.payload };

    case ADD_TO_CART_SUCCESS: {
      console.log("ADD_TO_CART_SUCCESS payload:", action.payload);
      const exists = state.items.find((item) => item.id === action.payload.id || item.id === action.payload.cart_id);
      const updatedItems = exists
        ? state.items.map((item) =>
          item.id === (action.payload.id || action.payload.cart_id) ? action.payload : item
        )
        : [...state.items, action.payload];
      return { ...state, loading: false, items: updatedItems };
    }

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case GET_CART_FAILURE:
    case ADD_TO_CART_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
    case REMOVE_FROM_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_CART_SUCCESS:
    case CLEAR_CART_FAILURE:
    case CLEAR_CART_REQUEST:
      return { ...state, loading: false, items: [] };

    default:
      return state;
  }
};

export default cartReducer;
