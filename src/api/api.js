const KEY_ID = "8edc6b436a4fb1da26d4df5ec900465c"

const header = new Headers({"user_key":KEY_ID}) ;

export const getRestaurants = async (search,count = 0) => {
  return fetchFunction("https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&q="+search+"&start="+count);
  };

export const getRestaurantbyId = async (key) => {
  return fetchFunction("https://developers.zomato.com/api/v2.1/restaurant?res_id="+key);
};

fetchFunction = async (url ) => {
  try {

    const response = await fetch(
      url,
      { headers : header }
    );
    const json = await response.json();
    
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


