import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/user/Login'
import ProductDetails from './components/product/ProductDetails';
import Register from './components/user/Register'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
