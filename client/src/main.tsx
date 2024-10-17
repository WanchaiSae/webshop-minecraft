import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterForm from './components/auth/RegisterForm.tsx'
import LoginForm from './components/auth/LoginForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>  
    </BrowserRouter>
  </StrictMode>,
)
