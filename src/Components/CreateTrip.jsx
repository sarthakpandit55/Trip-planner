import React, { useState, useEffect } from 'react';
import { SelectBudgetOptions, SelectTravlersList } from './options';

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
      }
      else {
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
    
      {/* Here the input box for location is written */}

      <div className='mt-20 flex flex-col gap-9' >
        <div>
          <h2 className='text-xl my-3 font-medium'>What is the destination of your choice?</h2>

          <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Search location' className='w-full border p-3 rounded-md text-base'/>

          {suggestions.length > 0 && (
            <ul className='bg-gray-700 w-full shadow border mt-1 z-10 max-h-60 overflow-y-auto rounded-md'>
              {suggestions.map((place, index) => (
                <li key={index} onClick={() => handleSelect(place)} className='p-2 cursor-pointer hover:bg-gray-800'>
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Here the input box for number of days is written */}

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <input type="number" placeholder='Ex, 3' className='w-full border p-3 rounded-md text-base' />
        </div>

        {/* Here the budget content is writen */}

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item) => (
              <div key={item.id} className='p-4 border cursor-pointer rounded-lg hover:border-green-400 hover:border-8'>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold'>{item.title}</h2>
              <h2 className='text-sm text-gray-400'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Here is the Travelers content is written */}

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you planon traveling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravlersList.map((item) => (
              <div key={item.id} className='p-4 border cursor-pointer rounded-lg hover:border-green-400 hover:border-8 hover:shadow-lx'>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold'>{item.title}</h2>
                <h2 className='text-sm text-gray-400'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <button className=''>Generate Trip</button>
      </div>
    </div>
  );
}

export default CreateTrip;
