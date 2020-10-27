import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import mapStyles from "../styles/mapStyles";
import axios from 'axios';
import {useState, useEffect} from 'react';
 
const containerStyle = {
  width: '100vw',
  height: '100vw'
};
 
const centerMap = {
  lat: 59.9260437,
  lng: 10.7221828
};

const optionOpt = {
    styles: mapStyles,
};

 
function Map() {
  const [map, setMap] = React.useState(null)

  {/* Place API request here to bysykkel endpoint */}



  const [stations, setStation] = useState([]);

  useEffect(() => {
      axios.get("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json")
      .then(res => {
          console.log(res)
          setStation(res.data.data.stations)
        })
      .catch(err => console.log(err))
  }) 


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDcAPNcTY7BX3VKHgKVWc017ho3QpWN9LE"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerMap}
        zoom={13}
        options={optionOpt}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
          {stations.map(x => (
              <Marker
                key={x.stations_id}
                position={{lat: x.lat, lng: x.lon}}
              />
          ))}
       
        <></>


      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(Map)
