import './App.css'
import { MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import PinContainer from './components/PinContainer';
import UserPosition from './components/UserPosition';
import RoutingMachine from './components/RoutingMachine';
import { type LatLngExpression } from 'leaflet';


function App() {
  const [pinPosition, setPinPosition] = useState<null|LatLngExpression>(null);
  const [routingKey, setRoutingKey] = useState<number>(0);

  const LocationFinderDummy = () =>{
    useMapEvents({
        click(e) {
            setPinPosition(e.latlng);
            // faire une fonction pour arrondir à la coord la plus proche dans le json pour éviter d'avoir une coordonnée qui ne correspond pas exactement à celle voulu
        },
    });
    return null;
  }

  useEffect(() => {
    if (pinPosition) {
      console.log("Pin position set:", pinPosition);
      setRoutingKey(prevKey =>prevKey+1);
    }
  }, [pinPosition]);

  return (
    <MapContainer center={[48.117538802169086, -1.6750580634024201]} zoom={13} scrollWheelZoom={false}>
      <LocationFinderDummy />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pinPosition && <RoutingMachine key={routingKey} destinationLocation={pinPosition} />}
      <PinContainer />
      <UserPosition />
    </MapContainer>

  )
}

export default App
