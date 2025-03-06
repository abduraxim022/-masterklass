import React from 'react'
import SignUp from './components/form/Form'
import './App.css'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <div>
      <ToastContainer position='top-center'/>
        <SignUp/>
    </div>
  )
}
