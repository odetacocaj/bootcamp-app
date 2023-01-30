import './App.css';
import { useEffect } from 'react';
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
function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/password/forgot' element={<ForgotPassword/>}/>
            <Route path='/password/reset/:token'  element={<NewPassword/>}/>
            <Route path="/getMe" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/getMe/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/password/change" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
