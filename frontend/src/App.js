import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
