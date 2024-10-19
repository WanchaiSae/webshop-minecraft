import React, { useState } from 'react'
import NavBar from '../../pages/NavBar'


const Topup = () => {

  const [amount, setAmount] = useState(0)
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ส่งข้อมูลฟอร์มที่นี่
    console.log('Amount:', amount)

    fetch(`http://localhost:5000/topup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
      })
    }).then(response => response.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">จำนวนเงิน</h2>
        <img src={url} />
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            รองรับพร้อมเพย์เท่านั้น
          </label>
          <input
            type="number"
            id="amount"
            required
            value={amount <= 0 ? 0 : amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0) }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกจำนวนที่ต้องการเติม"
          />
        </div>
        {amount > 0 ? (
          <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          เติมเงิน
        </button>
        ) : (<p></p>)}
        
        </form>

      </div>
    </div>
  )
}

export default Topup