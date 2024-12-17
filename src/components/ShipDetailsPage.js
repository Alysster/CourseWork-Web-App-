import React from 'react';
import { useParams } from 'react-router-dom';

const shipData = {
  1: { name: 'Ship A', type: 'Cargo', details: 'This is a cargo ship.' },
  2: { name: 'Ship B', type: 'Tanker', details: 'This is a tanker ship.' },
  3: { name: 'Ship C', type: 'Cruise', details: 'This is a cruise ship.' },
};

const ShipDetailsPage = () => {
  const { id } = useParams();
  const ship = shipData[id];

  if (!ship) {
    return <h1>Ship not found!</h1>;
  }

  return (
    <div>
      <h1>{ship.name}</h1>
      <p>Type: {ship.type}</p>
      <p>{ship.details}</p>
    </div>
  );
};

export default ShipDetailsPage;
