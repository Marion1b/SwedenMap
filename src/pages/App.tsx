//React
import { BrowserRouter as Router, Routes, Route } from 'react-router'

//style
import '../css/index.css'

//protected route
import ProtectedRoute from '../components/ProtectedRoute.tsx'

//pages
import Home from './Home.tsx'
import Account from './Account.tsx'
import Login from './Login.tsx'
import Register from './Register.tsx'
import CreateMap from './CreateMap.tsx'
import Settings from './Settings.tsx'

const user = {
  userId: sessionStorage.getItem('userId')||undefined,
  accessToken: sessionStorage.getItem('accessToken')||undefined
}

const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
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

        <Route 
          path={`/settings`}
          element={
            <ProtectedRoute user={user}>
              <Settings />
            </ProtectedRoute>

          }
        />
      </Routes>
    </Router>
  )
}

export default App;