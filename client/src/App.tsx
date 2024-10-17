import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function App() {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token || token === 'undefined') {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }, [navigate])


  return (
    <>
      <h1>Main</h1>    
    </>
  )
}

export default App
