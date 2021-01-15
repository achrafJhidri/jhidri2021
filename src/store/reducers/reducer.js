const initialState = { platFavoris: [] }

function reducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD': // Exemple pour ajouter une valeur
      nextState = {
        ...state,
        platFavoris: [...state.platFavoris,action.value]
      };

      return nextState || state
    case 'REMOVE': // Exemple pour supprimer une valeur
      nextState = {
        ...state,
        platFavoris: state.platFavoris.filter(id => id !== action.value )
      };

      return nextState || state
    case 'ACTIONNAME':
        // Code here
      return nextState || state
    default:
      return state
  };
}

export default reducer;