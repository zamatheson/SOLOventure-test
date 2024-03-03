import React, { useState, useEffect } from 'react';

const FeaturedDestinations = () => {
  const destinations = [
    {
      name: "Garmisch-Partenkirchen, Bavaria, Germany",
      image: "/img/germany.png",
      popularity: "High"
    },
    {
      name: "Hidden settle in Himalaya, Tibet",
      image: "/img/tibet.png",
      popularity: "High"
    },
    {
      name: "Reine, Norway",
      image: "/img/norway.png",
      popularity: "High"
    },
    {
      name: "Gasadalur, Farers Islands",
      image: "/img/gasadalur.png",
      popularity: "High"
    },
    {
      name: "Colmar, France",
      image: "/img/france.png",
      popularity: "High"
    },
    {
      name: "Bled, Slovenia",
      image: "/img/slovenia.png",
      popularity: "High"
    },
    {
      name: "Manarola, Italy",
      image: "/img/italy.png",
      popularity: "High"
    },
    {
      name: "Bibery, Great Britain",
      image: "/img/bibery.png",
      popularity: "High"
    },
    {
      name: "Ancy, France",
      image: "/img/ancy.png",
      popularity: "High"
    },
    {
      name: "Goreme, Turkey (underground city)",
      image: "/img/goreme.png",
      popularity: "High"
    },
  ];

  const [displayedDestinations, setDisplayedDestinations] = useState([]);

  useEffect(() => {
    const rotateDestinations = () => {
      const rotated = destinations.slice(3).concat(destinations.slice(0, 3));
      setDisplayedDestinations(rotated);
    };

    // Rotate destinations every 5 seconds
    const interval = setInterval(rotateDestinations, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [destinations]);

  return (
    <div className='box-wrapper'>
    <section className="featured-destinations">
      <h2>Featured Destinations</h2>
      <div className="destination-grid">
        {displayedDestinations.slice(0, 4).map((destination, index) => (
          <div key={index} className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <h3>{destination.name}</h3>
            <p>Popularity: {destination.popularity}</p>
            </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default FeaturedDestinations;
