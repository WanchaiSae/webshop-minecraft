import React, { useEffect, useState } from 'react'

interface Item {
  item_id: number
  item_name: string
  item_description: string
  item_price: number
}

interface CardProps {
  title: string;
  description: string;
  price: number;
  itemId: number;
  onClick: (itemId: number) => void;
}

const ListItems = () => {

  const [username, setUsername] = useState('')
  const [balance, setBalance] = useState(0)

  const token = localStorage.getItem('token')

  const getPayloadFromToken = (token: string | null) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.payload;
  };

  const payload = getPayloadFromToken(token);
  const userId = payload?.user_id;


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

  const Card: React.FC<CardProps> = ({ title, description, price, itemId, onClick }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 m-2 w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <button onClick={() => onClick(itemId)} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          ราคา {price} พ้อย
        </button>
      </div>
    );
  };

  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setItems(data))
  }, [])  

  const handleClick = (itemId: number) => {
    const itemFindById = items.find(item => item.item_id === itemId)
    
    if (!itemFindById) return

    if (balance < itemFindById.item_price) {
      console.log('Not enough balance')
    }

   console.log(`http://localhost:5000/items/get/${username}/${itemFindById.item_id}`)

   fetch(`http://localhost:5000/items/get/${username}/${itemFindById.item_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => console.log(response.json()))
    .catch((error) => console.log(error))
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-wrap-m-2'>
        {items.map((item) => (
          <Card key={item.item_id} title={item.item_name} description={item.item_description} price={item.item_price} onClick={handleClick} itemId={item.item_id} />
        ))}
      </div>
    </div>
  )
}

export default ListItems