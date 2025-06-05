import type { LatLngExpression } from 'leaflet';
import { Marker } from 'react-leaflet';

const Pin = ({geoloc, classname}:{geoloc:LatLngExpression, classname:string}) =>{
    return (
        <div className={classname}>
            <Marker position={geoloc}>
            </Marker>
        </div>
    )
}

export default Pin;