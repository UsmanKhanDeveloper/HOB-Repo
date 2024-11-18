
const API_HOST = "zillow-com1.p.rapidapi.com"
const API_KEY= process.env.REACT_APP_RAPIDAPI_KEY;

export const fetchPropertyData = async (location: string) => {
    try {
      const response = await fetch(`https://${API_HOST}/property?location=${location}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY!,
          'X-RapidAPI-Host': API_HOST,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching property data:", error);
      throw error;
    }
  };