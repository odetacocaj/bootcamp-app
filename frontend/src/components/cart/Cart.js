import React,{Fragment} from 'react'
import {createSearchParams, Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import MetaData from '../layout/MetaData'
import { useAlert } from "react-alert";
import {addItemToCart,removeFromCart} from '../../actions/cartActions'
import { useNavigate } from 'react-router-dom';


function Cart({history}) {
const navigate=useNavigate()
 const dispatch=useDispatch();
 const{cartItems}=useSelector(state=>state.cart)
 const removeCartItemHandler=(id)=>{
    dispatch(removeFromCart(id))
 }

 const checkoutHandler=()=>{
    navigate({
        pathname:'/login',
        search:createSearchParams({
            redirect:"shipping"
        }).toString()
    })
 }


 const increaseQuantity=(id,quantity,stock)=>{
    const newQuantity=quantity+1;
    if(newQuantity>stock) return

   dispatch(addItemToCart(id,newQuantity))
  }


  const decreaseQuantity=(id,quantity)=>{
    const newQuantity=quantity-1;
    if(newQuantity<= 0) return

   dispatch(addItemToCart(id,newQuantity))
  }
  return (
    <Fragment>
        <MetaData title={'My Cart'}/>
        {cartItems.length===0 ? <h2 className='mt-5'> There are no items in your cart :(  ) </h2> : (
            <Fragment> 
                 <h2 className="mt-5">My Cart: <b>{cartItems.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
               {cartItems.map(item=>(
                    <Fragment>
                        <hr/>
                        <div className="cart-item" key={item.product}>
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.name} height="90" width="115"/>
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/product/${item.product}`}> {item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>removeCartItemHandler(item.product)}></i>
                        </div>

                    </div>
                </div>
                <hr />

                    </Fragment>
               ))}
               
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc,item)=>(acc+Number(item.quantity)),0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">{cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0).toFixed(2)}??? </span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Checkout</button>
                </div>
            </div>
        </div>

            </Fragment>
        )}

    </Fragment>
  )
}

export default Cart