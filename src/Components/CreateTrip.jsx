import React, { useState, useEffect } from 'react';

function CreateTrip() {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (location.length > 2) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&addressdetails=1&limit=5`)
          .then((res) => res.json())
          .then((data) => setSuggestions(data))
          .catch((err) => console.error("Nominatim error:", err));
      } else {
        setSuggestions([]);
      }
    }, 300); // debounce delay

    return () => clearTimeout(delay);
  }, [location]);

  const handleSelect = (place) => {
    setLocation(place.display_name);
    setSuggestions([]);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl-px-76 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-5 text-gray-400 text-xl'>
        Just provide some basic information, and our trip planner will generate a customised itinerary based on your preferences.
      </p>

      <div className='mt-20 relative'>
        <h2 className='text-xl py-3 font-medium'>What is the destination of your choice?</h2>

        <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Search location' className='w-full border p-3 rounded-md text-base'/>

        {suggestions.length > 0 && (
          <ul className='absolute bg-gray-700 w-full shadow border mt-1 z-10 max-h-60 overflow-y-auto rounded-md'>
            {suggestions.map((place, index) => (
              <li key={index} onClick={() => handleSelect(place)} className='p-2 cursor-pointer hover:bg-gray-800'>
                {place.display_name}
              </li>
            ))}
          </ul>
        )}

        <h2 className='text-xl py-3 font-medium mt-10'>What is the destination of your choice?</h2>
      </div>
    </div>
  );
}

export default CreateTrip;
