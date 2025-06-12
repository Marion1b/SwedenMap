import './App.css'
import { MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import PinContainer from './components/PinContainer';
import UserPosition from './components/UserPosition';
import RoutingMachine from './components/RoutingMachine';
import { LatLng, type LatLngExpression } from 'leaflet';
import { fetchActivities } from './utils/fetchActivities';

interface LatLng{
  [key:string]:number,
}


function App() {
  const [pinPosition, setPinPosition] = useState<null|LatLng>(null);
  const [activitiesPositions, setActivitiesPositions]=useState<null|[[number, number]]>(null);
  const [closestActivity, setClosestActivity]=useState<null|LatLngExpression>(null);

  useEffect(()=>{
    const fetchAndSetActivities = async() => {
      let allPositions: [[number, number]]=[];
      fetchActivities()
        .then((result)=>{
          const activities = result;
          Object.keys(activities).map((key)=>{
            const activity = activities[key];
            allPositions.push(activity.geoloc);
            return allPositions;
          }, []);
          setActivitiesPositions(allPositions);
        })
        .catch((error)=>{
          console.error(error);
        })
    }
    fetchAndSetActivities();
  }, []);
  

  const LocationFinderDummy = () =>{
    useMapEvents({
        click(e) {
            setPinPosition(e.latlng);
        },
    });
    return null;
  }

  const getNearestActivity = (clickedPosition: null|LatLng):LatLngExpression|string =>{
    if(clickedPosition && activitiesPositions){
      let nearPoint:number|null = null;
      let nearLatLngKey:number = -1;
      const diffLatLngClickedPosition:number = Math.abs(clickedPosition.lat - clickedPosition.lng);
      for(let i = 0; i<activitiesPositions.length; i++){
        // calculate lat - lng
        const lat:number = activitiesPositions[i][0];
        const lng:number = activitiesPositions[i][1];
        const diffLatLngActivity:number = Math.abs(lat - lng);

        // condition to always get the bigger at the start of the operation
        if(nearPoint){
          if(diffLatLngActivity < diffLatLngClickedPosition && diffLatLngClickedPosition - diffLatLngActivity < nearPoint){
            nearPoint = diffLatLngClickedPosition - diffLatLngActivity;
            nearLatLngKey=i
          }else if(diffLatLngClickedPosition < diffLatLngActivity && diffLatLngActivity - diffLatLngClickedPosition < nearPoint){
            nearPoint = diffLatLngActivity - diffLatLngClickedPosition; 
            nearLatLngKey = i;
          }
          else if(diffLatLngActivity === diffLatLngClickedPosition){
            nearPoint = diffLatLngActivity;
            nearLatLngKey;
          }
        }else{
          if(diffLatLngActivity < diffLatLngClickedPosition){
            nearPoint = diffLatLngClickedPosition - diffLatLngActivity;
          }else{
            nearPoint = diffLatLngActivity - diffLatLngClickedPosition;
          }
        }
      }

      return activitiesPositions[nearLatLngKey];
    }
    return `error, no correct clicked position or activities position`;
  }

  console.log(getNearestActivity(pinPosition));


  useEffect(() => {
    if (pinPosition) {
      setClosestActivity(getNearestActivity(pinPosition));
    }
  }, [pinPosition]);

  return (
    <MapContainer center={[48.117538802169086, -1.6750580634024201]} zoom={13} scrollWheelZoom={false}>
      <LocationFinderDummy />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pinPosition && <RoutingMachine destinationLocation={closestActivity} />}
      <PinContainer />
      <UserPosition />
    </MapContainer>

  )
}

export default App
