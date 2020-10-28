import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import mapStyles from "../styles/mapStyles";
import axios from 'axios';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const containerStyle = {
  width: '100%',
  height: '700px'
};
 


const optionOpt = {
    styles: mapStyles,
};



 
function Map() {
  const [map, setMap] = React.useState(null)
  const centerMap = {
    lat: 59.9260437,
    lng: 10.7221828
  };
  

  {/* Available bikes or available slots? */}

  const [stations, setStation] = useState([]);
  const [availableBikes, setAvailableBikes] = useState(true);

  

  function joinObjects() {
    var idMap = {};
    for(var i = 0; i < arguments.length; i++) { 
      for(var j = 0; j < arguments[i].length; j++) {
         var currentID = arguments[i][j]['station_id'];
         if(!idMap[currentID]) {
            idMap[currentID] = {};
          }
        for(const key in arguments[i][j]) {
            idMap[currentID][key] = arguments[i][j][key];
        }
      }
    } 
  
    var newArray = [];
    for(const property in idMap) {
      newArray.push(idMap[property]);
    }
    return newArray;
  }

  function outPutMarkers(stations) {
    
    return (
    stations.map(x => (
      <Marker
        key={x.stations_id}
        position={{lat: x.lat, lng: x.lon}}
        icon={"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + (availableBikes ? x.num_bikes_available : x.num_docks_available) + "|"+ chooseColor(availableBikes ? x.num_bikes_available : x.num_docks_available)+"|000000"}
        
      />
    )));
  };

  function chooseColor(number) {
      var color = "D2302C";
      if(number > 15){
          color = "57AD68";
      } else if(number > 10) {
          color = "FFAE42";
      } else if(number > 5) {
          color = "FFFF9C";
      }
      return color;
  }

  
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json")
      .then(res => {
        axios.get("http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
        .then(second_res => {
          const result = joinObjects(res.data.data.stations, second_res.data.data.stations);
          setStation(result);
        })
        .catch(second_err => console.log(second_err))
        })
      .catch(err => console.log(err))
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <>
    <LoadScript
      googleMapsApiKey="AIzaSyDcAPNcTY7BX3VKHgKVWc017ho3QpWN9LE"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={14}
        options={optionOpt}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={centerMap}
      >
          {outPutMarkers(stations)}
       
        <></>
        


      </GoogleMap>
    </LoadScript>
    <Button id="myButton" onClick={() =>  setAvailableBikes(!availableBikes)} style={{marginTop: "40px"}} size="lg" variant="info">Change lookup</Button>{' '}
    </>
  )
}
 
export default React.memo(Map)
