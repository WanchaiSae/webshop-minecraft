import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {

  const token = localStorage.getItem('token')

  const getPayloadFromToken = (token: string | null) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.payload; // คืนค่า payload ทั้งหมด
  };

  const payload = getPayloadFromToken(token);
  const username = payload?.username;
  const balance = payload?.balance;
  
  

  return (
    <>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            Webshop Minecraft
          </div>
          <div className="space-x-4">
            <span className="text-white hover:text-blue-300">Items</span>
            <span className="text-white hover:text-blue-300">You : {username}</span>
            <span className="text-white hover:text-blue-300">Balance : {balance}</span>
            <span className="text-white hover:text-blue-300"><Link to={"/logout"}>Logout</Link></span>
          </div>
        </div>
  </nav>
    </>
  )
}

export default NavBar