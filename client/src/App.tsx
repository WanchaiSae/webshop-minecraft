import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './pages/NavBar'
import ListItems from './components/items/ListItems'
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
      <NavBar />
      <ListItems />
    </>
  )
}

export default App
