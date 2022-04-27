import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function TripMap() {

    const mapStyles = {        
        height: "100vh",
        width: "100%"};
      
      const defaultCenter = {
        lat: 41.264665920371726, lng: -84.38764950957754
      }

    return (
        <>
        <h1>Coming soon!!!</h1>
     <LoadScript
       googleMapsApiKey='AIzaSyCnXeLTuCuC8mAmLkHi8iioVgUf2HqwKPg'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
        </>
    );
}