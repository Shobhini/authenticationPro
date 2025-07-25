import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter ,
    createBrowserRouter,
    createRoutesFromElements ,
    Route,
    RouterProvider,
  } from 'react-router-dom'
import store from './store.js';
import { Provider } from 'react-redux';

import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'


// import Header from './components/Header.jsx'
// import FormContainer from './components/FormContainer.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
     <Route index ={true} path ='/' element={<HomeScreen />} />
     <Route path='/login' element={<LoginScreen />} />
     <Route path='/register' element={<RegisterScreen />} />

    </Route>
  )
);

 createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
   <React.StrictMode>
     <RouterProvider router={router} />
   </React.StrictMode>
  </Provider>
)
