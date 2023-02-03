import React,{Fragment,useEffect} from 'react'
import { Link} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'
import {useDispatch,useSelector} from 'react-redux'
import MetaData from '../layout/MetaData'
import { useAlert } from "react-alert";
import Loading from '../layout/Loading'
import {allOrders,clearErrors,deleteOrder} from '../../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { DELETE_ORDER_RESET } from '../../lib/constants/orderConstants'



function AllOrdersList() {

    const navigate=useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const {isDeleted}=useSelector(state=>state.order)

    const { loading, error, orders } = useSelector(state => state.allOrders);
    
    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
       
        if(isDeleted){
            alert.success('Successfully deleted order!')
            navigate('/admin/getAllOrders')
            dispatch({type: DELETE_ORDER_RESET})
        }
    }, [dispatch, alert, error,isDeleted])

    const deleteOrderHandler=(id)=>{
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of items',
                    field: 'numberOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                   
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numberOfItems:order.orderItems.length, 
                amount: `${order.totalPrice} €`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                <>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className='btn btn-danger py-1 px-2 ml-2' onClick={()=>deleteOrderHandler(order._id)}>
                    <i className="fa fa-trash"></i>
                    </button>
                    </>
            })
        })

        return data;
    }

   

  return (
    <Fragment>
    <MetaData title={'All Orders'}/>    
   <div className='row'>
       <div className='col-12 col-md-2'>
           <Sidebar/>
       </div>

       <div className='col-12 col-md-10'>
       <Fragment>
           <h1 className='my-5'>All Orders</h1>
           {loading ? <Loading/> : 
           ( <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
        />
           )}
       </Fragment>
       </div>
   </div>
</Fragment>
  )
}

export default AllOrdersList