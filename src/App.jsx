import React from 'react'
import SignUp from './components/form/Form'
import './App.css'
import { Toaster } from 'react-hot-toast'


export default function App() {
  return (
    <div>
   <Toaster position="top-center" reverseOrder={false} />
        <SignUp/>
    </div>
  )
}
