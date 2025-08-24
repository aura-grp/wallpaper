import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Car from './pages/Car'
import Minimal from './pages/Minimal'
import Black from './pages/Black'
import Home from './pages/Home'
import Nav from './components/Nav'

const App = () => {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cars' element={<Car/>}/>
        <Route path='/minimal' element={<Minimal/>}/>
        <Route path='/black' element={<Black/>}/>
      </Routes>
    </div>
  )
}

export default App