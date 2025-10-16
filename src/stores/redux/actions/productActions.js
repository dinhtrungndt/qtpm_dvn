import productService from '../../../services/productService';
import * as types from '../types/index';

// Lấy danh sách sản phẩm
export const getProducts = () => async (dispatch) => {
  dispatch({ type: types.GET_PRODUCTS_REQUEST });
  try {
    const data = await productService.getList();
    dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCTS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// lấy tất cả sản phẩm (không phân trang)
export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: types.GET_PRODUCTS_ALL_REQUEST });
  try {
    const data = await productService.getListAll();
    dispatch({ type: types.GET_PRODUCTS_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCTS_ALL_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
  try {
    const data = await productService.getDetail(id);
    dispatch({ type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCT_DETAIL_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// Tạo sản phẩm
export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCT_REQUEST });
  try {
    await productService.create(productData);
    dispatch({ type: types.CREATE_PRODUCT_SUCCESS });
    dispatch(getProducts());
  } catch (error) {
    dispatch({
      type: types.CREATE_PRODUCT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// Cập nhật sản phẩm
export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST });
  try {
    await productService.update(id, productData);
    dispatch({ type: types.UPDATE_PRODUCT_SUCCESS });
    dispatch(getProducts());
  } catch (error) {
    dispatch({
      type: types.UPDATE_PRODUCT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// Xóa sản phẩm
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });
  try {
    await productService.remove(id);
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS });
    dispatch(getProducts());
  } catch (error) {
    dispatch({
      type: types.DELETE_PRODUCT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// Tìm kiếm sản phẩm
export const searchProduct = (query) => async (dispatch) => {
  dispatch({ type: types.SEARCH_PRODUCT_REQUEST });
  try {
    const data = await productService.search(query);
    dispatch({ type: types.SEARCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.SEARCH_PRODUCT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};
