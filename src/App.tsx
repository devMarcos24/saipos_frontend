import React from 'react';
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/global.css'

const App = () => (
  <>
    <Home />
    <ToastContainer autoClose={3000} />
  </>
)
export default App;
