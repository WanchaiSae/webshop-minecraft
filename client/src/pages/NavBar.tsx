import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const [username, setUsername] = useState('')
  const [balance, setBalance] = useState(0)

  const token = localStorage.getItem('token')

  const getPayloadFromToken = (token: string | null) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.payload; // คืนค่า payload ทั้งหมด
  };

  const payload = getPayloadFromToken(token);
  const userId = payload?.user_id;
  const role = payload?.role;

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        setUsername(data.user_username)
        setBalance(data.balance)
    }).catch((error) => console.log(error))
  }, [])


  return (
    <>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <Link to={'/'}>Webshop Minecraft</Link>
          </div>
          <div className="space-x-4">
              {role === 2 ? <span className="text-white hover:text-blue-300"><Link to={"/add"}>Add Item</Link></span>  : null}
             <span className="text-white hover:text-blue-300"><Link to={"/topup"}>Topup</Link></span> 
            <span className="text-white hover:text-blue-300">You : {username}</span>
            <span className="text-white hover:text-blue-300">Balance : {balance.toLocaleString('en-US')}</span>
            <span className="text-white hover:text-blue-300"><Link to={"/logout"}>Logout</Link></span>
          </div>
        </div>
  </nav>
    </>
  )
}

export default NavBar