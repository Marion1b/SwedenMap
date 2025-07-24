//React
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

//style
import './css/index.css'

//pages
import App from './pages/App.tsx'
import Account from './pages/Account.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        {/** check if a user is logedin */}
        {sessionStorage.getItem('userId') 
          ? sessionStorage.getItem('accessToken')
            ? <Route path="/account" element={<Account />}/>
            : <Route path="/account" element={<Login />}/>
          : <Route path="/account" element={<Login />}/>
        }
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
)
