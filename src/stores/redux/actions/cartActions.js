import cartService from '../../../services/cartService';
import * as types from '../types/index';

export const fetchCart = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_REQUEST });
    const data = await cartService.getCart();
    dispatch({ type: types.GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_CART_FAILURE, payload: error.response?.data?.detail || error.message });
  }
};

export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_TO_CART_REQUEST });
    const data = await cartService.addToCart(productId, quantity);
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: data });
    dispatch(fetchCart());
  } catch (error) {
    // console.error("Add to cart error:", error.response?.data || error.message);
    dispatch({ type: types.ADD_TO_CART_FAILURE, payload: error.response?.data?.detail || error.message });
  }
};

export const updateCartItem = (cartId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const data = await cartService.updateItem(cartId, quantity);
    dispatch({ type: types.UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAILURE, payload: error.response?.data?.detail || error.message });
  }
};

export const removeFromCart = (cartId) => async (dispatch) => {
  try {
    dispatch({ type: types.REMOVE_FROM_CART_REQUEST });
    await cartService.removeItem(cartId);
    dispatch({ type: types.REMOVE_FROM_CART_SUCCESS, payload: cartId });
  } catch (error) {
    dispatch({ type: types.REMOVE_FROM_CART_FAILURE, payload: error.response?.data?.detail || error.message });
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: types.CLEAR_CART_REQUEST });
    await cartService.clearCart();
    dispatch({ type: types.CLEAR_CART_SUCCESS });
    dispatch(fetchCart());
  } catch (error) {
    dispatch({ type: types.CLEAR_CART_FAILURE, payload: error.message });
  }
};
