
// const API_HOST = "zillow56.p.rapidapi.com"

const API_HOST = "zillow-com4.p.rapidapi.com"
const API_KEY= process.env.EXPO_PUBLIC_RAPIDAPI_KEY;

export const fetchPropertyData = async (location: string) => {

  console.log(API_KEY);
  console.log(API_HOST);

  try {
    const response = await fetch(`https://zillow-com4.p.rapidapi.com/properties/search?location=${location}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY!,
        'x-rapidapi-host': API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    // JSON.stringify(result);

    console.log(result);
    const formattedData = mapSearchResults(result.data);

    console.log(formattedData);

    return formattedData;
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw error;
  }
};

// export const fetchPropertyData = async (location: string) => {
//     try {
//       const response = await fetch(`https://${API_HOST}/search?location=${location}&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any`, {
//         method: 'GET',
//         headers: {
//           'x-rapidapi-key': API_KEY!,
//           'x-rapidapi-host': API_HOST,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       // JSON.stringify(data);
//       return mapSearchResults(data.result);
//     } catch (error) {
//       console.error("Error fetching property data:", error);
//       throw error;
//     }
//   };

// filter the search bar to be one entry 

  // mapping processes the list and returns a copy of that list with the parametppa you specified inside here 
  const mapSearchResults = (searchResults: any[]) => {
    return searchResults.map((result: any) => ({
      address: {
        city: result.address.city,
        state:  result.address.state,
      }
      }));
  };