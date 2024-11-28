
const API_HOST = "zillow56.p.rapidapi.com"
const API_KEY= process.env.REACT_APP_RAPIDAPI_KEY;

export const fetchPropertyData = async (location: string) => {
    try {
      const response = await fetch(`https://${API_HOST}/search?location=${location}&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY!,
          'x-rapidapi-host': API_HOST,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return mapSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching property data:", error);
      throw error;
    }
  };

  // mapping processes the list and returns a copy of that list with the parametppa you specified inside here 
  const mapSearchResults = (searchResults: any[]) => {
    return searchResults.map((result: any) => ({
      city: result.city,
      country: result.country 
      }));
  };