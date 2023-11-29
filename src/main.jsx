import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Coins from './components/Coinspage/Coins.jsx'
import Exchange from './components/Exchangepage/Exchange.jsx'
import Home from './components/Home/Home.jsx'
import Coinsdetails from './components/Coinspage/Coinsdetails.jsx'

//the server link from the request will be sent
const server = 'https://api.coingecko.com/api/v3';

const myapprouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element = {<App/>}>
             <Route path='' element={<Home/>}/>
             <Route path='coins' element={<Coins/>}/>
             <Route path='exchanges' element={<Exchange/>}/>
             <Route path='coins/:coinname' element={<Coinsdetails/>}/>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={myapprouter}/>
)

export default server;
