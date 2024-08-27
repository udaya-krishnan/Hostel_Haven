import axios from 'axios'





export const findlocation=async(pinCode:string)=>{
    try {
        const url = `https://nominatim.openstreetmap.org/search?postalcode=${pinCode}&format=json`;
    
        // Use await to get the result directly
        const response = await axios.get(url);
    
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          console.log(`Latitude: ${lat}, Longitude: ${lon}`);
          return [lat, lon]; // Return an array with lat and lon
        } else {
          console.log('No results found.');
          return [null, null]; // Handle the case where no results are found
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        return [null, null]; // Handle the case where there's an error
      }
}




