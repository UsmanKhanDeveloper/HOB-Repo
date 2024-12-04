
// const API_HOST = "zillow56.p.rapidapi.com"

const API_HOST = "zillow-com4.p.rapidapi.com"
const API_KEY = "0d68be11d2msh21ccd69ffec508dp1f9342jsn2f56b7034177";

export const fetchSuggestedLocation = async (location: string) => {

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
    const formattedData = mapSuggestedLocationResults(result.data);

    console.log(formattedData);

    return formattedData;
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw error;
  }
};

export const fetchPropertyData = async (searchTerm: string) => {

  console.log("api key: ",API_KEY);
  console.log("api host: ",API_HOST);

  try {
    const response = await fetch(`https://zillow-com4.p.rapidapi.com/properties/search?location=${searchTerm}`, {
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

    // console.log("result data address city ", result.data[0].address.city);
    // console.log("zpid: ", result.data[0].zpid);

    const formattedData = mapSearchResults(result); // return the data you want

    // console.log("test");
    console.log("formattedData: ", formattedData);

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

const mapSuggestedLocationResults = (searchResults: any[]) => {
  return searchResults.map((result: any) => ({
    address: {
      city: result.address.city,
      state:  result.address.state,
    }
    }));
};

  // mapping processes the list and returns a copy of that list with the parametppa you specified inside here 
  const mapSearchResults = (searchResults: any[]) => {

    // console.log("Inside mapSearchResults: ", searchResults);
    return searchResults.map((result: any) => ({

      id:  result.data[0].zpid,
      media: result.data[0].media.allPropertyPhotos.highResolution[0], // this is the first image
      price: result.data[0].price.value,
      bathrooms: result.data[0].bathrooms,
      sqft: result.data[0].lotSizeWithUnit.lotSize,
      bedrooms: result.data[0].bedrooms,
      time: result.data[0].listingDateTimeOnZillow,

      address: {
        street: result.data[0].address.streetAddress,
        city: result.data[0].address.city,
        state:  result.data[0].address.state,
        zip: result.data[0].address.zipcode,
        country: result.data[0].country,
      }
      }));
  };