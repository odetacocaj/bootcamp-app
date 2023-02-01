import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    CLEAR_ERRORS,
  } from '../lib/constants/productConstants';
  export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCTS_REQUEST:
        return {
          loading: true,
          products: [],
        };
   
      case ALL_PRODUCTS_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          prdCount: action.payload.prdCount,
          resultsPerPage:action.payload.resultsPerPage
          
        };
   
      case ALL_PRODUCTS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
   
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
   
      default:
        return state;
    }
  };

  export const productReducer = (state = { product:{} }, action) => {
   
    switch(action.type){
      case SINGLE_PRODUCT_REQUEST:
        return{
          ...state,
          loading:true

        }
        case SINGLE_PRODUCT_SUCCESS:
        // console.log(action)
        // console.log(state)
        return{
          ...state,
          loading:false,
          product:action.payload

        }
        case SINGLE_PRODUCT_FAIL:
        return{
          ...state,
          error:action.payload

        }
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state
    }
  }

  export const newReviewReducer = (state = {}, action) => {
   
    switch(action.type){
      case NEW_REVIEW_REQUEST:
        return{
          ...state,
          loading:true

        }
        case NEW_REVIEW_SUCCESS:
        // console.log(action)
        // console.log(state)
        return{
          // ...state,
          loading:false,
          success:action.payload

        }
        case NEW_REVIEW_FAIL:
        return{
          ...state,
          error:action.payload

        }
        case NEW_REVIEW_RESET:
          return{
            ...state,
            success:false
          }
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state
    }
  }