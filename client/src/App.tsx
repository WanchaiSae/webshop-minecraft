import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListItems from './components/items/ListItems'
import NavBar from './pages/NavBar'
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
