import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MainPage.css';

// Custom ship icon
const shipIcon = new L.Icon({
  iconUrl: '/pin.png', // Add your ship icon here
  iconSize: [40, 40], // Adjust the size of the icon
});

  const SmallMap = () => {
  const navigate = useNavigate();
  const [isChasingTail, setIsChasingTail] = useState(false); // Add state for spinning animation

  const handleShipClick = () => {
    setIsChasingTail(true); // Start spinning
    setTimeout(() => setIsChasingTail(false), 3000); // Stop spinning after 3 seconds
  };

  // State for hovered trajectory
  const [highlightedShipId, setHighlightedShipId] = useState(null);

  // Ship data with trajectories
  const ships = [
    {
      id: 1,
      name: 'Ocean Explorer',
      info: 'Call Sign - U792Y. Destination - Brazil, Rio de Janeiro. Online - 2h ago.',
      image: '/1.jpg',
      position: [30.000, -40.000], // Starting position in Atlantic Ocean
      trajectory: [
        [30.000, -40.000], // Starting point in the ocean
        [35.000, -20.000],
        [45.000, -10.000], // Midpoint near France
        [46.8566, -1.900], // Ending point: Paris, France
      ],
    },
    {
      id: 2,
      name: 'Pacific Voyager',
      info: 'Call Sign - E732V. Destination - USA, Bridgeport. Online - 4h ago.',
      image: '/2.jpg',
      position: [-20.000, -150.000], // Starting position in Pacific Ocean
      trajectory: [
        [-20.000, -150.000], // Starting point in the ocean
        [-50.000, -95.000],
        [-73.000, -80.000],
        //[-33.8688, 151.2093], // Ending point: Sydney, Australia
      ],
    },
    {
      id: 3,
      name: 'Caribbean Cruiser',
      info: 'Call Sign - I981U. Destination - Norway, Sotra. Online - 5min ago.',
      image: '/3.jpg',
      position: [18.000, -66.000], // Starting position in Caribbean Sea
      trajectory: [
        [18.000, -66.000], // Starting point
        [22.000, -75.000],
        [25.7617, -80.1918], // Ending point: Miami, USA
      ],
    },
    {
      id: 4,
      name: 'North Sea Navigator',
      info: 'Call Sign - O122Y. Destination - UK, Seaford. Online - 10h ago.',
      image: '/4.jpg',
      position: [58.000, 2.000], // Starting position in North Sea
      trajectory: [
        [58.000, 2.000], // Starting point
        [60.000, 5.000],  
      ],
    },
    {
      id: 5,
      name: 'Shoreline Trader',
      info: 'Call Sign - U792Y. Destination - Brazil, Le Havre. Online - 2h ago.',
      image: '/5.jpg',
      position: [60.500, -1.100], // Starting position near UK shore
      trajectory: [
        [60.500, -1.100], // Starting point
        [54.000, -0.500],
        
      ],
    },
    {
  id: 6,
  name: 'Sky Voyager',
  info: 'Call Sign - A123B. Destination - Australia, Sydney. Online - 30m ago.',
  image: '/2.jpg',
  position: [-20.000, 110.000], // Starting position near the Indian Ocean
  trajectory: [
    [-20.000, 110.000], // Starting point in the ocean
    [-15.000, 130.000],
    [-10.000, 150.000], // Midpoint near Papua New Guinea
    [-21.8688, 151.2093], // Ending point: Sydney, Australia
  ],
},
{
  id: 7,
  name: 'Polar Adventurer',
  info: 'Call Sign - Z567X. Destination - Arctic Circle, Canada. Online - 1h ago.',
  image: '/3.jpg',
  position: [70.000, -60.000], // Starting position in the North Atlantic
  trajectory: [
    [70.000, -60.000], // Starting point in the ocean
    [75.000, -50.000],
    [80.000, -70.000], // Midpoint near Greenland
    [82.5018, -62.3481], // Ending point: Arctic Circle, Canada
  ],
},
{
  id: 8,
  name: 'Mountain Seeker',
  info: 'Call Sign - C349K. Destination - Nepal, Kathmandu. Online - 3h ago.',
  image: '/5.jpg',
  position: [10.000, 80.000], // Starting position in the Indian Ocean
  trajectory: [
    [10.000, 80.000], // Starting point in the ocean
    [19.000, 85.000],
  ],
},
{
  id: 9,
  name: 'Island Voyager',
  info: 'Call Sign - K432M. Destination - Hawaii, Honolulu. Online - 10m ago.',
  image: '/4.jpg',
  position: [0.000, -160.000], // Starting position in the Pacific Ocean
  trajectory: [
    [0.000, -160.000], // Starting point in the ocean
    [10.000, -155.000],
    [15.000, -150.000], // Midpoint near the Pacific islands
    [21.3069, -157.8583], // Ending point: Honolulu, Hawaii
  ],
},

  ];

   return (
    <div className="main-page">
      {/* Cute Ship Image */}
      <img
        src="/Blue.png" // Path to the ship image
        alt="Cute Ship"
        className={`ship-image ${isChasingTail ? 'chasing-tail' : ''}`} // Add chasing-tail class dynamically
        onClick={handleShipClick} // Add click handler for spinning effect
      />

      <h1 className="main-title">Ship Tracker</h1>
      <button
        onClick={() => navigate('/library')}
        className="btn"
      >
        Go to Library
      </button>

      <div className="map-container">
        <h2>Compact Ship Tracker Map</h2>
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[20.000, -60.000]} // Center map near Atlantic Ocean
          zoom={3}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {ships.map((ship) => (
            <React.Fragment key={ship.id}>
              {/* Marker for the ship */}
              <Marker
                position={ship.position}
                icon={shipIcon}
                eventHandlers={{
                  mouseover: () => setHighlightedShipId(ship.id), // Highlight trajectory on hover
                  mouseout: () => setHighlightedShipId(null), // Remove highlight on mouse out
                }}
              >
                <Popup>
                  <div style={{ textAlign: 'center' }}>
                    <h3>{ship.name}</h3>
                    <p>{ship.info}</p>
                    <img
                      src={ship.image}
                      alt={ship.name}
                      style={{ width: '100%', borderRadius: '10px' }}
                    />
                  </div>
                </Popup>
              </Marker>

              {/* Trajectory Line */}
              <Polyline
                positions={ship.trajectory}
                pathOptions={{
                  color: highlightedShipId === ship.id ? 'blue' : 'red', // Highlight in blue if hovered
                  weight: highlightedShipId === ship.id ? 4 : 2, // Thicker line if hovered
                  dashArray: '5, 5', // Dotted line
                }}
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SmallMap;
