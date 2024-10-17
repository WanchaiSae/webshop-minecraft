import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './pages/NavBar'
function App() {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // useEffect(() => {
  //   if (!token || token === 'undefined') {
  //     localStorage.removeItem('token')
  //     navigate('/login')
  //   }
  // }, [navigate])


  return (
    <>
      <NavBar />
    </>
  )
}

export default App
