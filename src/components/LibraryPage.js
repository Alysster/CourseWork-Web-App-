import React, { useState, useEffect } from 'react';
import '../styles/LibraryPage.css';

const randomImages = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg'];
const categories = ['All', 'Cargo', 'Tanker', 'Cruise', 'Fishing', 'Container', 'Passenger', 'Research'];

const LibraryPage = () => {
  const [ships, setShips] = useState([]); // Ships loaded from database
  const [newShip, setNewShip] = useState({
    name: '',
    type: '',
    destination: '',
    origin: '',
    grossTonnage: '',
    callSign: '',
  });
  const [selectedShip, setSelectedShip] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Fetch ships from the database when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/ships')
      .then((res) => res.json())
      .then((data) => setShips(data));
  }, []);

  // Handle Add Ship
  const handleAddShip = (e) => {
    e.preventDefault();
    const newShipData = { ...newShip, id: Date.now() };

    fetch('http://localhost:5000/ships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newShipData),
    })
      .then((res) => res.json())
      .then((data) => setShips([...ships, data]));

    setNewShip({
      name: '',
      type: '',
      destination: '',
      origin: '',
      grossTonnage: '',
      callSign: '',
    });
  };

  // Handle Delete Ship
  const handleDeleteShip = (id) => {
    fetch(`http://localhost:5000/ships/${id}`, { method: 'DELETE' })
      .then(() => setShips(ships.filter((ship) => ship.id !== id)));
  };

  // Handle Ship Click for Popup
  const handleShipClick = (ship) => {
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    setSelectedShip({ ...ship, image: randomImage });
  };

  const handleClosePopup = () => setSelectedShip(null);

  const filteredShips = selectedCategory === 'All'
    ? ships
    : ships.filter((ship) => ship.type === selectedCategory);

  return (
    <div className="library-page">
      <header className="header">
        <h1>Ship Library</h1>
      </header>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Add Ship Form */}
      <form className="add-ship-form" onSubmit={handleAddShip}>
        <input placeholder="Name" value={newShip.name} onChange={(e) => setNewShip({ ...newShip, name: e.target.value })} required />
        <input placeholder="Type" value={newShip.type} onChange={(e) => setNewShip({ ...newShip, type: e.target.value })} required />
        <input placeholder="Destination" value={newShip.destination} onChange={(e) => setNewShip({ ...newShip, destination: e.target.value })} />
        <input placeholder="Origin" value={newShip.origin} onChange={(e) => setNewShip({ ...newShip, origin: e.target.value })} />
        <input placeholder="Gross Tonnage" value={newShip.grossTonnage} onChange={(e) => setNewShip({ ...newShip, grossTonnage: e.target.value })} />
        <input placeholder="Call Sign" value={newShip.callSign} onChange={(e) => setNewShip({ ...newShip, callSign: e.target.value })} />
        <button type="submit">Add Ship</button>
      </form>

      {/* Ship List */}
      <div className="ship-list">
        {filteredShips.map((ship) => (
          <div key={ship.id} className="ship-card" onClick={() => handleShipClick(ship)}>
            <h2>{ship.name}</h2>
            <p>Type: {ship.type}</p>
            <button onClick={(e) => { e.stopPropagation(); handleDeleteShip(ship.id); }}>Delete</button>
          </div>
        ))}
      </div>

      {/* Popup for Ship Details */}
      {selectedShip && (
        <div className="popup">
          <div className="popup-content">
            <button className="popup-close" onClick={handleClosePopup}>✖</button>
            <h2>{selectedShip.name}</h2>
            <img src={selectedShip.image} alt={selectedShip.name} className="popup-image" />
            <p><strong>Type:</strong> {selectedShip.type}</p>
            <p><strong>Destination:</strong> {selectedShip.destination}</p>
            <p><strong>Origin:</strong> {selectedShip.origin}</p>
            <p><strong>Gross Tonnage:</strong> {selectedShip.grossTonnage}</p>
            <p><strong>Call Sign:</strong> {selectedShip.callSign}</p>
          </div>
        </div>
      )}

      {/* Contact Us */}
      <div className="contact-bookmark" onClick={() => setIsContactOpen(!isContactOpen)}>
        <div className="bookmark-label">Contact Us</div>
      </div>
      {isContactOpen && (
        <div className="contact-popup">
          <h3>Contact Us</h3>
          <p>Email: support@shiptracker.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Ocean Drive, Port City</p>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
