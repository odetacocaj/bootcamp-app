import React from 'react'
import {Link} from 'react-router-dom'
import MetaData from '../layout/MetaData'

function SuccessfulOrder() {
  return (
    <>
    <MetaData title={'Succesful Order'}/>
    <div className="container container-fluid">
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src='/images/order_success.png' alt="Order Success" width="200" height="200" />

                <hr/>
                <h2>Order Succesully Placed</h2>
                <h3>Thank you!</h3>
                <hr/>

                <Link to="/order/getMyOrders">Go to Orders</Link>
            </div>

        </div>
        </div>
    </>
  )
}

export default SuccessfulOrder