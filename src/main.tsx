//React
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

//style
import './css/index.css'

//protected route
import ProtectedRoute from './components/ProtectedRoute.tsx'

//pages
import App from './pages/App.tsx'
import Account from './pages/Account.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import CreateMap from './pages/CreateMap.tsx'

const user = {
  userId: sessionStorage.getItem('userId')||undefined,
  accessToken: sessionStorage.getItem('accessToken')||undefined
}

createRoot(document.getElementById('root')!).render(
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />

        {/**Protected routes */}
        <Route 
          path="/account"
          element={
            <ProtectedRoute user={user}>
              <Account />
            </ProtectedRoute>

          }
        />

        <Route 
          path="/create-map"
          element={
            <ProtectedRoute user={user}>
              <CreateMap />
            </ProtectedRoute>

          }
        />
      </Routes>
    </Router>
)
