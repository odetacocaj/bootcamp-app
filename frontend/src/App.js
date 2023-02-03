import './App.css';
import { useEffect, useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/user/Login'
import ProductDetails from './components/product/ProductDetails';
import Register from './components/user/Register'
import {loadUser} from './actions/userActions'
import store from './store'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import ChangePassword from './components/user/ChangePassword';
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping';
import OrderConfirmation from './components/cart/OrderConfirmation';
import Payment from './components/cart/Payment';
import OrdersList from './components/order/OrdersList';
import axios from 'axios';
import { loadStripe} from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import SuccessfulOrder from './components/cart/SuccessfulOrder';
import OrderDetails from './components/order/OrderDetails';

// Admin Only
import AllOrdersList from './components/admin/AllOrdersList';
import CreateProduct from './components/admin/CreateProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
function App() {

  const[stripeApiKey,setStripeApiKey]=useState('');

  useEffect(()=>{
    store.dispatch(loadUser())

    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
      // console.log(data.stripeApiKey)
    }
    getStripeApiKey();
    },[])
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {stripeApiKey && 
              <Route path="/payment" element={
                <ProtectedRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              } />
            }

            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/password/forgot' element={<ForgotPassword/>}/>
            <Route path='/password/reset/:token'  element={<NewPassword/>}/>


            <Route path="/success" element={<ProtectedRoute><SuccessfulOrder /></ProtectedRoute>} />
            <Route path="/orders/getMyOrders" element={<ProtectedRoute><OrdersList /></ProtectedRoute>} />
            <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route path="/order/confirm" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
            <Route path="/getMe" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/getMe/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/password/change" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

            
          </Routes>
        </div>
        <Routes>
        <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductsList /></ProtectedRoute>} />
        <Route path="/admin/product/new" element={<ProtectedRoute isAdmin={true}><CreateProduct /></ProtectedRoute>} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
        <Route path="/admin/getAllOrders" element={<ProtectedRoute isAdmin={true}><AllOrdersList /></ProtectedRoute>} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />
        <Route path="/admin/userData/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
        </Routes>
       
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
