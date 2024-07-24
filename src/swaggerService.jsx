const API_BASE_URL = 'https://petstore.swagger.io/v2/store/inventory'; 

export const fetchSwaggerData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Swagger API', error);
    throw error;
  }
};