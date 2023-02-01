import axios from 'axios'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from '../lib/constants/orderConstants'


export const createOrder=(order)=> async(dispatch,getState)=>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST})

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('/api/v1/order/new',order,config)
        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
    
}


export const myOrders=()=>async(dispatch)=>{
    try{
        dispatch({
            type:MY_ORDER_REQUEST
        })
        const {data}=await axios.get('/api/v1/orders/getMyOrders')
        // console.log('My orders' +data.orders)

        dispatch({
            type:MY_ORDER_SUCCESS,
            payload:data.orders
        })
    }catch(error){
        dispatch({
            type:MY_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getOrderDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
        const {data}=await axios.get(`/api/v1/order/${id}`)
        // console.log('My orders' +data.order)

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data.order
        })
    }catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const clearErrors=()=> async(dispatch)=>{
    dispatch({
           type :CLEAR_ERRORS
        })
  }