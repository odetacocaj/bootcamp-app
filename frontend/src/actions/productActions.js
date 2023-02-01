import axios from 'axios';
import { syncIndexes } from 'mongoose';

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

  export const getProducts=(keyword='',currentPage=1,price,category)=>async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCTS_REQUEST})

        let dest=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
       
        if(category){
           dest=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }
        const{data}= await axios.get(dest)
        // console.log(data);
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

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/review`,reviewData,config)
        console.log("Ketuuu :"+data);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}
  export const clearErrors=()=> async(dispatch)=>{
    dispatch({
           type :CLEAR_ERRORS
        })
  }

  