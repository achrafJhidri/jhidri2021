const KEY_ID = "4cdaf1047e327d462d95b560fbce7642"



export const getPersonnes = async (page) => {
  return fetchFunction("https://api.themoviedb.org/3/person/popular?api_key="+KEY_ID+"&page="+page);
  };

export const getPersonnesByName = async (name) => {
  return fetchFunction("https://api.themoviedb.org/3/search/person?api_key="+KEY_ID+"&page=1&query="+name);
};
export const getPersonnesById = async (id) => {
  return fetchFunction("https://api.themoviedb.org/3/person/"+id+"?api_key="+KEY_ID+"&language=en-US");
};
export const getMoviesByActorId = async (id) => {
  return fetchFunction("https://api.themoviedb.org/3/person/"+id+"/movie_credits?api_key="+KEY_ID+"&language=en-US");
};

fetchFunction = async (url ) => {
  try {

    const response = await fetch(
      url
    );
    const json = await response.json();
    
    
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


