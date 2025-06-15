//style
import './App.css'

//related to leaflet
import { MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { type LatLngTuple } from 'leaflet';

//react utils
import { useEffect, useState } from 'react';

//utils
import { fetchActivities } from './utils/fetchActivities';

//components
import PinContainer from './components/PinContainer';
import UserPosition from './components/UserPosition';
import RoutingMachine from './components/RoutingMachine';
import BurgerMenuContainer from './components/BurgerMenu/BurgerMenuContainer';

interface Activity{
    name:string;
    description:string;
    geoloc:LatLngTuple;
    category:string;
}

interface Activities{
    [key:string]:Activity;
}


function App() {
  const [pinPosition, setPinPosition] = useState<null|LatLngTuple>(null); //position clicked
  const [activitiesPositions, setActivitiesPositions]=useState<LatLngTuple[]>([]); // get all geoloc from the API
  const [closestActivity, setClosestActivity]=useState<null|LatLngTuple>(null); // get geoloc of the closest activity clicked

  //assign all geoloc from the api to activitiesPosition
  useEffect(():void=>{
    const fetchAndSetActivities = async():Promise<void |LatLngTuple[]> => {
      let allPositions: LatLngTuple[]=[];
      fetchActivities()
        .then((result:{})=>{
          const activities:Activities = result;
          Object.keys(activities).map((key)=>{
            const activity:Activity = activities[key];
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
  

  // get clicked geoloc
  const LocationFinderDummy = ():null =>{
    useMapEvents({
        click(e) {
          setPinPosition([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
  }

  // associate clicked geoloc to the nearest activity geoloc
  const getNearestActivity = (clickedPosition: null|LatLngTuple):LatLngTuple|string =>{
    if(clickedPosition && activitiesPositions){
      let nearPoint:number|null = null;
      //get key in the activitiesPosition array
      let nearLatLngKey:number = -1;
      const diffLatLngClickedPosition:number = Math.abs(clickedPosition[0] - clickedPosition[1]);

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

  // watch clicked position to calculate the nearest activity
  useEffect(() => {
    if (pinPosition) {
      const nearestActivity = getNearestActivity(pinPosition);
      if(nearestActivity && typeof nearestActivity === "object" && typeof nearestActivity[0] === 'number' && typeof nearestActivity[1] === 'number'){
        setClosestActivity(nearestActivity);
      }else{
        console.error("error while getting the nearest activity");
      }
      
    }
  }, [pinPosition]);

  return (
    <MapContainer center={[48.117538802169086, -1.6750580634024201]} zoom={13} scrollWheelZoom={false}>
      <LocationFinderDummy />
      <BurgerMenuContainer />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {closestActivity && <RoutingMachine destinationLocation={closestActivity} />}
      <PinContainer />
      <UserPosition />
    </MapContainer>

  )
}

export default App
