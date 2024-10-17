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
}

const ListItems = () => {

  const Card: React.FC<CardProps> = ({ title, description, price }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 m-2 w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          ราคา {price} พ้อย
        </button>
      </div>
    );
  };

  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(res => res.json())
      .then(data => setItems(data))
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-wrap-m-2'>
        {items.map((item) => (
          <Card  key={item.item_id} title={item.item_name} description={item.item_description} price={item.item_price} />
        ))}
      </div>
    </div>
  )
}

export default ListItems