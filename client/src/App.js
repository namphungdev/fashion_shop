import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/header.jsx';
import Footer from './components/layout/footer.jsx';
import Home from './components/home/home.jsx';
// import Notfound from './components/notfound/notfound.jsx';
import Product from './components/Products/product.jsx';
import ProductDetail from './components/Products/product_detail.jsx';
// import Box from '@mui/material/Box';
import 'tw-elements';
import Login from './components/login/login';
import Register from './components/login/register';
import Cookies from "js-cookie";




function App() {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/categorys/:id' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/categorys/hoodies' element={<Product />} />
      </Routes>
      <Footer />
    </div>


  );
}

export default App;
