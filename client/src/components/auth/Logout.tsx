import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Logout = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')



  useEffect(() => {

    if (!token || token === 'undefined') {   
      navigate('/login')
    }

    localStorage.removeItem('token')
    navigate('/login')
  }, [navigate])

  return null
}

export default Logout