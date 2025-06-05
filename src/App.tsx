import './App.css'
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PinContainer from './components/PinContainer';
import UserPosition from './components/UserPosition';
import RoutingMachine from './components/RoutingMachine';


function App() {
  return (
    <MapContainer center={[48.117538802169086, -1.6750580634024201]} zoom={13} scrollWheelZoom={false} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine />
      <PinContainer />
      <UserPosition />
    </MapContainer>

  )
}

export default App
