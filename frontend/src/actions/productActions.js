import axios from 'axios';
import { syncIndexes } from 'mongoose';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,
    CLEAR_ERRORS,
  } from '../lib/constants/productConstants';

  export const getProducts=()=>async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCTS_REQUEST})
        const{data}= await axios.get('/api/v1/products')
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
  }



  export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: SINGLE_PRODUCT_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`)
        console.log(data.product)

        dispatch({
            type: SINGLE_PRODUCT_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: SINGLE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
  export const clearErrors=()=> async(dispatch)=>{
    dispatch({
           type :CLEAR_ERRORS
        })
  }