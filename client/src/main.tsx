import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterForm from './components/auth/RegisterForm.tsx'
import LoginForm from './components/auth/LoginForm.tsx'
import Logout from './components/auth/Logout.tsx'
import AddItem from './components/items/AddItem.tsx'
import Topup from './components/topup/Topup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Authentication  */}
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/logout' element={<Logout />} />
        {/* Items  */}
        <Route path='/add' element={<AddItem />} />
        {/* Topup  */}
        <Route path='/topup' element={<Topup />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>  
    </BrowserRouter>
  </StrictMode>,
)
