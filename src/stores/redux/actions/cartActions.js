import cartService from '../../../services/cartService';
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

export const fetchCart = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });
    const data = await cartService.getCart();
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.response?.data?.detail || error.message });
  }
};

export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const data = await cartService.addToCart(productId, quantity);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    dispatch(fetchCart());
  } catch (error) {
    console.error("Add to cart error:", error.response?.data || error.message);
    dispatch({ type: ADD_TO_CART_FAILURE, payload: error.response?.data?.detail || error.message });
  }
};

export const updateCartItem = (cartId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    const data = await cartService.updateItem(cartId, quantity);
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.response?.data?.detail || error.message });
  }
};

export const removeFromCart = (cartId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_CART_REQUEST });
    await cartService.removeItem(cartId);
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: cartId });
  } catch (error) {
    dispatch({ type: REMOVE_FROM_CART_FAILURE, payload: error.response?.data?.detail || error.message });
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CART_REQUEST });
    await cartService.clearCart();
    dispatch({ type: CLEAR_CART_SUCCESS });
    dispatch(fetchCart());
  } catch (error) {
    dispatch({ type: CLEAR_CART_FAILURE, payload: error.message });
  }
};
