import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './bookstore/Dashboard';
import Cart from './bookstore/Cart'
import Order from './bookstore/Order';
import Loginpg from './bookstore/Loginpg';

function App() {
  const [token,setTokn]=useState();

useEffect(()=>{setTokn(localStorage.getItem('token'));})

  // const setToken = ()=>{setTokn()}
  // const [token, setToken] = useState('')
  // const getToken = () => {
  //     axios.get('http://localhost:9090/bookstore/login/piyushp0541@gmail.com/12345')
  //         .then((res) => {
  //             setToken(res.data)
  //         })
  // }

  // setTokn(localStorage.getItem('token'))
  // console.log('in app'+token)
  // if(!token) {
  //   return <Loginpg />
  // }   

  return (
    <Routes>
      <Route path="/login" element={<Loginpg /> }/>
      <Route path='/cart' element={<Cart />} />
      <Route path='/order' element={<Order />} /> 
      {/* <Route path='/' element={<Dashboard />} />  */}
      <Route path='/' element={token== null ? <Navigate to="/login"/> : <Dashboard />} />
    </Routes>
  );
}

export default App;
