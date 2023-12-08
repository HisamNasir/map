'use client'
import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat, toLonLat } from 'ol/proj';
import Pin from './Pin';
import axios from 'axios';

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<Map | null>(null);
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [pinCoordinates, setPinCoordinates] = useState<[number, number] | null>(null);
  const [weather, setWeather] = useState<any | null>(null);
  const [locationData, setLocationData] = useState<any | null>(null);

  useEffect(() => {
    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    setMap(initialMap);
    const initialOverlay = new Overlay({
      element: document.createElement('div'),
      positioning: 'bottom-right',
    });
    setOverlay(initialOverlay);
    initialMap.addOverlay(initialOverlay);
    initialMap.on('click', (event) => handleMapClick(event));
    return () => {
      initialMap.setTarget(null);
    };
  }, []);
  const handleMapClick = async (event: any) => {
    const clickedCoord = toLonLat(event.coordinate);
    setPinCoordinates(clickedCoord);
    overlay?.setPosition(event.coordinate);
    document.getElementById('popup')!.style.display = 'block';
    try {
      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${clickedCoord[1]}&lon=${clickedCoord[0]}&appid=a5e8dd719ed8a05729583330455244fe`
      );

      setWeather(weatherResponse.data);
      const locationResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${clickedCoord[1]}&lon=${clickedCoord[0]}&limit=1&appid=a5e8dd719ed8a05729583330455244fe`
      );

      setLocationData(locationResponse.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <div id="map" className="w-full h-screen" />
      {pinCoordinates && <Pin coordinates={pinCoordinates} />}
      <div id="popup" className="absolute bottom-4 right-4 md:bottom-8 md:right-8 shadow-lg rounded-lg border border-yellow-950 shadow-black bg-amber-50 te p-4">
        {pinCoordinates && weather && locationData && (
          <div>
            <div className='flex items-center gap-4'>
              <img
                src={`http://openweathermap.org/images/flags/${locationData.country.toLowerCase()}.png`}
                alt={`Flag of ${locationData.country}`}
                className="h-4"
              />
              <p> {locationData.name}</p>
            </div>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp} °C</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
